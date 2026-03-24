// ====================================================================
// 🚀 SMART NAVIGATION — TaxiRadar24
// Restaurado para respetar la lógica real de la web
// - Academia pública entra por /academia/demo
// - Tools pública entra por /herramientas
// - PRO sigue entrando por /academia/pro
// - No inventa rutas ni pantallas nuevas
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
  } = useAuth();

  const isLogged = !!user;

  const isDemo =
    userData?.subscription === "DEMO" || userData?.subscription === "FREE";

  const isDriver =
    userData?.isDriver ||
    userData?.role === "driver" ||
    (Array.isArray(userData?.roles) && userData.roles.includes("driver"));

  const guardIdentity = (redirectTo = "/") => {
    if (hasIdentityConflict) {
      navigate("/identity-merge", { state: { redirectTo } });
      return true;
    }
    return false;
  };

  // =====================================================
  // 🎓 ACADEMY
  // =====================================================
  const goAcademy = () => {
    if (guardIdentity("/academia/demo")) return;

    if (!isLogged) return navigate("/academia/demo");
    if (isPro) return navigate("/academia/pro");
    if (isDemo) return navigate("/academia/demo");

    return navigate("/academia/demo");
  };

  const goAcademyPro = () => {
    if (guardIdentity("/academia/pro")) return;

    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/academia/pro" },
      });
    }

    if (isPro) return navigate("/academia/pro");
    return navigate("/academia/upgrade");
  };

  const goUpgrade = () => {
    if (guardIdentity("/academia/upgrade")) return;

    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/academia/upgrade" },
      });
    }

    return navigate("/academia/upgrade");
  };

  const goDemo = () => {
    if (guardIdentity("/academia/demo")) return;
    return navigate("/academia/demo");
  };

  // =====================================================
  // 🛠️ TOOLS
  // =====================================================
  const goTools = () => {
    if (guardIdentity("/herramientas")) return;

    if (!isLogged) {
      return navigate("/herramientas");
    }

    return navigate("/herramientas");
  };

  const goFlights = () => {
    if (guardIdentity("/tools/flights")) return;

    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/tools/flights" },
      });
    }

    return navigate("/tools/flights");
  };

  const goCruises = () => {
    if (guardIdentity("/tools/cruises")) return;

    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/tools/cruises" },
      });
    }

    return navigate("/tools/cruises");
  };

  const goTariffs = () => {
    if (guardIdentity("/tools/tariffs")) return;

    if (!isLogged) {
      return navigate("/login", {
        state: { redirectTo: "/tools/tariffs" },
      });
    }

    return navigate("/tools/tariffs");
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

    if (isPro) return "/academia/pro";
    if (isDriver) return "/herramientas";

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
  };
}

export default useSmartNavigation;