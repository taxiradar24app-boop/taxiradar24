import styled from "styled-components";

export const UserMenuRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const UserIconButton = styled.button`
  width: ${({ mobile }) => (mobile ? "42px" : "44px")};
  height: ${({ mobile }) => (mobile ? "42px" : "44px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 12px;
  cursor: pointer;
  background: rgba(16, 163, 127, 0.08);
  color: #10a37f;
  box-shadow: inset 0 0 0 1px rgba(16, 163, 127, 0.18);
  transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    background: rgba(16, 163, 127, 0.14);
    box-shadow: inset 0 0 0 1px rgba(16, 163, 127, 0.28);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const UserIconGlyph = styled.span`
  font-size: ${({ mobile }) => (mobile ? "1.22rem" : "1.18rem")};
  line-height: 1;
  filter: saturate(1.05);
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: ${({ mobile }) => (mobile ? "52px" : "54px")};
  right: 0;
  min-width: ${({ mobile }) => (mobile ? "190px" : "210px")};
  overflow: hidden;
  border-radius: 14px;
  background: #0f1d36;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.34);
  z-index: 100000;
`;

export const UserDropdownItem = styled.button`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  padding: 13px 16px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.96rem;
  font-weight: 600;
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
  }
`;

export const UserDropdownDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
`;