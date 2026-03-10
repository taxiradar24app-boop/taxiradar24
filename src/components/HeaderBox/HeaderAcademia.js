// src/components/HeaderBox/HeaderAcademia.js

import React, { useEffect, useMemo, useState } from "react";
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
  DrawerDivider,
  DemoInfoBox,
  DemoInfoTitle,
  DemoInfoText,
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

  const userLabel =
    user?.displayName || user?.email?.split("@")[0] || "Invitado";

  const profilePath = needsProOnboarding ? "/perfil/pro-check" : "/perfil";
  const progressPath = needsProOnboarding ? "/perfil/pro-check" : "/progreso";

  const go = (path) => {
    if (!path) return;
    navigate(path);
    setOpenMenu(false);
    setOpenDrawer(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const normalizeSlug = (id = "") =>
    id.replace(/^demo-/, "").replace(/^pro-/, "");

  const navItems = useMemo(() => {
    const mappedAcademyItems = (academy || []).map((item) => {
      const slug = normalizeSlug(item.id);
      return {
        ...item,
        path: `${basePath}/${slug}`,
      };
    });

    const extraItems = [
      {
        id: "vias-principales",
        label: "Vías Principales",
        path: `${basePath}/vias-principales`,
      },
      {
        id: "tarifas",
        label: "Tarifas",
        path: `${basePath}/tarifas`,
      },
    ];

    const merged = [...mappedAcademyItems, ...extraItems];

    return merged.filter(
      (item, index, arr) =>
        arr.findIndex((entry) => entry.path === item.path) === index
    );
  }, [academy, basePath]);

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

  useEffect(() => {
    if (!openDrawer) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenDrawer(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openDrawer]);

  useEffect(() => {
    if (!openMenu) return;

    const handleOutsideClick = (e) => {
      const userMenuRoot = document.getElementById("academy-user-menu-root");
      if (userMenuRoot && !userMenuRoot.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [openMenu]);

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
              <NavItem
                active={isActive(progressPath)}
                onClick={() => go(progressPath)}
              >
                Progreso
              </NavItem>
            )}
          </Nav>

          {user && (
            <UserSection id="academy-user-menu-root">
              <AvatarButton onClick={() => setOpenMenu((prev) => !prev)}>
                {userLabel}
              </AvatarButton>

              {openMenu && (
                <UserMenu>
                  <UserMenuItem onClick={() => go(profilePath)}>
                    Perfil
                  </UserMenuItem>
                  <UserMenuItem onClick={() => go(progressPath)}>
                    Progreso
                  </UserMenuItem>
                  <UserMenuItem
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                    }}
                  >
                    Cerrar sesión
                  </UserMenuItem>
                </UserMenu>
              )}
            </UserSection>
          )}

          <MobileButton onClick={() => setOpenDrawer(true)}>☰</MobileButton>
        </HeaderInner>
      </HeaderWrapper>

      <DrawerOverlay open={openDrawer} onClick={() => setOpenDrawer(false)} />

      <MobileDrawer open={openDrawer}>
        <DrawerClose onClick={() => setOpenDrawer(false)}>✕</DrawerClose>

        <DrawerContent>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              active={isActive(item.path)}
              onClick={() => go(item.path)}
            >
              {item.label}
            </NavItem>
          ))}

          {showUpgradeCTA && !isProSub && (
            <>
              <DrawerDivider />

              <DemoInfoBox>
                <DemoInfoTitle>Versión DEMO</DemoInfoTitle>
                <DemoInfoText>
                  Explora la academia y desbloquea todo con PRO
                </DemoInfoText>
              </DemoInfoBox>

              <CTAButton onClick={() => go("/academia/upgrade")}>
                Desbloquear PRO
              </CTAButton>
            </>
          )}

          {user && (
            <>
              <DrawerDivider />
              <UserMenuItem onClick={() => go(profilePath)}>Perfil</UserMenuItem>
              <UserMenuItem onClick={() => go(progressPath)}>
                Progreso
              </UserMenuItem>
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