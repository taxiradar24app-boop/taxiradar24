// src/services/firebaseConfig.js
// =======================================================
// ✅ Firebase "Enterprise" - Lazy Load + Compat Layer
// - NO exporta db/auth como instancias (evita bundle inicial pesado)
// - Exporta getters async: getDb(), getAuth()
// - Mantiene exports app/firebaseConfig para compat
// =======================================================

import { app, firebaseConfig } from "./firebaseApp";

let _authInstance = null;
let _dbInstance = null;
let _persistenceReady = false;

// -----------------------------
// ✅ AUTH lazy + persistencia 1 vez
// -----------------------------
export async function getAuth() {
  if (_authInstance) return _authInstance;

  const { getAuth, setPersistence, browserLocalPersistence } = await import(
    "firebase/auth"
  );

  const auth = getAuth(app);

  // Persistencia solo una vez (evita re-ejecuciones)
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

// -----------------------------
// ✅ FIRESTORE lazy
// -----------------------------
export async function getDb() {
  if (_dbInstance) return _dbInstance;

  const { getFirestore } = await import("firebase/firestore");
  _dbInstance = getFirestore(app);

  return _dbInstance;
}

// -----------------------------
// ✅ Compat exports (ligeros)
// -----------------------------
export { app, firebaseConfig };

// ❌ Importante: ya NO exportamos `db` ni `auth` directos.
// Si algún archivo hace `import { db } ...` fallará, y eso es correcto:
// te obliga a migrar ese archivo a getDb().
// (Vamos migrando primero los globales)