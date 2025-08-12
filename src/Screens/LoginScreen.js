import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './../services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Container, LogoImage, Title } from './../Styles/homeStyles';
import { GoogleButton } from './../Styles/Buttons';
import styled from 'styled-components';
import logo from './../../assets/Moneda_digital_TaxiTip1.png';

const AnimatedTitle = styled(Title)`
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s ease-in-out;
`;

export default function LoginScreen() {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'usersorg', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
        });
        navigate('/verify');
        return;
      }

      const userData = userSnap.data();
      if (userData.phoneNumber) {
        navigate('/');
      } else {
        navigate('/verify');
      }
    } catch (error) {
      console.error('❌ Error en autenticación:', error.message);
    }
  };

  return (
    <Container>
      <LogoImage src={logo} alt="TaxiTip Logo" />
      <AnimatedTitle opacity={opacity}>
        Sign in to <span style={{ fontWeight: 'bold', color: '#f4d35e' }}>TaxiTip</span>
      </AnimatedTitle>

      <GoogleButton onClick={handleGoogleLogin}>
        Continuar con Google
      </GoogleButton>
    </Container>
  );
}
