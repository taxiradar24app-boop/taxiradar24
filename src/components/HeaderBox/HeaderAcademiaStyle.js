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
  gap: 16px;

  @media (max-width: 780px) {
    padding: 0 18px;
  }
`;

export const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  cursor: pointer;
  color: #10a37f;
  white-space: nowrap;

  @media (max-width: 780px) {
    font-size: 1.12rem;
  }
`;

/* ================= NAV ================= */

export const Nav = styled.nav`
  display: flex;
  gap: 26px;
  align-items: center;

  @media (max-width: 980px) {
    gap: 18px;
  }

  @media (max-width: 780px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.35;
  color: ${({ active }) =>
    active ? "#58e63d" : "rgba(255,255,255,0.85)"};
  padding-bottom: 4px;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#58e63d" : "transparent")};

  &:hover {
    color: #58e63d;
  }

  @media (max-width: 780px) {
    width: 100%;
    border-bottom: none;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.35;
    text-align: left;
  }
`;

/* ================= RIGHT ZONES ================= */

export const HeaderRightDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;

  @media (max-width: 780px) {
    display: none;
  }
`;

export const HeaderRightMobile = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
`;

/* ================= CTA ================= */

export const CTAButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  background: linear-gradient(135deg, #58e63d, #10a37f);
  color: #0a1528;
  font-weight: 800;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 3px 4px 0 #020814;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 2px 3px 0 #020814;
  }
`;

/* ================= MOBILE ================= */

export const MobileButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border: none;
  outline: none;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  color: #ffffff;
  font-size: 1.85rem;
  line-height: 1;
  user-select: none;
  transition: background 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 780px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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
  width: min(85vw, 340px);
  height: 100vh;
  background: #0f1d36;
  padding-top: 80px;
  z-index: 99999;
  overflow-y: auto;
  transform: translateX(${({ open }) => (open ? "0%" : "100%")});
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 36px 32px;
`;

export const DrawerClose = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.9rem;
  line-height: 1;
  cursor: pointer;
  color: #ffffff;
  user-select: none;
`;

export const DrawerDivider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  margin: 2px 0 0;
  background: rgba(255, 255, 255, 0.12);
`;

export const DemoInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  padding: 6px 8px 2px;
`;

export const DemoInfoTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
`;

export const DemoInfoText = styled.div`
  font-size: 0.84rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.74);
`;