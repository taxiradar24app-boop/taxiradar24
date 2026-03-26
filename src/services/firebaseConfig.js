// src/services/firebaseConfig.js

let _appInstance = null;
let _authInstance = null;
let _dbInstance = null;
let _persistenceReady = false;
let _firebaseConfigCache = null;

function buildFirebaseConfig() {
  if (_firebaseConfigCache) return _firebaseConfigCache;

  const config = {
    apiKey:
      process.env.REACT_APP_FIREBASE_API_KEY ||
      process.env.FIREBASE_API_KEY ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_API_KEY) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_API_KEY),

    authDomain:
      process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
      process.env.FIREBASE_AUTH_DOMAIN ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_AUTH_DOMAIN) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_AUTH_DOMAIN),

    projectId:
      process.env.REACT_APP_FIREBASE_PROJECT_ID ||
      process.env.FIREBASE_PROJECT_ID ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_PROJECT_ID) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_PROJECT_ID),

    storageBucket:
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
      process.env.FIREBASE_STORAGE_BUCKET ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_STORAGE_BUCKET) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_STORAGE_BUCKET),

    messagingSenderId:
      process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
      process.env.FIREBASE_MESSAGING_SENDER_ID ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_MESSAGING_SENDER_ID) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_MESSAGING_SENDER_ID),

    appId:
      process.env.REACT_APP_FIREBASE_APP_ID ||
      process.env.FIREBASE_APP_ID ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_APP_ID) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_APP_ID),

    measurementId:
      process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ||
      process.env.FIREBASE_MEASUREMENT_ID ||
      (typeof window !== "undefined" && window.__ENV__?.REACT_APP_FIREBASE_MEASUREMENT_ID) ||
      (typeof window !== "undefined" && window.__ENV__?.FIREBASE_MEASUREMENT_ID),
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