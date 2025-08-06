import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8kp0BNQKZHSvIPH1dGR9aqAByE8yznts',
  authDomain: 'curso-react-firebase-app-ed68a.firebaseapp.com',
  projectId: 'curso-react-firebase-app-ed68a',
  storageBucket: 'curso-react-firebase-app-ed68a.appspot.com',
  messagingSenderId: '598545908317',
  appId: '1:598545908317:web:cb28920a80e279f7fd83b4',
  measurementId: 'G-DSSWWGR4EE',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, firebaseConfig };
