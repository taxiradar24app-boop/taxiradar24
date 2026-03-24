// src/services/firebaseConfig.js
// =======================================================
// ✅ Firebase "Enterprise" - Lazy total
// - Inicialización lazy sin dependencia de módulos globales
// - Inicializa Firebase App solo cuando hace falta
// - Exporta getters async: getApp(), getAuth(), getDb()
// - Mantiene compat exportando getFirebaseConfig()
// =======================================================

let _appInstance = null;
let _authInstance = null;
let _dbInstance = null;
let _persistenceReady = false;
let _firebaseConfigCache = null;

function readEnvValue(key) {
  if (
    typeof process !== "undefined" &&
    process.env &&
    typeof process.env[key] !== "undefined"
  ) {
    return process.env[key];
  }

  if (
    typeof window !== "undefined" &&
    window.__ENV__ &&
    typeof window.__ENV__[key] !== "undefined"
  ) {
    return window.__ENV__[key];
  }

  return undefined;
}

function buildFirebaseConfig() {
  if (_firebaseConfigCache) return _firebaseConfigCache;

  const config = {
    apiKey:
      readEnvValue("REACT_APP_FIREBASE_API_KEY") ||
      readEnvValue("FIREBASE_API_KEY"),
    authDomain:
      readEnvValue("REACT_APP_FIREBASE_AUTH_DOMAIN") ||
      readEnvValue("FIREBASE_AUTH_DOMAIN"),
    projectId:
      readEnvValue("REACT_APP_FIREBASE_PROJECT_ID") ||
      readEnvValue("FIREBASE_PROJECT_ID"),
    storageBucket:
      readEnvValue("REACT_APP_FIREBASE_STORAGE_BUCKET") ||
      readEnvValue("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId:
      readEnvValue("REACT_APP_FIREBASE_MESSAGING_SENDER_ID") ||
      readEnvValue("FIREBASE_MESSAGING_SENDER_ID"),
    appId:
      readEnvValue("REACT_APP_FIREBASE_APP_ID") ||
      readEnvValue("FIREBASE_APP_ID"),
    measurementId:
      readEnvValue("REACT_APP_FIREBASE_MEASUREMENT_ID") ||
      readEnvValue("FIREBASE_MEASUREMENT_ID"),
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