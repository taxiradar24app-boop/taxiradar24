import { useAuth } from "@/context/AuthContext";

export default function useAccessControl(requiresPro = false) {
  const { user, userData } = useAuth();

  // ================================
  // 🔥 MODO DESARROLLO (tú ves todo)
  // ================================
  const isDeveloperMode = false; // cámbialo a true si quieres ver todo
  if (isDeveloperMode) {
    return {
      isPro: true,
      canAccess: () => true,
      userData: { subscription: "PRO" },
    };
  }

  // ================================
  // PRODUCCIÓN REAL
  // ================================
  const subscription = userData?.subscription;
  const isPro = subscription === "PRO";

  // --------------------------------
  // 1) Control de rutas protegidas
  // --------------------------------
  if (requiresPro && !isPro) {
    window.location.href = "/academia/upgrade";
    return {};
  }

  // --------------------------------
  // 2) Control individual de artículos
  // --------------------------------
  // Si un artículo NO es PRO → FREE
  // Si es PRO → depende del plan del usuario
  function canAccess(isFreeArticle) {
    if (isPro) return true;       // Usuario PRO → ve todo
    if (isFreeArticle) return true; // FREE → solo artículos gratis
    return false;                 // FREE → bloqueado
  }

  return {
    isPro,
    canAccess,
    userData,
  };
}
