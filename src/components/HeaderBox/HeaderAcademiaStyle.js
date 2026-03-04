// src/components/HeaderBox/HeaderAcademiaStyle.js

import styled from "styled-components";

/* ================= HEADER ================= */

export const HeaderWrapper = styled.header`
  width: 100%;
  background: rgba(10, 21, 40, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 5000;
  backdrop-filter: blur(12px);
`;

export const HeaderInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  cursor: pointer;
  color: #10a37f;
`;

/* ================= NAV ================= */

export const Nav = styled.nav`
  display: flex;
  gap: 26px;

  @media (max-width: 780px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  color: ${({ active }) =>
    active ? "#58e63d" : "rgba(255,255,255,0.85)"};

  padding-bottom: 4px;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#58e63d" : "transparent")};

  &:hover {
    color: #58e63d;
  }
`;

/* ================= USER ================= */

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 780px) {
    display: none;
  }
`;

export const AvatarButton = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 8px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  color: #ffffff;
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 64px;
  right: 32px;
  background: #0f1d36;
  border-radius: 12px;
  width: 180px;
`;

export const UserMenuItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

/* ================= CTA ================= */

export const CTAButton = styled.button`
  background: linear-gradient(135deg, #58e63d, #10a37f);
  color: #0a1528;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

/* ================= MOBILE ================= */

export const MobileButton = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #ffffff;

  @media (max-width: 780px) {
    display: block;
  }
`;

/* ✅ Overlay para cerrar tocando fuera + bloquear “sensación” de fondo */
export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 99998;

  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 220ms ease;
`;

export const MobileDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: min(85vw, 320px);
  height: 100vh;
  background: #0f1d36;
  padding-top: 80px;
  z-index: 99999;

  transform: translateX(${({ open }) => (open ? "0%" : "100%")});
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
`;

export const DrawerClose = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.6rem;
  cursor: pointer;
  color: #ffffff;
`;