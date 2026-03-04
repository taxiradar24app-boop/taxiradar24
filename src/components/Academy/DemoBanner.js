import React from "react";
import { useNavigate } from "react-router-dom";
import { BannerWrapper, BannerCTA } from "./DemoBannerStyle";

export default function DemoBanner({ message = "Estás en la versión DEMO" }) {
  const navigate = useNavigate();

  return (
    <BannerWrapper>
      <strong>{message}</strong>
      <BannerCTA onClick={() => navigate("/academia")}>
        Desbloquear versión completa
      </BannerCTA>
    </BannerWrapper>
  );
}
