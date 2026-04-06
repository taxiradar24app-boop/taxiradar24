// src/services/firebaseConfig.js

let _appInstance = null;
let _authInstance = null;
let _dbInstance = null;
let _persistenceReady = false;
let _firebaseConfigCache = null;

function getEnvVar(key) {
  return (
    (typeof process !== "undefined" && process.env?.[`REACT_APP_${key}`]) ||
    (typeof process !== "undefined" && process.env?.[key]) ||
    (typeof window !== "undefined" && window.__ENV__?.[`REACT_APP_${key}`]) ||
    (typeof window !== "undefined" && window.__ENV__?.[key]) ||
    ""
  );
}

function buildFirebaseConfig() {
  if (_firebaseConfigCache) return _firebaseConfigCache;

  const config = {
    apiKey:
      getEnvVar("FIREBASE_API_KEY") ||
      "AIzaSyBA6MEcmuci9c8uFhvRwkasG5ot8BeiRHM",

    // 🔥 SOLUCIÓN CRÍTICA PARA PWA / MOBILE
    authDomain: "taxiradar24.com",

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

    measurementId:
      getEnvVar("FIREBASE_MEASUREMENT_ID") ||
      "G-PMNL95ESWN",
  };

  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingKeys = requiredKeys.filter((key) => !config[key]);

  if (missingKeys.length > 0) {
    console.error("🔥 Firebase CONFIG ERROR", {
      missingKeys,
      configPreview: {
        apiKey: !!config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
      },
    });

    throw new Error(
      `Firebase config incompleta. Faltan: ${missingKeys.join(", ")}`
    );
  }

  _firebaseConfigCache = config;
  return _firebaseConfigCache;
}

export function getFirebaseConfig() {
  return buildFirebaseConfig();
}

export async function getApp() {
  if (_appInstance) return _appInstance;

  const { initializeApp, getApps, getApp: getExistingApp } = await import(
    "firebase/app"
  );

  const config = buildFirebaseConfig();

  _appInstance = getApps().length ? getExistingApp() : initializeApp(config);

  return _appInstance;
}

export async function getAuth() {
  if (_authInstance) return _authInstance;

  const app = await getApp();

  const { getAuth, setPersistence, browserLocalPersistence } = await import(
    "firebase/auth"
  );

  const auth = getAuth(app);

  if (!_persistenceReady) {
    _persistenceReady = true;
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
      console.error("Error al establecer persistencia:", error);
    }
  }

  _authInstance = auth;
  return auth;
}

export async function getDb() {
  if (_dbInstance) return _dbInstance;

  const app = await getApp();

  const { getFirestore } = await import("firebase/firestore");

  _dbInstance = getFirestore(app);
  return _dbInstance;
}

