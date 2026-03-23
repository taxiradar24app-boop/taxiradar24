let firestoreMod = null;

async function getFirestoreModule() {
  if (!firestoreMod) {
    firestoreMod = await import("firebase/firestore");
  }
  return firestoreMod;
}

export async function getDocLazy(...args) {
  const { getDoc } = await getFirestoreModule();
  return getDoc(...args);
}

export async function docLazy(...args) {
  const { doc } = await getFirestoreModule();
  return doc(...args);
}

export async function setDocLazy(...args) {
  const { setDoc } = await getFirestoreModule();
  return setDoc(...args);
}

export async function onSnapshotLazy(...args) {
  const { onSnapshot } = await getFirestoreModule();
  return onSnapshot(...args);
}

export async function serverTimestampLazy() {
  const { serverTimestamp } = await getFirestoreModule();
  return serverTimestamp();
}