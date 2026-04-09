import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import {
  MobileDrawerTrigger,
  MobileDrawerOverlay,
  MobileDrawerPanel,
  MobileDrawerClose,
  MobileDrawerHeader,
  MobileDrawerAvatar,
  MobileDrawerName,
  MobileDrawerDivider,
  MobileDrawerList,
  MobileDrawerItem,
  MobileDrawerPrimaryButton,
} from "./MobileUserDrawerLiteStyle";

const iconoUsuario = "/assets/iconoUsuario.png";
const avatarFallback = "/assets/iconoUsuario.png";

export default function MobileUserDrawerLite({
  items,
  showAcademia = true,
  showHerramientas = true,
  showInicio = true,
  profilePath = "/perfil",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData, subscription, logout } = useAuth();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const goTo = (path) => {
    if (!path) return;
    navigate(path);
    closeMenu();
  };

  const goToLoginWithIntent = (redirectTo, source) => {
    navigate("/login", {
      state: {
        redirectTo,
        source,
      },
    });
    closeMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      closeMenu();
    }
  };

  const isPro =
    subscription?.active === true ||
    userData?.subscription === "PRO" ||
    userData?.subscription === "ACADEMIA_PRO";

  const displayName =
    user?.displayName ||
    userData?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Invitado");

  const avatarSrc = user?.photoURL || avatarFallback;

  const defaultItems = useMemo(() => {
    const output = [];

    if (showAcademia) {
      output.push({
        key: "academia",
        label: "📚 Academia",
        action: () => {
          if (!user) {
            goTo("/academia/demo");
            return;
          }
          goTo(isPro ? "/academia/pro" : "/academia/demo");
        },
      });
    }

    if (showHerramientas) {
      output.push({
        key: "herramientas",
        label: "🔧 Herramientas",
        action: () => {
          if (!user) {
            goToLoginWithIntent("/herramientas", "tools_drawer_gate");
            return;
          }

          goTo("/herramientas");
        },
      });
    }

    if (showInicio) {
      output.push({
        key: "inicio",
        label: "Inicio",
        action: () => goTo("/"),
      });
    }

    return output;
  }, [user, isPro, showAcademia, showHerramientas, showInicio]);

  const menuItems = items?.length ? items : defaultItems;
  const inPerfil = location.pathname.startsWith("/perfil");

  return (
    <>
      <MobileDrawerTrigger
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
      >
        <img src={iconoUsuario} alt="Usuario" />
      </MobileDrawerTrigger>

      <MobileDrawerOverlay $open={open} onClick={closeMenu} />

      <MobileDrawerPanel $open={open}>
        <MobileDrawerClose type="button" onClick={closeMenu}>
          ✕
        </MobileDrawerClose>

        <MobileDrawerHeader>
          <MobileDrawerAvatar src={avatarSrc} alt="Usuario" />
          <MobileDrawerName>{displayName}</MobileDrawerName>
        </MobileDrawerHeader>

        <MobileDrawerDivider />

        <MobileDrawerList>
          {!user ? (
            <MobileDrawerPrimaryButton
              type="button"
              onClick={() => goToLoginWithIntent("/login", "drawer_login")}
            >
              Login / Registro
            </MobileDrawerPrimaryButton>
          ) : !inPerfil ? (
            <MobileDrawerPrimaryButton
              type="button"
              onClick={() => goTo(profilePath)}
            >
              Perfil
            </MobileDrawerPrimaryButton>
          ) : null}

          {menuItems.map((item) => (
            <MobileDrawerItem
              key={item.key || item.label}
              type="button"
              onClick={item.action}
            >
              {item.label}
            </MobileDrawerItem>
          ))}

          {user && (
            <>
              <MobileDrawerDivider />
              <MobileDrawerItem type="button" onClick={handleLogout}>
                Cerrar sesión
              </MobileDrawerItem>
            </>
          )}
        </MobileDrawerList>
      </MobileDrawerPanel>
    </>
  );
}