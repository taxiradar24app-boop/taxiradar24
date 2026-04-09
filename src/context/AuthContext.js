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
      window.location.origin + window.location.pathname.replace(/\/$/, "");

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
  const currentUidRef = useRef(null);
  const subscriptionRef = useRef(null);
  const authNavigationResolvedRef = useRef(false);

  const { canShowPrompt, promptInstall, setCanShowPrompt } =
    usePWAInstallPrompt();

  useEffect(() => {
    subscriptionRef.current = subscription;
  }, [subscription]);

  const resetRuntimeRefs = useCallback(() => {
    tokenCacheRef.current = null;
    tokenTimeRef.current = 0;
    lastSubscriptionFetchRef.current = 0;
    subscriptionInFlightRef.current = false;
    hasResolvedBootRouteRef.current = false;
    currentUidRef.current = null;
    authNavigationResolvedRef.current = false;
  }, []);

  const clearSessionState = useCallback(() => {
    setUser(null);
    setUserData(null);
    setProgressData(null);
    setSubscription(null);
    setSubscriptionLoading(false);
    setAuthLoading(false);
    setIdentityLoading(false);

    resetRuntimeRefs();
  }, [resetRuntimeRefs]);

  const refreshUserProfileDoc = useCallback(async (currentUser) => {
    if (!currentUser?.uid) {
      setUserData(null);
      return null;
    }

    const db = await getDb();
    const userRef = await docLazy(db, "users", currentUser.uid);
    const userSnap = await getDocLazy(userRef);

    const userDoc = userSnap.exists() ? userSnap.data() : null;
    setUserData(userDoc);

    return userDoc;
  }, []);

  const refreshProgressData = useCallback(async (currentUser) => {
    if (!currentUser?.uid) {
      setProgressData(null);
      return null;
    }

    const db = await getDb();
    const progressRef = await docLazy(db, "progress", currentUser.uid);
    const progressSnap = await getDocLazy(progressRef);

    const progressDoc = progressSnap.exists() ? progressSnap.data() : null;
    setProgressData(progressDoc);

    return progressDoc;
  }, []);

  const refreshSubscription = useCallback(async (userParam, options = {}) => {
    const currentUser = userParam || null;
    const force = options.force === true;

    if (!currentUser) {
      setSubscription(null);
      setSubscriptionLoading(false);
      return null;
    }

    if (subscriptionInFlightRef.current && !force) {
      return subscriptionRef.current;
    }

    const now = Date.now();
    const cooldownMs = 15000;

    if (!force && now < lastSubscriptionFetchRef.current) {
      return subscriptionRef.current;
    }

    if (!force && now - lastSubscriptionFetchRef.current < cooldownMs) {
      return subscriptionRef.current;
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
        subscriptionRef.current || {
          status: "none",
          active: false,
          plan: null,
        };

      setSubscription((prev) => prev || fallback);
      return fallback;
    } finally {
      subscriptionInFlightRef.current = false;
      setSubscriptionLoading(false);
    }
  }, []);

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
    if (canShowPrompt && user) {
      setShowInstallBanner(true);
    }
  }, [canShowPrompt, user]);

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
            const redirectAlreadyChecked = redirectCheckFinishedRef.current;

            clearSessionState();

            if (!redirectPending || redirectAlreadyChecked) {
              sessionStorage.removeItem("googleAuthInProgress");
            }

            const postLogoutPath = sessionStorage.getItem("postLogoutPath");

            if (postLogoutPath) {
              sessionStorage.removeItem("postLogoutPath");

              if (postLogoutPath.startsWith("/academia/pro")) {
                replaceAppRoute("/academia/demo");
                return;
              }

              if (postLogoutPath.startsWith("/perfil")) {
                replaceAppRoute("/");
                return;
              }

              if (postLogoutPath.startsWith("/herramientas")) {
                replaceAppRoute("/herramientas");
                return;
              }

              replaceAppRoute(postLogoutPath);
              return;
            }

            return;
          }

          const isNewSession = currentUidRef.current !== currentUser.uid;
          currentUidRef.current = currentUser.uid;

          setUser(currentUser);
          setIdentityLoading(true);

          let userDoc = null;
          let subDoc = null;

          try {
            [userDoc, subDoc] = await Promise.all([
              refreshUserProfileDoc(currentUser),
              refreshSubscription(currentUser),
            ]);
          } finally {
            if (mounted) {
              sessionStorage.removeItem("googleAuthInProgress");
              setIdentityLoading(false);
            }
          }

          if (!mounted) return;

          refreshProgressData(currentUser).catch((error) => {
            console.warn("⚠️ No se pudo cargar progress:", error?.message);
          });

          const intent = getAuthIntent();
          const currentPath = getCurrentAppPath();

          const shouldResolveRoute =
            !hasResolvedBootRouteRef.current &&
            (isNewSession ||
              redirectPending ||
              !!intent?.redirectTo ||
              isRouteEligibleForAutoResolution(currentPath));

          if (!shouldResolveRoute) {
            hasResolvedBootRouteRef.current = true;
            authNavigationResolvedRef.current = true;
            return;
          }

          const result = resolvePostAuthRoute({
            user: currentUser,
            userData: userDoc,
            subscription: subDoc || subscriptionRef.current,
            intent,
            currentPath,
          });

          if (!result?.path) {
            hasResolvedBootRouteRef.current = true;
            authNavigationResolvedRef.current = true;
            return;
          }

          if (isSameRoute(currentPath, result.path)) {
            hasResolvedBootRouteRef.current = true;
            authNavigationResolvedRef.current = true;
            return;
          }

          hasResolvedBootRouteRef.current = true;
          authNavigationResolvedRef.current = true;

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
  }, [
    clearSessionState,
    refreshProgressData,
    refreshSubscription,
    refreshUserProfileDoc,
  ]);

  const logout = useCallback(async () => {
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    const currentPath = getCurrentAppPath();
    sessionStorage.setItem("postLogoutPath", currentPath);

    await signOut(auth);

    sessionStorage.removeItem("googleAuthInProgress");
    clearAuthIntent();

    redirectCheckFinishedRef.current = false;
    clearSessionState();
  }, [clearSessionState]);

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

      refreshUserDocs: () => refreshUserProfileDoc(user),
      refreshProgressData: () => refreshProgressData(user),
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
      authNavigationResolved: authNavigationResolvedRef.current,

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
    refreshUserProfileDoc,
    refreshProgressData,
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