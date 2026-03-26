import React, { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Navigator = lazy(() => import("./navigator/navigator"));
const PhoneVerification = lazy(() => import("./hooks/usePhoneVerification"));
const IdentityMergeScreen = lazy(() =>
  import("./Screens/IdentityMergeScreen")
);

function PrivateContent() {
  const { user, phoneVerified, hasIdentityConflict } = useAuth();

  if (user && hasIdentityConflict) {
    return <IdentityMergeScreen />;
  }

  if (user && !phoneVerified) {
    return <PhoneVerification />;
  }

  return <Navigator />;
}

export default function PrivateApp() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Cargando app…</div>}>
        <PrivateContent />
      </Suspense>
    </AuthProvider>
  );
}