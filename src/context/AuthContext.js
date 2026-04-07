// src/context/AuthContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

import { getAuth, getDb } from "@/services/firebaseConfig";
import { docLazy, getDocLazy } from "@/services/firestoreService";
import { resolveGoogleRedirectLogin } from "@/hooks/userIDService";

import usePWAInstallPrompt from "./../hooks/usePWAInstallPrompt";
import InstallBanner from "./../components/UI/PWA/InstallBanner";

import { fetchMySubscription } from "./../services/subscriptionService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [googleResolving, setGoogleResolving] = useState(
    sessionStorage.getItem("googleAuthInProgress") === "1"
  );
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const tokenCacheRef = useRef(null);
  const tokenTimeRef = useRef(0);
  const lastSubscriptionFetchRef = useRef(0);
  const subscriptionInFlightRef = useRef(false);
  const authInitializedRef = useRef(false);

  const { canShowPrompt, promptInstall, setCanShowPrompt } =
    usePWAInstallPrompt();

  const refreshUserDocs = useCallback(async (currentUser) => {
    if (!currentUser?.uid) {
      setUserData(null);
      setProgressData(null);
      return { userDoc: null, progressDoc: null };
    }

    const db = await getDb();

    const userRef = await docLazy(db, "users", currentUser.uid);
    const progressRef = await docLazy(db, "progress", currentUser.uid);

    const [userSnap, progressSnap] = await Promise.all([
      getDocLazy(userRef),
      getDocLazy(progressRef),
    ]);

    const userDoc = userSnap.exists() ? userSnap.data() : null;
    const progressDoc = progressSnap.exists() ? progressSnap.data() : null;

    setUserData(userDoc);
    setProgressData(progressDoc);

    return { userDoc, progressDoc };
  }, []);

  const refreshSubscription = useCallback(
    async (userParam, options = {}) => {
      const currentUser = userParam || user;
      const force = options.force === true;

      if (!currentUser) {
        setSubscription(null);
        setSubscriptionLoading(false);
        return null;
      }

      if (subscriptionInFlightRef.current) {
        return subscription;
      }

      const now = Date.now();
      const cooldownMs = 5000;

      if (!force && now - lastSubscriptionFetchRef.current < cooldownMs) {
        return subscription;
      }

      subscriptionInFlightRef.current = true;
      lastSubscriptionFetchRef.current = now;
      setSubscriptionLoading(true);

      try {
        let token = tokenCacheRef.current;

        if (!token || Date.now() - tokenTimeRef.current > 60000) {
          try {
            token = await currentUser.getIdToken();
            tokenCacheRef.current = token;
            tokenTimeRef.current = Date.now();
          } catch (err) {
            console.warn("⚠️ Firebase token falló:", err?.message);
            token = null;
          }
        }

        const sub = await fetchMySubscription(currentUser, token);
        setSubscription(sub);
        return sub;
      } catch (error) {
        console.error("❌ Error cargando suscripción:", error);

        if (
          error?.message?.includes("Too many requests") ||
          String(error).includes("429")
        ) {
          lastSubscriptionFetchRef.current = Date.now() + 10000;
        }

        const fallback =
          subscription || { status: "none", active: false, plan: null };

        setSubscription((prev) => prev || fallback);
        return fallback;
      } finally {
        subscriptionInFlightRef.current = false;
        setSubscriptionLoading(false);
      }
    },
    [user, subscription]
  );

  const markPhoneSaved = useCallback((phoneNumber) => {
    setUserData((prev) => ({
      ...(prev || {}),
      phoneNumber: phoneNumber || prev?.phoneNumber || null,
      canonicalPhone: phoneNumber || prev?.canonicalPhone || null,
      phoneVerified: true,
      phoneVerifiedAt: new Date().toISOString(),
      needsMerge: false,
      mergeCandidates: [],
      mergeReason: null,
    }));
  }, []);

  const setIdentityConflict = useCallback((payload = {}) => {
    setUserData((prev) => ({
      ...(prev || {}),
      needsMerge: true,
      mergeCandidates: payload.mergeCandidates || prev?.mergeCandidates || [],
      mergeReason: payload.mergeReason || "PHONE_ALREADY_CLAIMED",
    }));
  }, []);

  useEffect(() => {
    let unsub = null;
    let mounted = true;

    async function initAuth() {
      try {
        const auth = await getAuth();
        const { onAuthStateChanged } = await import("firebase/auth");

        unsub = onAuthStateChanged(auth, async (currentUser) => {
          if (!mounted) return;

          if (!currentUser) {
            setUser(null);
            setUserData(null);
            setProgressData(null);
            setSubscription(null);
            setSubscriptionLoading(false);
            tokenCacheRef.current = null;
            tokenTimeRef.current = 0;

            if (!authInitializedRef.current) {
              authInitializedRef.current = true;
            }

            // si no hay flujo Google en curso, ya no estamos cargando
            if (sessionStorage.getItem("googleAuthInProgress") !== "1") {
              setGoogleResolving(false);
              setLoading(false);
            }

            return;
          }

          authInitializedRef.current = true;
          setUser(currentUser);

          try {
            await refreshUserDocs(currentUser);
            await refreshSubscription(currentUser);
          } finally {
            if (mounted) {
              sessionStorage.removeItem("googleAuthInProgress");
              setGoogleResolving(false);
              setLoading(false);
            }
          }

          if (mounted && canShowPrompt) {
            setShowInstallBanner(true);
          }
        });

        // resolver retorno Google solo una vez al arrancar
        if (sessionStorage.getItem("googleAuthInProgress") === "1") {
          try {
            await resolveGoogleRedirectLogin();
          } catch (redirectError) {
            console.error("❌ Error resolviendo redirect Google:", redirectError);
            sessionStorage.removeItem("googleAuthInProgress");
            setGoogleResolving(false);
          }
        } else {
          setGoogleResolving(false);
        }
      } catch (error) {
        console.error("❌ Error inicializando auth:", error);
        sessionStorage.removeItem("googleAuthInProgress");

        if (mounted) {
          setGoogleResolving(false);
          setLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      mounted = false;
      if (typeof unsub === "function") {
        unsub();
      }
    };
  }, [canShowPrompt, refreshSubscription, refreshUserDocs]);

  const logout = useCallback(async () => {
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);

    sessionStorage.removeItem("googleAuthInProgress");

    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);
    setSubscriptionLoading(false);
    setGoogleResolving(false);

    tokenCacheRef.current = null;
    tokenTimeRef.current = 0;
    lastSubscriptionFetchRef.current = 0;
    subscriptionInFlightRef.current = false;

    window.location.href = "/";
  }, []);

  const handleAccept = async () => {
    await promptInstall();
    setShowInstallBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("skipPWAInstall", "1");
    setShowInstallBanner(false);
    setCanShowPrompt(false);
  };

  const profileReady = !loading && !googleResolving && (!user || userData !== null);

  const value = useMemo(() => {
    const proActive = subscription?.active === true;

    const phoneOk = !!userData?.phoneVerified;
    const emailOk = !!user?.emailVerified;

    return {
      user,
      userData,
      progressData,

      subscription,
      subscriptionLoading,

      loading,
      googleResolving,
      profileReady,
      logout,

      refreshUserDocs: () => refreshUserDocs(user),
      refreshSubscription: (options) => refreshSubscription(user, options),

      markPhoneSaved,
      setIdentityConflict,

      isLogged: !!user,
      hasIdentityConflict: !!userData?.needsMerge,
      identityConflictMessage: userData?.needsMerge
        ? "Este número ya está asociado a otra cuenta. Inicia sesión con la cuenta original o contacta soporte."
        : "",

      isPro: proActive,
      isFree: !proActive,

      emailVerified: emailOk,
      phoneVerified: phoneOk,

      needsProOnboarding: proActive && (!emailOk || !phoneOk),

      hasProgress: !!progressData,
    };
  }, [
    user,
    userData,
    progressData,
    subscription,
    subscriptionLoading,
    loading,
    googleResolving,
    profileReady,
    logout,
    refreshUserDocs,
    refreshSubscription,
    markPhoneSaved,
    setIdentityConflict,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showInstallBanner && (
        <InstallBanner onAccept={handleAccept} onReject={handleReject} />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;