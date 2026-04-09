import styled from "styled-components";

export const MobileDrawerTrigger = styled.button`
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 12px);
  right: 14px;
  width: 42px;
  height: 42px;
  border: none;
  outline: none;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  color: #ffffff;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10020;
  padding: 0;
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
  }
`;

export const MobileDrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.48);
  backdrop-filter: blur(3px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 220ms ease;
  z-index: 10030;

  @media (min-width: 781px) {
    display: none;
  }
`;

export const MobileDrawerPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(84vw, 320px);
  height: 100dvh;
  background: rgba(10, 21, 40, 0.98);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: -18px 0 36px rgba(0, 0, 0, 0.34);
  padding:
    calc(env(safe-area-inset-top, 0px) + 18px)
    18px
    calc(env(safe-area-inset-bottom, 0px) + 22px);
  transform: translateX(${({ $open }) => ($open ? "0%" : "100%")});
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 10040;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 781px) {
    display: none;
  }
`;

export const MobileDrawerClose = styled.button`
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 14px);
  right: 14px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 1.65rem;
  line-height: 1;
  cursor: pointer;
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 28px;
  margin-bottom: 16px;
`;

export const MobileDrawerAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MobileDrawerName = styled.div`
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.2;
  color: #f8fafc;
  word-break: break-word;
`;

export const MobileDrawerDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 0 14px;
`;

export const MobileDrawerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MobileDrawerItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.94);
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  padding: 12px 4px;
  cursor: pointer;
  transition: color 0.18s ease;

  &:hover {
    color: #58e63d;
  }
`;

export const MobileDrawerPrimaryButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.04)
  );
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.2;
  padding: 16px 18px;
  cursor: pointer;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  transition: all 0.18s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.06)
    );
  }
`;