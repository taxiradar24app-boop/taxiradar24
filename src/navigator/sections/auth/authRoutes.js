import React, { lazy } from "react";

const LoginScreen = lazy(() => import("@/Screens/LoginScreen"));
const RegisterScreen = lazy(() => import("@/Screens/RegisterScreen"));
const ResetPasswordScreen = lazy(() => import("@/Screens/ResetPasswordScreen"));

export const authRoutes = [
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/reset-password", element: <ResetPasswordScreen /> },
];
