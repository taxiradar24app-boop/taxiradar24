// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'usersorg', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            // 🔁 Combinamos datos de Firebase Auth + Firestore
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              ...userSnap.data(),
            });
          } else {
            // 🔁 Solo los datos del auth si no hay Firestore
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            });
          }
        } catch (error) {
          console.error('❌ Error obteniendo Firestore:', error.message);
          setUser(firebaseUser); // fallback
        }
      } else {
        setUser(null);
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, checking };
}
