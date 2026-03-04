// src/components/ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../services/firebaseConfig";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    let timeout = null;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // ✅ Si es null (logout), esperamos un poco antes de redirigir
      if (!firebaseUser) {
        timeout = setTimeout(() => {
          if (!cancelled) setUser(null);
        }, 200);
      } else {
        if (!cancelled) setUser(firebaseUser);
      }
    });

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  // Mientras Firebase verifica sesión
  if (user === undefined) {
    return (
      <div style={{ color: "#fff", textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  // Si no hay usuario logeado, redirige al login
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra el contenido protegido
  return children;
}