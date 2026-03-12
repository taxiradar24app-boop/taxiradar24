import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resolveNavigation } from "@/navigator/navigationConfig";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import UserMenu from "@/components/UserMenu/UserMenu";
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
} from "./HeaderAcademiaStyle";

export default function HeaderAcademia() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, subscription } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);

  const { academy, showUpgradeCTA } = resolveNavigation({ user, subscription });

  const isProSub = subscription?.status === "active";
  const basePath = isProSub ? "/academia/pro" : "/academia/demo";

  const go = (path) => {
    if (!path) return;
    navigate(path);
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

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <Logo onClick={() => go(isProSub ? "/academia/pro" : "/academia/demo")}>
            {isProSub ? "PRO" : "DEMO"}
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
            {user && <UserMenu />}
          </HeaderRightDesktop>

          <HeaderRightMobile>
            {user && <UserMenu mobile onAction={() => setOpenDrawer(false)} />}
            <MobileButton onClick={() => setOpenDrawer(true)}>☰</MobileButton>
          </HeaderRightMobile>
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
        </DrawerContent>
      </MobileDrawer>
    </>
  );
}