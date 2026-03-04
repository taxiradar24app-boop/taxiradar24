// src/hooks/usePWAInstallPrompt.js
import { useEffect, useState } from "react";

export default function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canShowPrompt, setCanShowPrompt] = useState(false);

  useEffect(() => {
    const skip = localStorage.getItem("skipPWAInstall");
    if (skip) return; // el usuario ya rechazó antes

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setCanShowPrompt(false);
    return outcome === "accepted";
  };

  return { canShowPrompt, promptInstall, setCanShowPrompt };
}
