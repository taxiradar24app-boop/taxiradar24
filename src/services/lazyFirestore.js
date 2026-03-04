// src/services/lazyFirestore.js
let _firestoreMod;

export async function getFirestoreModule() {
  if (!_firestoreMod) {
    _firestoreMod = await import("firebase/firestore");
  }

  const {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    collection,
    query,
    where,
  } = _firestoreMod;

  return {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    collection,
    query,
    where,
  };
}