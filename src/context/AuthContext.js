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
import {
  resolveGoogleRedirectLogin,
  getPendingGoogleLinkInfo,
} from "@/hooks/userIDService";

import usePWAInstallPrompt from "./../hooks/usePWAInstallPrompt";
import InstallBanner from "./../components/UI/PWA/InstallBanner";

import { fetchMySubscription } from "./../services/subscriptionService";
import {
  getAuthIntent,
  clearAuthIntent,
} from "@/services/authIntentService";
import { resolvePostAuthRoute } from "@/navigator/postAuthResolver";

export const AuthContext = createContext(null);

function getCurrentAppPath() {
  try {
    const hash = window.location.hash || "";

    if (hash.startsWith("#")) {
      const hashPath = hash.slice(1) || "/";
      return hashPath;
    }

    const pathname = window.location.pathname || "/";
    const search = window.location.search || "";
    return `${pathname}${search}`;
  } catch {
    return "/";
  }
}

function normalizePath(path) {
  if (!path || typeof path !== "string") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function isSameRoute(currentPath, targetPath) {
  return normalizePath(currentPath) === normalizePath(targetPath);
}

function isPendingIdentityPath(path) {
  const normalized = normalizePath(path);
  return (
    normalized === "/check-email" ||
    normalized === "/verify" ||
    normalized === "/identity-merge"
  );
}

function isRouteEligibleForAutoResolution(path) {
  const normalized = normalizePath(path);

  return (
    normalized === "/" ||
    normalized === "/login" ||
    normalized === "/register" ||
    normalized === "/check-email" ||
    normalized === "/verify" ||
    normalized === "/identity-merge"
  );
}

function replaceAppRoute(path) {
  const normalized = normalizePath(path);

  try {
    const base =
      window.location.origin +
      window.location.pathname.replace(/\/$/, "");

    // Compatible con HashRouter
    window.location.replace(`${base}/#${normalized}`);
  } catch {
    window.location.hash = normalized;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);
  const [identityLoading, setIdentityLoading] = useState(true);

  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const tokenCacheRef = useRef(null);
  const tokenTimeRef = useRef(0);
  const lastSubscriptionFetchRef = useRef(0);
  const subscriptionInFlightRef = useRef(false);
  const redirectCheckFinishedRef = useRef(false);
  const hasResolvedBootRouteRef = useRef(false);

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
      const cooldownMs = 15000;

      if (!force && now < lastSubscriptionFetchRef.current) {
        return subscription;
      }

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
          lastSubscriptionFetchRef.current = Date.now() + 30000;
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

        const redirectPending =
          sessionStorage.getItem("googleAuthInProgress") === "1";

        unsub = onAuthStateChanged(auth, async (currentUser) => {
          if (!mounted) return;

          setAuthLoading(false);

          if (!currentUser) {
            setUser(null);
            setUserData(null);
            setProgressData(null);
            setSubscription(null);
            setSubscriptionLoading(false);
            setIdentityLoading(false);

            tokenCacheRef.current = null;
            tokenTimeRef.current = 0;
            hasResolvedBootRouteRef.current = false;

            if (!redirectPending || redirectCheckFinishedRef.current) {
              sessionStorage.removeItem("googleAuthInProgress");
            }

            return;
          }

          setUser(currentUser);
          setIdentityLoading(true);

          let userDoc = null;
          let subDoc = null;

          try {
            const docs = await refreshUserDocs(currentUser);
            userDoc = docs?.userDoc || null;

            subDoc = await refreshSubscription(currentUser);
          } finally {
            if (mounted) {
              sessionStorage.removeItem("googleAuthInProgress");
              setIdentityLoading(false);
            }
          }

          if (mounted && canShowPrompt) {
            setShowInstallBanner(true);
          }

          const intent = getAuthIntent();
          const currentPath = getCurrentAppPath();

          const shouldResolveRoute =
            !hasResolvedBootRouteRef.current &&
            (redirectPending ||
              !!intent?.redirectTo ||
              isRouteEligibleForAutoResolution(currentPath));

          if (!shouldResolveRoute) {
            hasResolvedBootRouteRef.current = true;
            return;
          }

          const result = resolvePostAuthRoute({
            user: currentUser,
            userData: userDoc,
            subscription: subDoc || subscription,
            intent,
          });

          if (!result?.path) {
            hasResolvedBootRouteRef.current = true;
            return;
          }

          if (isSameRoute(currentPath, result.path)) {
            hasResolvedBootRouteRef.current = true;
            return;
          }

          hasResolvedBootRouteRef.current = true;

          if (!isPendingIdentityPath(result.path)) {
            clearAuthIntent();
          }

          replaceAppRoute(result.path);
        });

        if (redirectPending) {
          try {
            const redirectResult = await resolveGoogleRedirectLogin();

            if (redirectResult?.needPasswordLink && mounted) {
              setIdentityLoading(false);
            }
          } catch (error) {
            console.error("❌ Error resolviendo redirect Google:", error);
          } finally {
            redirectCheckFinishedRef.current = true;
            sessionStorage.removeItem("googleAuthInProgress");

            if (mounted && !auth.currentUser) {
              setIdentityLoading(false);
            }
          }
        } else {
          redirectCheckFinishedRef.current = true;
        }
      } catch (error) {
        console.error("❌ Error inicializando auth:", error);
        sessionStorage.removeItem("googleAuthInProgress");

        if (mounted) {
          setAuthLoading(false);
          setIdentityLoading(false);
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
  }, [canShowPrompt, refreshSubscription, refreshUserDocs, subscription]);

  const logout = useCallback(async () => {
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);

    sessionStorage.removeItem("googleAuthInProgress");
    clearAuthIntent();

    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);
    setSubscriptionLoading(false);
    setAuthLoading(false);
    setIdentityLoading(false);

    tokenCacheRef.current = null;
    tokenTimeRef.current = 0;
    lastSubscriptionFetchRef.current = 0;
    subscriptionInFlightRef.current = false;
    redirectCheckFinishedRef.current = false;
    hasResolvedBootRouteRef.current = false;

    replaceAppRoute("/");
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

  const pendingGoogleLink = getPendingGoogleLinkInfo();
  const loading = authLoading || identityLoading;

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

      authLoading,
      identityLoading,
      loading,
      logout,

      refreshUserDocs: () => refreshUserDocs(user),
      refreshSubscription: (options) => refreshSubscription(user, options),

      markPhoneSaved,
      setIdentityConflict,

      pendingGoogleLink,

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
    authLoading,
    identityLoading,
    loading,
    logout,
    refreshUserDocs,
    refreshSubscription,
    markPhoneSaved,
    setIdentityConflict,
    pendingGoogleLink,
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