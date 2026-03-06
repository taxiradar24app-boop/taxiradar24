// ====================================================================
// 🚀 SMART NAVIGATION — TaxiRadar24 ENTERPRISE (D1 + Identity Guard)
// (respeta tu lógica + PRO real desde D1 + bloqueo por duplicado)
// ====================================================================

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useSmartNavigation() {
  const navigate = useNavigate();

  const {
    user,
    userData,

    // ✅ Source of truth (D1)
    isPro,

    // ✅ Identity guard
    hasIdentityConflict,
  } = useAuth();

  // ROLES
  const isLogged = !!user;

  const isDemo =
    userData?.subscription === "DEMO" || userData?.subscription === "FREE";

  const isDriver =
    userData?.isDriver ||
    userData?.role === "driver" ||
    (Array.isArray(userData?.roles) && userData.roles.includes("driver"));

  const isHybrid = isPro && isDriver;

  // =====================================================
  // 🧨 BLOQUEO INMEDIATO (Enterprise)
  // =====================================================
  const guardIdentity = (redirectTo = "/") => {
    if (hasIdentityConflict) {
      return navigate("/identity-merge", { state: { redirectTo } });
    }
    return null;
  };

  // =====================================================
  // 🎓 ACADEMY
  // =====================================================
  const goAcademy = () => {
    const blocked = guardIdentity("/academia");
    if (blocked) return;

    if (!isLogged) return navigate("/academia");
    if (isPro) return navigate("/academia/pro");
    if (isDemo) return navigate("/academia/demo");
    return navigate("/academia");
  };

  const goAcademyPro = () => {
    const blocked = guardIdentity("/academia/pro");
    if (blocked) return;

    if (!isLogged) {
      return navigate("/login", { state: { redirectTo: "/academia/pro" } });
    }
    if (isPro) return navigate("/academia/pro");
    return navigate("/academia/upgrade");
  };

  const goUpgrade = () => {
    const blocked = guardIdentity("/academia/upgrade");
    if (blocked) return;

    if (!isLogged) {
      return navigate("/login", { state: { redirectTo: "/academia/upgrade" } });
    }
    return navigate("/academia/upgrade");
  };

  const goDemo = () => {
    const blocked = guardIdentity("/academia/demo");
    if (blocked) return;

    return navigate("/academia/demo");
  };

  // =====================================================
  // 🛠️ TOOLS
  // =====================================================
  const goTools = () => {
    const blocked = guardIdentity("/tools");
    if (blocked) return;

    if (!isLogged)
      return navigate("/login", { state: { redirectTo: "/tools" } });
    return navigate("/herramientas");
  };

  const goFlights = () => {
    const blocked = guardIdentity("/tools/flights");
    if (blocked) return;

    if (!isLogged) {
      return navigate("/login", { state: { redirectTo: "/tools/flights" } });
    }
    return navigate("/tools/flights");
  };

  const goCruises = () => {
    const blocked = guardIdentity("/tools/cruises");
    if (blocked) return;

    if (!isLogged) {
      return navigate("/login", { state: { redirectTo: "/tools/cruises" } });
    }
    return navigate("/tools/cruises");
  };

  const goTariffs = () => {
    const blocked = guardIdentity("/tools/tariffs");
    if (blocked) return;

    if (!isLogged) {
      return navigate("/login", { state: { redirectTo: "/tools/tariffs" } });
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
  // 🧰 DEFAULT ROUTE (Header / Drawer)
  // =====================================================
  // ✅ Limpieza: mantenemos la lógica enterprise (identity + roles),
  // pero evitamos caer en /workspace (legacy) que te está devolviendo a "/".
  // Esto NO rompe: goAcademy/goAcademyPro/goTools siguen igual.
  const getDefaultEntryPoint = () => {
    if (!isLogged) return "/";
    if (hasIdentityConflict) return "/identity-merge";

    // PRIORIDAD: si tiene PRO real (D1) -> Academia PRO
    if (isPro) return "/academia/pro";

    // Si es taxista sin PRO academia -> Tools
    if (isDriver) return "/tools";

    // Usuario normal -> Academia (landing)
    return "/academia/demo";
  };

  return {
    // HOME / AUTH
    goHome,
    goLogin,
    goRegister,

    // ACADEMY
    goAcademy,
    goAcademyPro,
    goUpgrade,
    goDemo,

    // TOOLS
    goTools,
    goFlights,
    goCruises,
    goTariffs,

    // UTIL
    getDefaultEntryPoint,
  };
}