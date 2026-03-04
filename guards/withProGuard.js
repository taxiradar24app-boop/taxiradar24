import React from "react";
import { Navigate } from "react-router-dom";
import { getDb, getAuth } from "@/services/firebaseConfig";

export default function withProGuard(Component) {
  return function ProtectedRoute(props) {
    const [allowed, setAllowed] = React.useState(null);

    React.useEffect(() => {
      let cancelled = false;
      let t = null;

      async function checkPlan() {
        const auth = await getAuth();
        const user = auth.currentUser;

        // ✅ Anti-flicker: si user es null (logout/transición), esperamos un poco
        // Si el componente se desmonta por navegación, no llegamos a redirigir a /login
        if (!user) {
          t = setTimeout(() => {
            if (!cancelled) setAllowed(false);
          }, 200);
          return;
        }

        if (process.env.REACT_APP_DEV_BYPASS_ALL === "true") {
          console.warn("⚠️ DEV MODE: Acceso PRO sin plan");
          if (!cancelled) setAllowed(true);
          return;
        }

        const db = await getDb();
        const { doc, getDoc } = await import("firebase/firestore");

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        const hasPro =
          snap.exists() &&
          snap.data().plan &&
          snap.data().plan.toLowerCase() === "pro";

        if (!cancelled) setAllowed(hasPro);
      }

      checkPlan();

      return () => {
        cancelled = true;
        if (t) clearTimeout(t);
      };
    }, []);

    if (allowed === null) {
      return (
        <p style={{ textAlign: "center", marginTop: 50 }}>
          Verificando acceso…
        </p>
      );
    }

    if (!allowed) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}