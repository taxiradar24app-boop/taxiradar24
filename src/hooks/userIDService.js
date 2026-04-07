// src/hooks/userIDService.js
// ✅ Enterprise Lazy Firebase
// ✅ auth / identidad básica
// ✅ flujo limpio email + teléfono
// ✅ Google Auth robusto para web, móvil y PWA

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

async function ensureGoogleUserDocument(user) {
  const db = await getDb();
  const { doc, getDoc, setDoc, serverTimestamp } = await fs();

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
      updatedAtServer: serverTimestamp(),
    });

    await createInitialProgress(user.uid);

    return { user, needsPhone: true };
  }

  const data = snap.data() || {};
  const providers = Array.isArray(data.providers) ? data.providers : [];

  if (!providers.includes("google.com")) {
    await setDoc(
      userRef,
      {
        providers: [...providers, "google.com"],
        email: user.email || data.email || null,
        displayName: user.displayName || data.displayName || "",
        emailVerifiedSnapshot: !!user.emailVerified,
        emailVerifiedAt:
          user.emailVerified && !data.emailVerifiedAt
            ? new Date().toISOString()
            : data.emailVerifiedAt || null,
        updatedAt: new Date().toISOString(),
        updatedAtServer: serverTimestamp(),
      },
      { merge: true }
    );
  } else {
    await setDoc(
      userRef,
      {
        email: user.email || data.email || null,
        displayName: user.displayName || data.displayName || "",
        emailVerifiedSnapshot: !!user.emailVerified,
        updatedAt: new Date().toISOString(),
        updatedAtServer: serverTimestamp(),
      },
      { merge: true }
    );
  }

  return { user, needsPhone: !data.phoneVerified };
}

export function normalizePhoneNumber(raw) {
  let formatted = String(raw || "")
    .trim()
    .replace(/\s+/g, "");
  if (!formatted) return "";
  if (!formatted.startsWith("+")) formatted = `+34${formatted}`;
  return formatted;
}

// --------------------------------------------------
// Crear progreso inicial
// --------------------------------------------------
async function createInitialProgress(userId) {
  const db = await getDb();
  const { doc, setDoc, serverTimestamp } = await fs();

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
    updatedAtServer: serverTimestamp(),
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
  const { doc, setDoc, serverTimestamp } = await fs();
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
    updatedAtServer: serverTimestamp(),
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
    signOut,
  } = await authMod();

  await setPersistence(auth, browserLocalPersistence);

  try {
    await signOut(auth);
  } catch {
    // no-op
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const result = await signInWithPopup(auth, provider);

    if (!result?.user) {
      throw new Error("No se pudo iniciar sesión con Google.");
    }

    sessionStorage.removeItem("googleAuthInProgress");
    return await ensureGoogleUserDocument(result.user);
  } catch (e) {
    const shouldFallbackToRedirect =
      e?.code === "auth/popup-blocked" ||
      e?.code === "auth/popup-closed-by-user" ||
      e?.code === "auth/cancelled-popup-request" ||
      e?.code === "auth/operation-not-supported-in-this-environment";

    if (!shouldFallbackToRedirect) {
      throw e;
    }

    console.warn(
      "⚠️ Popup no disponible, cambiando a redirect:",
      e?.code || e?.message
    );

    await signInWithRedirect(auth, provider);
    return { redirecting: true };
  }
}

// --------------------------------------------------
// Procesar redirect Google
// --------------------------------------------------
export async function resolveGoogleRedirectLogin() {
  const auth = await getAuth();
  const { getRedirectResult } = await authMod();

  try {
    const result = await getRedirectResult(auth);

    if (!result?.user) {
      sessionStorage.removeItem("googleAuthInProgress");
      return null;
    }

    sessionStorage.removeItem("googleAuthInProgress");
    return await ensureGoogleUserDocument(result.user);
  } catch (e) {
    sessionStorage.removeItem("googleAuthInProgress");
    console.warn(
      "⚠️ Error obteniendo redirect result:",
      e?.code || e?.message
    );
    throw e;
  }
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