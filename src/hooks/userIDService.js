// src/hooks/userIDService.js
// ✅ Enterprise Lazy Firebase
// ✅ auth / identidad básica
// ✅ flujo limpio email + teléfono

import { getAuth, getDb } from "./../services/firebaseConfig";
import { claimPhoneForUid } from "./../services/accountLinkingService";

// --------------------------------------------------
// Helpers internos (lazy imports)
// --------------------------------------------------
async function fs() {
  return await import("firebase/firestore");
}

async function authMod() {
  return await import("firebase/auth");
}

function isStandalonePWA() {
  try {
    return (
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone === true
    );
  } catch {
    return false;
  }
}

export function normalizePhoneNumber(raw) {
  let formatted = String(raw || "").trim().replace(/\s+/g, "");
  if (!formatted) return "";
  if (!formatted.startsWith("+")) formatted = `+34${formatted}`;
  return formatted;
}

// --------------------------------------------------
// Crear progreso inicial
// --------------------------------------------------
async function createInitialProgress(userId) {
  const db = await getDb();
  const { doc, setDoc } = await fs();

  await setDoc(doc(db, "progress", userId), {
    userId,
    overall: 0,
    reglamento: { completed: 0, total: 82, progress: 0 },
    audio: { minutes: 0, progress: 0 },
    simulador: { attempts: 0, passed: 0, avgScore: 0, demoAttempts: 0 },
    callejero: { attempts: 0, avgScore: 0, demoAttempts: 0 },
    tarifas: { completed: false },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

// --------------------------------------------------
// Identity Guard
// --------------------------------------------------
async function identityGuardPhone(uid, phoneNumber) {
  try {
    if (!uid || !phoneNumber) return;

    const db = await getDb();
    const {
      collection,
      query,
      where,
      getDocs,
      doc,
      updateDoc,
      serverTimestamp,
    } = await fs();

    const q = query(
      collection(db, "users"),
      where("phoneNumber", "==", phoneNumber)
    );

    const snap = await getDocs(q);
    const others = [];

    snap.forEach((d) => {
      if (d.id !== uid) others.push(d.id);
    });

    if (others.length > 0) {
      await updateDoc(doc(db, "users", uid), {
        needsMerge: true,
        mergeCandidates: others,
        mergeReason: "PHONE_DUPLICATE",
        mergeDetectedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "users", uid), {
        needsMerge: false,
        mergeCandidates: [],
        mergeReason: null,
      });
    }
  } catch (e) {
    console.warn("Identity Guard (phone) error:", e);
  }
}

// --------------------------------------------------
// Registro Email
// --------------------------------------------------
export async function registerWithEmail(name, email, password, phoneNumber) {
  const auth = await getAuth();
  const {
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
  } = await authMod();

  await setPersistence(auth, browserLocalPersistence);

  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  const db = await getDb();
  const { doc, setDoc } = await fs();
  const normalizedPhone = phoneNumber ? normalizePhoneNumber(phoneNumber) : null;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: name,
    email,
    phoneNumber: normalizedPhone,
    canonicalPhone: normalizedPhone,
    canonicalUid: user.uid,

    phoneVerified: false,
    phoneVerifiedAt: null,

    emailVerifiedSnapshot: !!user.emailVerified,
    emailVerifiedAt: user.emailVerified ? new Date().toISOString() : null,

    registrationStep: user.emailVerified
      ? "phone_verification_pending"
      : "email_verification_pending",

    needsMerge: false,
    mergeCandidates: [],
    mergeReason: null,

    linkingStatus: "none",
    linkCandidateUid: null,
    identityRiskLevel: "low",

    providers: ["password"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await createInitialProgress(user.uid);
  await identityGuardPhone(user.uid, normalizedPhone);

  return user;
}

// --------------------------------------------------
// Verificación de email
// --------------------------------------------------
export async function sendEmailVerificationToUser(user) {
  if (!user) throw new Error("No hay usuario para verificar.");

  const { sendEmailVerification } = await authMod();
  await sendEmailVerification(user);
}

export async function resendEmailVerification() {
  const auth = await getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay sesión activa.");
  }

  const { sendEmailVerification } = await authMod();
  await sendEmailVerification(currentUser);
}

export async function syncEmailVerificationStatus(uid) {
  const auth = await getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return false;

  await currentUser.reload();

  const verified = !!currentUser.emailVerified;
  const db = await getDb();
  const { doc, updateDoc, serverTimestamp } = await fs();

  await updateDoc(doc(db, "users", uid || currentUser.uid), {
    emailVerifiedSnapshot: verified,
    emailVerifiedAt: verified ? serverTimestamp() : null,
    registrationStep: verified
      ? "phone_verification_pending"
      : "email_verification_pending",
    updatedAt: serverTimestamp(),
  });

  return verified;
}

// --------------------------------------------------
// Login Email
// --------------------------------------------------
export async function loginWithEmail(email, password) {
  const auth = await getAuth();
  const {
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
  } = await authMod();

  await setPersistence(auth, browserLocalPersistence);

  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function resetPassword(email) {
  const auth = await getAuth();
  const { sendPasswordResetEmail } = await authMod();
  await sendPasswordResetEmail(auth, email);
}

// --------------------------------------------------
// Google Login
// --------------------------------------------------
export async function loginWithGoogle() {
  const auth = await getAuth();
  const {
    setPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
  } = await authMod();

  await setPersistence(auth, browserLocalPersistence);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const isPWA = isStandalonePWA();

  let result = null;

  // 1) Recuperar posible retorno de redirect
  try {
    result = await getRedirectResult(auth);
  } catch (e) {
    console.warn("⚠️ Error obteniendo redirect result:", e?.code || e?.message);
  }

  // 2) Si no hay resultado, iniciar login nuevo
  if (!result) {
    if (isPWA) {
      console.log("📱 PWA detectada → usando redirect");
      await signInWithRedirect(auth, provider);
      return null;
    }

    try {
      console.log("🌐 Web detectada → usando popup");
      result = await signInWithPopup(auth, provider);
    } catch (e) {
      console.warn("⚠️ Popup falló, fallback a redirect:", e?.code || e?.message);
      await signInWithRedirect(auth, provider);
      return null;
    }
  }

  if (!result?.user) {
    throw new Error("No se pudo iniciar sesión con Google.");
  }

  const user = result.user;

  const db = await getDb();
  const { doc, getDoc, setDoc } = await fs();

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || null,
      phoneNumber: null,
      canonicalPhone: null,
      canonicalUid: user.uid,

      phoneVerified: false,
      phoneVerifiedAt: null,

      emailVerifiedSnapshot: !!user.emailVerified,
      emailVerifiedAt: user.emailVerified ? new Date().toISOString() : null,

      registrationStep: "phone_verification_pending",

      needsMerge: false,
      mergeCandidates: [],
      mergeReason: null,

      linkingStatus: "none",
      linkCandidateUid: null,
      identityRiskLevel: "low",

      providers: ["google.com"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await createInitialProgress(user.uid);

    return { user, needsPhone: true };
  }

  const data = snap.data();
  return { user, needsPhone: !data.phoneVerified };
}

// --------------------------------------------------
// Guardar teléfono SIN verificar
// --------------------------------------------------
export async function savePhoneNumber(uid, phoneNumber) {
  const db = await getDb();
  const { doc, updateDoc, serverTimestamp } = await fs();
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  await updateDoc(doc(db, "users", uid), {
    phoneNumber: normalizedPhone,
    canonicalPhone: normalizedPhone,
    phoneVerified: false,
    updatedAt: serverTimestamp(),
  });

  await identityGuardPhone(uid, normalizedPhone);
}

// --------------------------------------------------
// Marcar teléfono verificado
// --------------------------------------------------
export async function markPhoneAsVerified(uid, phoneNumber, meta = {}) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);
  const result = await claimPhoneForUid(uid, normalizedPhone, meta);

  if (result?.status === "ok" && !result.conflict) {
    await identityGuardPhone(uid, result.phoneNumber);

    const db = await getDb();
    const { doc, updateDoc, serverTimestamp } = await fs();

    await updateDoc(doc(db, "users", uid), {
      registrationStep: "identity_completed",
      updatedAt: serverTimestamp(),
    });
  }

  return result;
}