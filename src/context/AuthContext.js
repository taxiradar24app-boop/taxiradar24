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
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const tokenCacheRef = useRef(null);
  const tokenTimeRef = useRef(0);

  const { canShowPrompt, promptInstall, setCanShowPrompt } =
    usePWAInstallPrompt();

  const refreshUserDocs = useCallback(async (currentUser) => {
    if (!currentUser?.uid) return;

    const db = await getDb();

    const userRef = await docLazy(db, "users", currentUser.uid);
    const progressRef = await docLazy(db, "progress", currentUser.uid);

    const [userSnap, progressSnap] = await Promise.all([
      getDocLazy(userRef),
      getDocLazy(progressRef),
    ]);

    setUserData(userSnap.exists() ? userSnap.data() : null);
    setProgressData(progressSnap.exists() ? progressSnap.data() : null);
  }, []);

  const refreshSubscription = useCallback(
    async (userParam) => {
      const currentUser = userParam || user;

      if (!currentUser) {
        setSubscription(null);
        setSubscriptionLoading(false);
        return;
      }

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
      } catch (error) {
        console.error("❌ Error cargando suscripción:", error);
        setSubscription(
          (prev) => prev || { status: "none", active: false, plan: null }
        );
      } finally {
        setSubscriptionLoading(false);
      }
    },
    [user]
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
            setLoading(false);
            return;
          }

          setUser(currentUser);
          setLoading(false);

          await refreshUserDocs(currentUser);
          await refreshSubscription(currentUser);

          if (mounted && canShowPrompt) {
            setShowInstallBanner(true);
          }
        });
      } catch (error) {
        console.error("❌ Error inicializando auth:", error);
        if (mounted) {
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

    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);
    setSubscriptionLoading(false);
    tokenCacheRef.current = null;
    tokenTimeRef.current = 0;

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
      logout,

      refreshUserDocs: () => refreshUserDocs(user),
      refreshSubscription: () => refreshSubscription(user),

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