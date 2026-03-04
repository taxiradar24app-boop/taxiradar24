// ===========================================
// 🌍 AuthContext.js — TaxiRadar24 (Enterprise Lazy)
// ===========================================

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getAuth } from "@/services/firebaseConfig";
import { getDb } from "@/services/firebaseConfig";

import usePWAInstallPrompt from "./../hooks/usePWAInstallPrompt";
import InstallBanner from "./../components/IU/PWA/InstallBanner";

import { fetchMySubscription, isSubscriptionActive } from "./../services/subscriptionService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const { canShowPrompt, promptInstall, setCanShowPrompt } = usePWAInstallPrompt();

  // =========================================================
  // Helpers
  // =========================================================
  const refreshUserDocs = async (u) => {
    if (!u) return;

    const db = await getDb();
    const { doc, getDoc } = await import("firebase/firestore");

    const userRef = doc(db, "users", u.uid);
    const snap = await getDoc(userRef);
    setUserData(snap.exists() ? snap.data() : null);

    const progressRef = doc(db, "progress", u.uid);
    const progressSnap = await getDoc(progressRef);
    setProgressData(progressSnap.exists() ? progressSnap.data() : null);
  };

  const refreshSubscription = async (u) => {
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
  };

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

        setUser(u);

        await refreshUserDocs(u);
        await refreshSubscription(u);

        if (canShowPrompt) setShowInstallBanner(true);
        setLoading(false);
      });
    }

    initAuth();

    return () => unsub && unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canShowPrompt]);

  // =========================================================
  // 🚪 Logout
  // =========================================================
  const logout = async () => {
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);

    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);

    window.location.href = "/";
  };

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

      isLogged: !!user,
      hasIdentityConflict: !!userData?.needsMerge,

      isPro: proActive,
      isFree: !proActive,

      emailVerified: emailOk,
      phoneVerified: phoneOk,

      needsProOnboarding: proActive && (!emailOk || !phoneOk),

      hasProgress: !!progressData,
    };
  }, [user, userData, progressData, subscription, subscriptionLoading, loading]);

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