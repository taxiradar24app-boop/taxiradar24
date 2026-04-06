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

  const isPWA = isStandalonePWA();

  let result = null;

  try {
    result = await getRedirectResult(auth);

    if (result?.user) {
      sessionStorage.removeItem("googleRedirectInProgress");
    }
  } catch (e) {
    sessionStorage.removeItem("googleRedirectInProgress");
    console.warn("⚠️ Error obteniendo redirect result:", e?.code || e?.message);
  }

  if (!result) {
    if (isPWA) {
      console.log("📱 PWA detectada → usando redirect");
      sessionStorage.setItem("googleRedirectInProgress", "1");
      await signInWithRedirect(auth, provider);
      return null;
    }

    try {
      console.log("🌐 Web detectada → usando popup");
      result = await signInWithPopup(auth, provider);
    } catch (e) {
      console.warn("⚠️ Popup falló, fallback a redirect:", e?.code || e?.message);
      sessionStorage.setItem("googleRedirectInProgress", "1");
      await signInWithRedirect(auth, provider);
      return null;
    }
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