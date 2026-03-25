// src/components/HeaderBox/ToolsHeader/ToolsHeader.js

import React, { useState } from "react";
import HeaderShell from "@/components/HeaderBox/shared/HeaderShell";
import MobileDrawer from "./../shared/MobileDrawer";
import NavLinks from "./../shared/NavLinks";
import { TOOLS_NAV } from "./../shared/toolsNavConfig";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

/*
  ToolsHeader PRO
  -----------------
  - Header para herramientas del taxista
  - Menú central basado en TOOLS_NAV
  - Drawer móvil para navegación responsive
  - Integrado con HeaderShell, mismo diseño PRO
*/

export default function ToolsHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <HeaderShell
        centerContent={<NavLinks items={TOOLS_NAV} currentPath={pathname} />}
        showHamburger={true}
        onOpenMobileMenu={() => setDrawerOpen(true)}
      />

      {/* Drawer móvil */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        menuContent={
          <DrawerContent>
            <NavLinks
              items={TOOLS_NAV}
              currentPath={pathname}
              mobile={true}
            />
          </DrawerContent>
        }
      />
    </>
  );
}

/* ======================================================
   🔧 ESTILOS EXCLUSIVOS DEL DRAWER
====================================================== */

const DrawerContent = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
