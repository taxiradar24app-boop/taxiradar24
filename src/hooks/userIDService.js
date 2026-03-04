// src/hooks/userIDService.js
// ✅ Enterprise Lazy Firebase (sin romper lógica)

import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDb } from "./../services/firebaseConfig";

// --------------------------------------------------
// Helpers internos (lazy imports)
// --------------------------------------------------
async function fs() {
  return await import("firebase/firestore");
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
// ✅ Identity Guard (Enterprise)
// Si el teléfono ya existe en OTRO user doc => needsMerge
// --------------------------------------------------
async function identityGuardPhone(uid, phoneNumber) {
  try {
    if (!uid || !phoneNumber) return;

    const db = await getDb();
    const { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } =
      await fs();

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
      // Marcamos SOLO en el canónico (y guardamos referencia)
      await updateDoc(doc(db, "users", uid), {
        needsMerge: true,
        mergeCandidates: others,
        mergeReason: "PHONE_DUPLICATE",
        mergeDetectedAt: serverTimestamp(),
      });
    } else {
      // Limpieza (por si antes se marcó y ya no aplica)
      await updateDoc(doc(db, "users", uid), {
        needsMerge: false,
        mergeCandidates: [],
        mergeReason: null,
      });
    }
  } catch (e) {
    console.warn("Identity Guard (phone) error:", e);
    // No rompemos flujo principal
  }
}

// --------------------------------------------------
// Registro Email
// --------------------------------------------------
export async function registerWithEmail(name, email, password, phoneNumber) {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);

  const { createUserWithEmailAndPassword } = await import("firebase/auth");
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  const db = await getDb();
  const { doc, setDoc } = await fs();

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: name,
    email,
    phoneNumber: phoneNumber || null,
    phoneVerified: false,
    phoneVerifiedAt: null,
    createdAt: new Date().toISOString(),
  });

  await createInitialProgress(user.uid);

  return user;
}

// --------------------------------------------------
// Login Email
// --------------------------------------------------
export async function loginWithEmail(email, password) {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);

  const { signInWithEmailAndPassword } = await import("firebase/auth");
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function resetPassword(email) {
  const auth = getAuth();
  const { sendPasswordResetEmail } = await import("firebase/auth");
  await sendPasswordResetEmail(auth, email);
}

// --------------------------------------------------
// Google Login
// --------------------------------------------------
export async function loginWithGoogle() {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);

  const {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
  } = await import("firebase/auth");

  try {
    await signOut(auth);
  } catch {}

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  let result;

  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    if (
      e?.code === "auth/popup-blocked" ||
      e?.code === "auth/popup-closed-by-user"
    ) {
      await signInWithRedirect(auth, provider);
      result = await getRedirectResult(auth);
    } else {
      throw e;
    }
  }

  if (!result) throw new Error("No se obtuvo resultado.");

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
      phoneVerified: false,
      phoneVerifiedAt: null,
      // ✅ Identity guard fields
      needsMerge: false,
      mergeCandidates: [],
      mergeReason: null,
      createdAt: new Date().toISOString(),
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
  const { doc, updateDoc } = await fs();

  await updateDoc(doc(db, "users", uid), {
    phoneNumber,
    phoneVerified: false,
  });

  // ✅ Identity Guard
  await identityGuardPhone(uid, phoneNumber);
}

// --------------------------------------------------
// 🔐 Marcar teléfono verificado (Enterprise)
// - SIEMPRE en users/{uidCanónico}
// - Identity Guard duplicados
// --------------------------------------------------
export async function markPhoneAsVerified(uid, phoneNumber) {
  const db = await getDb();
  const { doc, updateDoc, serverTimestamp } = await fs();

  await updateDoc(doc(db, "users", uid), {
    phoneNumber,
    phoneVerified: true,
    phoneVerifiedAt: serverTimestamp(),
  });

  // ✅ Identity Guard
  await identityGuardPhone(uid, phoneNumber);
}