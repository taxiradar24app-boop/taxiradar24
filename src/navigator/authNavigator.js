import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './../Screens/LoginScreen';
import PhoneVerificationScreen from './../Screens/PhoneVerificationScreen';

export default function AuthNavigator() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/verify" element={<PhoneVerificationScreen />} />
    </Routes>
  );
}
