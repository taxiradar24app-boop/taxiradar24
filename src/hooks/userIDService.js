export async function loginWithGoogle() {
  const auth = await getAuth();
  const {
    setPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
  } = await authMod();

  await setPersistence(auth, browserLocalPersistence);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const ua = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isPWA =
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true;

  const useRedirect = isIOS || isPWA;

  let result = null;

  // 1. Intentar recuperar redirect previo
  try {
    result = await getRedirectResult(auth);
  } catch (e) {
    console.warn("⚠️ Error obteniendo redirect result:", e?.code || e?.message);
  }

  // 2. Si ya volvió de Google, procesar resultado
  if (result?.user) {
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
      });

      await createInitialProgress(user.uid);

      return { user, needsPhone: true };
    }

    const data = snap.data();
    return { user, needsPhone: !data.phoneVerified };
  }

  // 3. Si es iPhone/iPad/PWA -> siempre redirect
  if (useRedirect) {
    console.log("📱 iOS/PWA detectado → usando redirect");
    await signInWithRedirect(auth, provider);
    return { redirecting: true };
  }

  // 4. Desktop/web normal -> popup
  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    console.warn("⚠️ Popup falló, fallback a redirect:", e?.code || e?.message);
    await signInWithRedirect(auth, provider);
    return { redirecting: true };
  }

  if (!result?.user) {
    throw new Error("No se pudo iniciar sesión con Google.");
  }

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
    });

    await createInitialProgress(user.uid);

    return { user, needsPhone: true };
  }

  const data = snap.data();
  return { user, needsPhone: !data.phoneVerified };
}