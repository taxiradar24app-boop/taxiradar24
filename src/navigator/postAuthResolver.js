export function resolvePostAuthRoute({
  user,
  userData,
  subscription,
  intent,
  currentPath = "/",
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

  if (intent?.redirectTo) {
    return {
      path: intent.redirectTo,
      reason: "INTENT_RESTORED",
    };
  }

  if (
    currentPath &&
    currentPath !== "/login" &&
    currentPath !== "/register" &&
    currentPath !== "/check-email" &&
    currentPath !== "/verify" &&
    currentPath !== "/identity-merge"
  ) {
    return {
      path: currentPath,
      reason: "CURRENT_CONTEXT_RESTORED",
    };
  }

  return {
    path: "/",
    reason: "HOME_DEFAULT",
  };
}

export default resolvePostAuthRoute;