// src/services/firebaseConfig.js

let _appInstance = null;
let _authInstance = null;
let _dbInstance = null;

let _authModule = null;
let _firestoreModule = null;

let _firebaseConfigCache = null;

// --------------------------------------------------
// ENV
// --------------------------------------------------
function getEnvVar(key) {
  return (
    (typeof process !== "undefined" && process.env?.[`REACT_APP_${key}`]) ||
    (typeof process !== "undefined" && process.env?.[key]) ||
    (typeof window !== "undefined" && window.__ENV__?.[`REACT_APP_${key}`]) ||
    (typeof window !== "undefined" && window.__ENV__?.[key]) ||
    ""
  );
}

// --------------------------------------------------
// CONFIG
// --------------------------------------------------
function buildFirebaseConfig() {
  if (_firebaseConfigCache) return _firebaseConfigCache;

  const config = {
    apiKey:
      getEnvVar("FIREBASE_API_KEY") ||
      "AIzaSyBA6MEcmuci9c8uFhvRwkasG5ot8BeiRHM",

    authDomain:
      getEnvVar("FIREBASE_AUTH_DOMAIN") ||
      "taxiradar24.com",

    projectId:
      getEnvVar("FIREBASE_PROJECT_ID") ||
      "taxiradar24db",

    storageBucket:
      getEnvVar("FIREBASE_STORAGE_BUCKET") ||
      "taxiradar24db.firebasestorage.app",

    messagingSenderId:
      getEnvVar("FIREBASE_MESSAGING_SENDER_ID") ||
      "829274808088",

    appId:
      getEnvVar("FIREBASE_APP_ID") ||
      "1:829274808088:web:db5ed97be1d89146d1086d",
  };

  _firebaseConfigCache = config;
  return config;
}

// --------------------------------------------------
// APP
// --------------------------------------------------
export async function getApp() {
  if (_appInstance) return _appInstance;

  const firebaseApp = await import("firebase/app");

  const config = buildFirebaseConfig();

  _appInstance =
    firebaseApp.getApps().length > 0
      ? firebaseApp.getApp()
      : firebaseApp.initializeApp(config);

  return _appInstance;
}

// --------------------------------------------------
// AUTH
// --------------------------------------------------
export async function getAuth() {
  if (_authInstance) return _authInstance;

  const app = await getApp();

  if (!_authModule) {
    _authModule = await import("firebase/auth");
  }

  const { getAuth, setPersistence, browserLocalPersistence } = _authModule;

  const auth = getAuth(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (e) {
    console.warn("⚠️ persistencia auth:", e?.message);
  }

  _authInstance = auth;
  return auth;
}

// --------------------------------------------------
// FIRESTORE
// --------------------------------------------------
export async function getDb() {
  if (_dbInstance) return _dbInstance;

  const app = await getApp();

  if (!_firestoreModule) {
    _firestoreModule = await import("firebase/firestore");
  }

  const { getFirestore } = _firestoreModule;

  _dbInstance = getFirestore(app);
  return _dbInstance;
}