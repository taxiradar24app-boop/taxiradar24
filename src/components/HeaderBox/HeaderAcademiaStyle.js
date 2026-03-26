import styled from "styled-components";

/* ================= HEADER ================= */

export const HeaderWrapper = styled.header`
  width: 100%;
  background: rgba(10, 21, 40, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 5000;
  backdrop-filter: blur(12px);

  padding-top: ${({ $withSafeTop }) =>
    $withSafeTop ? "env(safe-area-inset-top, 0px)" : "0px"};
`;

export const HeaderInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 24px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 780px) {
    padding: 8px 18px;
    min-height: 56px;
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
  flex: 1;
  justify-content: center;

  @media (max-width: 1100px) {
    gap: 18px;
  }

  @media (max-width: 900px) {
    gap: 14px;
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
  white-space: nowrap;

  color: ${({ active, danger }) => {
    if (danger) return "#fca5a5";
    return active ? "#58e63d" : "rgba(255,255,255,0.85)";
  }};

  padding-bottom: 4px;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#58e63d" : "transparent")};

  &:hover {
    color: ${({ danger }) => (danger ? "#fecaca" : "#58e63d")};
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

  @media (max-width: 980px) {
    gap: 10px;
  }

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

/* ================= DESKTOP USER MENU ================= */

export const DesktopMenuWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DesktopUserButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  outline: none;
  border-radius: 999px;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const DesktopUserImage = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;
  display: block;
`;

export const DesktopDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 210px;
  padding: 10px;
  border-radius: 16px;
  background: #0f1d36;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) =>
    open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)"};
  transform-origin: top right;
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: 6000;
`;

export const DesktopDropdownItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ danger }) => (danger ? "#fca5a5" : "rgba(255,255,255,0.92)")};
  text-align: left;
  font-size: 0.96rem;
  font-weight: 700;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    color: ${({ danger }) => (danger ? "#fecaca" : "#58e63d")};
  }
`;

export const DesktopDropdownDivider = styled.div`
  height: 1px;
  width: 100%;
  margin: 6px 0;
  background: rgba(255, 255, 255, 0.08);
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

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    display: block;
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
  height: 100dvh;
  background: #0f1d36;
  padding-top: ${({ $withSafeTop }) =>
    $withSafeTop
      ? "calc(env(safe-area-inset-top, 0px) + 68px)"
      : "68px"};
  z-index: 99999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateX(${({ open }) => (open ? "0%" : "100%")});
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px 36px 32px;
`;

export const DrawerClose = styled.div`
  position: absolute;
  top: ${({ $withSafeTop }) =>
    $withSafeTop
      ? "calc(env(safe-area-inset-top, 0px) + 20px)"
      : "20px"};
  right: 20px;
  font-size: 1.9rem;
  line-height: 1;
  cursor: pointer;
  color: #ffffff;
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

export const DrawerActionWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;