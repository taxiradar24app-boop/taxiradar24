// src/navigator/postAuthResolver.js

export function resolvePostAuthRoute({
  user,
  userData,
  subscription,
  intent,
}) {
  if (!user) {
    return {
      path: "/login",
      reason: "NOT_AUTHENTICATED",
    };
  }

  const emailVerified = !!user.emailVerified;
  const phoneVerified = !!userData?.phoneVerified;
  const hasIdentityConflict = !!userData?.needsMerge;
  const isPro = subscription?.active === true;

  const isDriver =
    userData?.isDriver ||
    userData?.role === "driver" ||
    (Array.isArray(userData?.roles) &&
      userData.roles.includes("driver"));

  // 🔥 PRIORIDAD ABSOLUTA

  if (hasIdentityConflict) {
    return {
      path: "/identity-merge",
      reason: "IDENTITY_CONFLICT",
    };
  }

  if (!emailVerified) {
    return {
      path: "/check-email",
      reason: "EMAIL_REQUIRED",
    };
  }

  if (!phoneVerified) {
    return {
      path: "/verify",
      reason: "PHONE_REQUIRED",
    };
  }

  // 🔥 INTENCIÓN DEL USUARIO (CLAVE)

  if (intent?.redirectTo) {
    return {
      path: intent.redirectTo,
      reason: "INTENT_RESTORED",
    };
  }

  // 🔥 ROLES

  if (isDriver) {
    return {
      path: "/herramientas",
      reason: "DRIVER_DEFAULT",
    };
  }

  if (isPro) {
    return {
      path: "/academia/pro",
      reason: "PRO_DEFAULT",
    };
  }

  // 🔥 FALLBACK

  return {
    path: "/academia/demo",
    reason: "DEMO_DEFAULT",
  };
}