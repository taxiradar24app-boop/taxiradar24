// ====================================================================
// 🚀 SMART NAVIGATION — TaxiRadar24
// Retoma onboarding incompleto sin romper la lógica real
// - Academia pública entra por /academia/demo
// - Tools requiere login y entra por /herramientas
// - PRO sigue entrando por /academia/pro
// - Si falta identificación, reenvía al paso pendiente
// ====================================================================

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useSmartNavigation() {
  const navigate = useNavigate();

  const {
    user,
    userData,
    isPro,
    hasIdentityConflict,
    emailVerified,
    phoneVerified,
  } = useAuth();

  const isLogged = !!user;

  const isDemo =
    userData?.subscription === "DEMO" || userData?.subscription === "FREE";

  const isDriver =
    userData?.isDriver ||
    userData?.role === "driver" ||
    (Array.isArray(userData?.roles) && userData.roles.includes("driver"));

  const getPendingIdentityRoute = (redirectTo = "/") => {
    if (!isLogged) return null;
    if (!emailVerified) return { path: "/check-email", state: { redirectTo } };
    if (!phoneVerified) return { path: "/verify", state: { redirectTo } };
    return null;
  };

  const guardIdentity = (redirectTo = "/") => {
    if (hasIdentityConflict) {
      navigate("/identity-merge", { state: { redirectTo } });
      return true;
    }

    const pending = getPendingIdentityRoute(redirectTo);
    if (pending) {
      navigate(pending.path, { state: pending.state });
      return true;
    }

    return false;
  };

  // =====================================================
  // 🎓 ACADEMY
  // =====================================================
  const goAcademy = () => {
    if (hasIdentityConflict) {
      navigate("/identity-merge", { state: { redirectTo: "/academia/demo" } });
      return;
    }

    if (!isLogged) return navigate("/academia/demo");
    if (isPro) return navigate("/academia/pro");
    if (isDemo) return navigate("/academia/demo");

    return navigate("/academia/demo");
  };

  const goAcademyPro = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/academia/pro" },
      });
    }

    if (guardIdentity("/academia/pro")) return;

    if (isPro) return navigate("/academia/pro");
    return navigate("/academia/upgrade");
  };

  const goUpgrade = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/academia/upgrade" },
      });
    }

    if (guardIdentity("/academia/upgrade")) return;

    return navigate("/academia/upgrade");
  };

  const goDemo = () => {
    if (hasIdentityConflict) {
      navigate("/identity-merge", { state: { redirectTo: "/academia/demo" } });
      return;
    }

    return navigate("/academia/demo");
  };

  // =====================================================
  // 🛠️ TOOLS
  // =====================================================
  const goTools = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/herramientas" },
      });
    }

    if (guardIdentity("/herramientas")) return;

    return navigate("/herramientas");
  };

  const goFlights = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/herramientas/flights" },
      });
    }

    if (guardIdentity("/herramientas/flights")) return;

    return navigate("/herramientas/flights");
  };

  const goCruises = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/herramientas/cruises" },
      });
    }

    if (guardIdentity("/herramientas/cruises")) return;

    return navigate("/herramientas/cruises");
  };

  const goTariffs = () => {
    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/herramientas/tariffs" },
      });
    }

    if (guardIdentity("/herramientas/tariffs")) return;

    return navigate("/herramientas/tariffs");
  };

  // =====================================================
  // 🔐 AUTH
  // =====================================================
  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/register");
  const goHome = () => navigate("/");

  // =====================================================
  // 🧰 DEFAULT ENTRY POINT
  // =====================================================
  const getDefaultEntryPoint = () => {
    if (!isLogged) return "/";
    if (hasIdentityConflict) return "/identity-merge";
    if (!emailVerified) return "/check-email";
    if (!phoneVerified) return "/verify";

    if (isDriver) return "/herramientas";
    if (isPro) return "/academia/pro";

    return "/academia/demo";
  };

  return {
    goHome,
    goLogin,
    goRegister,

    goAcademy,
    goAcademyPro,
    goUpgrade,
    goDemo,

    goTools,
    goFlights,
    goCruises,
    goTariffs,

    getDefaultEntryPoint,
    getPendingIdentityRoute,
  };
}

export default useSmartNavigation;