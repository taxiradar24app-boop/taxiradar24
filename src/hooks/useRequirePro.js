import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { docLazy, getDocLazy } from "@/services/firestoreService";
import { getDb } from "./../services/firebaseConfig";

export function useRequirePro() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      if (loading) return;

      if (!user) {
        navigate("/login");
        return;
      }

      const db = await getDb();

      const ref = await docLazy(db, "users", uid);
      const snap = await getDocLazy(ref);

      const plan = (snap.data()?.subscription || "").trim().toUpperCase();

      if (!snap.exists() || plan !== "PRO") {
        navigate("/academia/upgrade");
      }
    }

    check();
  }, [user, loading, navigate]);
}