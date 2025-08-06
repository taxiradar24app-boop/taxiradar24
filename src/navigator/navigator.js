import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToolScreen from './../Screens/toolScreen';
import FlightRadar from './../Screens/FlightRadar';
import PhoneVerificationScreen from './../Screens/PhoneVerificationScreen';

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<ToolScreen />} />
      <Route path="/radar" element={<FlightRadar />} />
      <Route path="/verify" element={<PhoneVerificationScreen />} />
    </Routes>
  );
}
