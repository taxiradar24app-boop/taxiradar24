import React from "react";
import styled from "styled-components";

const LegendWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(10, 21, 40, 0.9);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 1000;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #e5e7eb;
`;

const Icon = styled.span`
  font-size: 1.1rem;
`;

const MapLegend = () => {
  return (
    <LegendWrapper>
      <LegendItem>
        <Icon>🛣️</Icon> Vías principales
      </LegendItem>
      <LegendItem>
        <Icon>🏛️</Icon> Centros oficiales
      </LegendItem>
      <LegendItem>
        <Icon>🎭</Icon> Centros culturales
      </LegendItem>
      <LegendItem>
        <Icon>🏥</Icon> Centros de salud
      </LegendItem>
      <LegendItem>
        <Icon>🎓</Icon> Centros educativos
      </LegendItem>
      <LegendItem>
        <Icon>🏨</Icon> Hoteles
      </LegendItem>
      <LegendItem>
        <Icon>🏟️</Icon> Centros deportivos
      </LegendItem>
      <LegendItem>
        <Icon>🍽️</Icon> Hostelería
      </LegendItem>
      <LegendItem>
        <Icon>🗿</Icon> Monumentos
      </LegendItem>
    </LegendWrapper>
  );
};

export default MapLegend;
