// ================================================
// 🚖 TOOLS BOTTOM NAV — TaxiRadar24 (Platzi Style)
// Menú profesional para taxistas. Móvil 100%.
// ================================================

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: rgba(10, 20, 40, 0.65);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;

  @media (min-width: 880px) {
    display: none; /* Solo móvil */
  }
`;

const NavItem = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 0.4rem 0;

  color: ${({ active }) => (active ? "#a3e635" : "#d1d5db")};
  transition: 0.25s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;

  &:active {
    transform: scale(0.95);
  }
`;

const Icon = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.15rem;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

export default function ToolsBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const NAV_ITEMS = [
    { label: "Radar", icon: "🛬", path: "/aerodataradar" },
    { label: "AdBox", icon: "📋", path: "/tableadbox" },
    { label: "Puerto", icon: "⚓", path: "/tools/puerto" }, // futuro
    { label: "Tren", icon: "🚆", path: "/tools/tren" }, // futuro
  ];

  return (
    <NavWrapper>
      {NAV_ITEMS.map((item) => {
        const active = location.pathname.startsWith(item.path);
        return (
          <NavItem
            key={item.path}
            active={active}
            onClick={() => navigate(item.path)}
          >
            <Icon active={active}>{item.icon}</Icon>
            {item.label}
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}
