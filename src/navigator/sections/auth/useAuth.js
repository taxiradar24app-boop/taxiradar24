// src/auth/useAuth.js
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * Hook unificado de autenticación
 * Usado por:
 * - HeaderAcademia
 * - RequirePlan
 * - futuros guards
 */
export function useAuth() {
  return useContext(AuthContext);
}
