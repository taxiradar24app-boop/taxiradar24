import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { getDb } from "./../services/firebaseConfig";

const db = getDb();

export function useRequirePro() {
  const { user, loading } = useAuth(); // 👈 importante
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      if (loading) return; // 👈 espera a Auth

      if (!user) {
        navigate("/login");
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      const plan = (snap.data()?.subscription || "").trim().toUpperCase();

      if (!snap.exists() || plan !== "PRO") {
        navigate("/academia/upgrade");
      }
    }

    check();
  }, [user, loading, navigate]);
}