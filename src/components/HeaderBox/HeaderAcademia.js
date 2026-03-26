import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resolveNavigation } from "@/navigator/navigationConfig";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import LoginId, { LoginIdText } from "@/components/Buttons/LoginId";

const iconoUsuario = "/assets/iconoUsuario.png";

import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavItem,
  HeaderRightDesktop,
  HeaderRightMobile,
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
  DesktopUserButton,
  DesktopUserImage,
  DesktopMenuWrap,
  DesktopDropdown,
  DesktopDropdownItem,
  DesktopDropdownDivider,
  DrawerActionWrap,
} from "./HeaderAcademiaStyle";

export default function HeaderAcademia({ withSafeTop = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, subscription, needsProOnboarding, logout } = useAuth();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(false);

  const desktopMenuRef = useRef(null);

  const { academy, showUpgradeCTA } = resolveNavigation({ user, subscription });

  const isProSub = subscription?.status === "active";
  const basePath = isProSub ? "/academia/pro" : "/academia/demo";

  const profilePath = needsProOnboarding ? "/perfil/pro-check" : "/perfil";
  const progressPath = needsProOnboarding ? "/perfil/pro-check" : "/progreso";

  const accountLabel = user ? "Mi cuenta" : "¡Ya tengo cuenta!";

  const go = (path) => {
    if (!path) return;
    navigate(path);
    setOpenDrawer(false);
    setOpenDesktopMenu(false);
  };

  const goAccount = () => {
    if (user) {
      go(profilePath);
      return;
    }
    go("/login");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setOpenDrawer(false);
      setOpenDesktopMenu(false);
    }
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
      {
        id: "progreso",
        label: "Progreso",
        path: progressPath,
      },
    ];

    const merged = [...mappedAcademyItems, ...extraItems];

    return merged.filter(
      (item, index, arr) =>
        arr.findIndex((entry) => entry.path === item.path) === index
    );
  }, [academy, basePath, progressPath]);

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
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenDrawer(false);
        setOpenDesktopMenu(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setOpenDesktopMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <HeaderWrapper $withSafeTop={withSafeTop}>
        <HeaderInner>
          <Logo onClick={() => go(isProSub ? "/academia/pro" : "/academia/demo")}>
            {isProSub ? "Home/PRO" : "Home/DEMO"}
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
          </Nav>

          <HeaderRightDesktop>
            <LoginId type="button" onClick={goAccount}>
              <LoginIdText>{accountLabel}</LoginIdText>
            </LoginId>

            {user && (
              <DesktopMenuWrap ref={desktopMenuRef}>
                <DesktopUserButton
                  type="button"
                  aria-label="Abrir menú de usuario"
                  onClick={() => setOpenDesktopMenu((prev) => !prev)}
                >
                  <DesktopUserImage src={iconoUsuario} alt="Usuario" />
                </DesktopUserButton>

                <DesktopDropdown open={openDesktopMenu}>
                  <DesktopDropdownItem onClick={() => go(profilePath)}>
                    Perfil
                  </DesktopDropdownItem>

                  <DesktopDropdownDivider />

                  <DesktopDropdownItem danger onClick={handleLogout}>
                    Cerrar sesión
                  </DesktopDropdownItem>
                </DesktopDropdown>
              </DesktopMenuWrap>
            )}
          </HeaderRightDesktop>

          <HeaderRightMobile>
            <MobileButton
              type="button"
              aria-label="Abrir menú"
              onClick={() => setOpenDrawer(true)}
            >
              <img src={iconoUsuario} alt="Usuario" />
            </MobileButton>
          </HeaderRightMobile>
        </HeaderInner>
      </HeaderWrapper>

      <DrawerOverlay open={openDrawer} onClick={() => setOpenDrawer(false)} />

      <MobileDrawer open={openDrawer} $withSafeTop={withSafeTop}>
        <DrawerClose
          $withSafeTop={withSafeTop}
          onClick={() => setOpenDrawer(false)}
        >
          ✕
        </DrawerClose>

        <DrawerDivider />

        <DrawerContent>
          {user && (
            <>
              <NavItem onClick={() => go(profilePath)}>Perfil</NavItem>
              <NavItem onClick={() => go(progressPath)}>Progreso</NavItem>
              <DrawerDivider />
            </>
          )}

          {navItems
            .filter((item) => item.id !== "progreso")
            .map((item) => (
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

          <DrawerActionWrap>
            <LoginId type="button" onClick={goAccount}>
              <LoginIdText>{accountLabel}</LoginIdText>
            </LoginId>
          </DrawerActionWrap>

          {user && (
            <>
              <DrawerDivider />
              <NavItem onClick={handleLogout}>Cerrar sesión</NavItem>
              <DrawerDivider />
            </>
          )}
        </DrawerContent>
      </MobileDrawer>
    </>
  );
}