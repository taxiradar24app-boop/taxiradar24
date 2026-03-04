import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InstallButton = styled.button`
  background-color: #f4d35e;
  color: #000;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6c84f;
    transform: scale(1.02);
  }
`;

export default function ButtonInstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log("✅ Resultado instalación:", outcome);

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return <InstallButton onClick={handleInstallClick}>📲 Instalar TaxiRadar24</InstallButton>;
}
