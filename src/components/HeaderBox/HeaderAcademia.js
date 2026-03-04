// src/components/HeaderBox/HeaderAcademia.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resolveNavigation } from "@/navigator/navigationConfig";
import { useAuth } from "@/navigator/sections/auth/useAuth";

import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavItem,
  UserSection,
  UserMenu,
  UserMenuItem,
  AvatarButton,
  MobileButton,
  MobileDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerClose,
  CTAButton,
} from "./HeaderAcademiaStyle";

export default function HeaderAcademia() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, subscription, needsProOnboarding, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { academy, showUpgradeCTA } = resolveNavigation({ user, subscription });

  const isProSub = subscription?.status === "active";
  const basePath = isProSub ? "/academia/pro" : "/academia/demo";

  const go = (path) => {
    navigate(path);
    setOpenMenu(false);
    setOpenDrawer(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const normalizeSlug = (id) => id.replace(/^demo-/, "").replace(/^pro-/, "");

  const userLabel =
    user?.displayName || user?.email?.split("@")[0] || "Invitado";

  const profilePath = needsProOnboarding ? "/perfil/pro-check" : "/perfil";
  const progressPath = needsProOnboarding ? "/perfil/pro-check" : "/progreso";

  const baseItems = academy.map((item) => {
    const slug = normalizeSlug(item.id);
    return { ...item, path: `${basePath}/${slug}` };
  });

  const proExtraItems = isProSub
    ? [
        { id: "vias-principales", label: "Vías", path: "/academia/pro/vias-principales" },
        { id: "tarifas", label: "Tarifas", path: "/academia/pro/tarifas" },
      ]
    : [];

  const navItems = [...baseItems, ...proExtraItems];

  // ✅ Bloquear scroll del fondo cuando el drawer está abierto
  useEffect(() => {
    if (!openDrawer) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.touchAction = prevTouchAction || "";
    };
  }, [openDrawer]);

  // ✅ Cerrar con ESC
  useEffect(() => {
    if (!openDrawer) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenDrawer(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openDrawer]);

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <Logo onClick={() => go(isProSub ? "/academia/pro" : "/academia/demo")}>
            {isProSub ? "PRO home" : "DEMO home"}
          </Logo>

          <Nav>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                active={isActive(item.path)}
                onClick={() => go(item.path)}
              >
                {item.label}
              </NavItem>
            ))}

            {user && (
              <NavItem active={isActive(progressPath)} onClick={() => go(progressPath)}>
                Progreso
              </NavItem>
            )}
          </Nav>

          {showUpgradeCTA && !isProSub && (
            <CTAButton onClick={() => go("/academia/upgrade")}>
              Desbloquear PRO
            </CTAButton>
          )}

          {user && (
            <UserSection>
              <AvatarButton onClick={() => setOpenMenu((v) => !v)}>
                {userLabel}
              </AvatarButton>

              {openMenu && (
                <UserMenu>
                  <UserMenuItem onClick={() => go(profilePath)}>Perfil</UserMenuItem>
                  <UserMenuItem onClick={() => go(progressPath)}>Progreso</UserMenuItem>
                  <UserMenuItem onClick={logout}>Cerrar sesión</UserMenuItem>
                </UserMenu>
              )}
            </UserSection>
          )}

          <MobileButton onClick={() => setOpenDrawer(true)}>☰</MobileButton>
        </HeaderInner>
      </HeaderWrapper>

      {/* ✅ Overlay: cierra al tocar fuera */}
      <DrawerOverlay open={openDrawer} onClick={() => setOpenDrawer(false)} />

      <MobileDrawer open={openDrawer}>
        <DrawerClose onClick={() => setOpenDrawer(false)}>✕</DrawerClose>

        <DrawerContent>
          {navItems.map((item) => (
            <NavItem key={item.id} onClick={() => go(item.path)}>
              {item.label}
            </NavItem>
          ))}

          {user && <NavItem onClick={() => go(progressPath)}>Progreso</NavItem>}

          {showUpgradeCTA && !isProSub && (
            <CTAButton onClick={() => go("/academia/upgrade")}>
              Desbloquear PRO
            </CTAButton>
          )}

          {user && (
            <>
              <hr />
              <UserMenuItem onClick={() => go(profilePath)}>Perfil</UserMenuItem>
              <UserMenuItem onClick={() => go(progressPath)}>Progreso</UserMenuItem>
              <UserMenuItem
                onClick={() => {
                  logout();
                  setOpenDrawer(false);
                }}
              >
                Cerrar sesión
              </UserMenuItem>
            </>
          )}
        </DrawerContent>
      </MobileDrawer>
    </>
  );
}