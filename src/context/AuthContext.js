// ===========================================
// 🌍 AuthContext.js — TaxiRadar24 (Enterprise Lazy)
// ===========================================

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { getAuth, getDb } from "@/services/firebaseConfig";

import usePWAInstallPrompt from "./../hooks/usePWAInstallPrompt";
import InstallBanner from "./../components/UI/PWA/InstallBanner";

import {
  fetchMySubscription,
  isSubscriptionActive,
} from "./../services/subscriptionService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const { canShowPrompt, promptInstall, setCanShowPrompt } =
    usePWAInstallPrompt();

  // =========================================================
  // Helpers
  // =========================================================
  const refreshUserDocs = useCallback(async (u) => {
    if (!u?.uid) return;

    const db = await getDb();
    const { doc, getDoc } = await import("firebase/firestore");

    const userRef = doc(db, "users", u.uid);
    const snap = await getDoc(userRef);
    setUserData(snap.exists() ? snap.data() : null);

    const progressRef = doc(db, "progress", u.uid);
    const progressSnap = await getDoc(progressRef);
    setProgressData(progressSnap.exists() ? progressSnap.data() : null);
  }, []);

  const refreshSubscription = useCallback(async (u) => {
    if (!u) {
      setSubscription(null);
      return;
    }

    setSubscriptionLoading(true);
    try {
      const sub = await fetchMySubscription(u);
      setSubscription(sub);
    } catch (e) {
      console.error("❌ Error cargando suscripción:", e);
      setSubscription({ status: "none", plan: null, expires_at: null });
    } finally {
      setSubscriptionLoading(false);
    }
  }, []);

  // ✅ Actualiza el estado local tras verificar/guardar teléfono
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

  // =========================================================
  // 🔐 Auth state (Lazy)
  // =========================================================
  useEffect(() => {
    let unsub;

    async function initAuth() {
      const auth = await getAuth();
      const { onAuthStateChanged } = await import("firebase/auth");

      unsub = onAuthStateChanged(auth, async (u) => {
        if (!u) {
          setUser(null);
          setUserData(null);
          setProgressData(null);
          setSubscription(null);
          setLoading(false);
          return;
        }

        setLoading(true);
        setUser(u);

        await refreshUserDocs(u);
        await refreshSubscription(u);

        if (canShowPrompt) setShowInstallBanner(true);
        setLoading(false);
      });
    }

    initAuth();

    return () => unsub && unsub();
  }, [canShowPrompt, refreshSubscription, refreshUserDocs]);

  // =========================================================
  // 🚪 Logout
  // =========================================================
  const logout = useCallback(async () => {
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);

    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);

    window.location.href = "/";
  }, []);

  // =========================================================
  // PWA Banner
  // =========================================================
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
    const proActive = isSubscriptionActive(subscription);

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