// ======================================================================
// 📱 MobileDrawer — Versión ENTERPRISE
// Integrado con NavLinks.js y navigationConfig.js
// Compatible con roles, planes y verticales
// ======================================================================

import React from "react";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MobileDrawer({ isOpen, onClose }) {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  // Nombre mostrado
  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Usuario");

  const isPro =
    userData?.subscription === "PRO" ||
    userData?.subscription === "ACADEMIA_PRO";

  const avatarUrl =
    user?.photoURL ||
    "https://ui-avatars.com/api/?name=User&background=444&color=fff";

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <DrawerContainer $open={isOpen}>
      <Overlay onClick={onClose} />

      <DrawerPanel>
        {/* Cerrar */}
        <CloseButton onClick={onClose}>×</CloseButton>

        {/* Header usuario */}
        {user && (
          <UserHeader>
            <Avatar src={avatarUrl} alt="avatar" />

            <UserInfo>
              <UserName>{displayName}</UserName>
              {isPro && <Badge>PRO</Badge>}
            </UserInfo>
          </UserHeader>
        )}

        {/* CTA inteligente */}
        {!isPro && (
          <CTAButton onClick={() => handleNavigation("/academia/upgrade")}>
            Hazte PRO
          </CTAButton>
        )}

        <DrawerContent>
          {/* Aquí NavLinks hace TODO el menú eficiente */}
          <NavLinks isMobile />
        </DrawerContent>
      </DrawerPanel>
    </DrawerContainer>
  );
}

/* ======================================================
   🔧 ESTILOS
====================================================== */

const DrawerContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: ${(p) => (p.$open ? "block" : "none")};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
`;

const DrawerPanel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  width: 280px;
  background: ${({ theme }) => theme.colors.headerBackground};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.3);

  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const DrawerContent = styled.div`
  margin-top: 1.5rem;
  flex: 1;
  overflow-y: auto;

  padding-inline: 0.5rem;
`;

/* ======================================================
   👤 SECCIÓN USUARIO
====================================================== */

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Badge = styled.span`
  align-self: flex-start;
  margin-top: 2px;
  font-size: 0.75rem;

  padding: 2px 8px;
  border-radius: 6px;

  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-weight: 600;
`;

/* ======================================================
   🎯 CTA PRO
====================================================== */

const CTAButton = styled.button`
  width: 100%;
  padding: 0.7rem 0.9rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;
