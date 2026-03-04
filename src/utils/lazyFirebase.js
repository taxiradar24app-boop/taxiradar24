// src/utils/lazyFirebase.js
// Carga diferida y con caché de todas las funciones de Firebase Auth que usa la app
let _authMod;

export async function getFirebaseAuth() {
  if (!_authMod) {
    _authMod = await import("firebase/auth");
  }

  const {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,

    signInWithPhoneNumber,
    linkWithPhoneNumber, // ✅ AÑADIDO

    onAuthStateChanged,
    verifyPasswordResetCode,
    confirmPasswordReset,

    RecaptchaVerifier,
  } = _authMod;

  return {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,

    signInWithPhoneNumber,
    linkWithPhoneNumber, // ✅ AÑADIDO

    onAuthStateChanged,
    verifyPasswordResetCode,
    confirmPasswordReset,

    RecaptchaVerifier,
  };
}