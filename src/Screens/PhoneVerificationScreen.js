import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, LogoImage } from './../Styles/homeStyles';
import { AnimatedTitle } from './../Styles/PhoneVerificationStyle';
import { GoogleButton, ButtonText } from './../Styles/Buttons';
import logo from './../../assets/Moneda_digital_TaxiTip1.png';

export default function PhoneVerificationScreen() {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      const userRef = doc(db, 'usersorg', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error('Documento no encontrado');

      await updateDoc(userRef, { phoneNumber });
      await auth.currentUser.reload();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('❌ Error guardando el número:', error.message);
    }
  };

  return (
    <Container>
      <LogoImage src={logo} alt="TaxiTip Logo" />
      <AnimatedTitle opacity={opacity}>
        Verifica tu número de teléfono
      </AnimatedTitle>

      <input
        type="tel"
        placeholder="Tu número de teléfono"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{
          padding: 12,
          fontSize: 16,
          borderRadius: 6,
          border: '1px solid #ccc',
          marginTop: 20,
          width: '80%',
          maxWidth: 300,
        }}
      />

      <GoogleButton onClick={handleVerify}>
        <ButtonText>Confirmar número</ButtonText>
      </GoogleButton>
    </Container>
  );
}
