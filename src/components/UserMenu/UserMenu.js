import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import {
  UserMenuRoot,
  UserIconButton,
  UserIconGlyph,
  UserDropdown,
  UserDropdownItem,
  UserDropdownDivider,
} from "./UserMenuStyle";

const iconoUsuario = "/assets/iconoUsuario-70.webp";

export default function UserMenu({ mobile = false, onAction = () => {} }) {
  const navigate = useNavigate();
  const { user, subscription, needsProOnboarding, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const isProSub = subscription?.active === true;
  const profilePath = needsProOnboarding ? "/perfil/pro-check" : "/perfil";
  const progressPath = needsProOnboarding ? "/perfil/pro-check" : "/progreso";

  const go = (path) => {
    if (!path) return;
    navigate(path);
    setOpen(false);
    onAction();
  };

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!user) return null;

  return (
    <UserMenuRoot ref={rootRef} mobile={mobile}>
      <UserIconButton
        type="button"
        mobile={mobile}
        aria-label="Abrir menú de usuario"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserIconGlyph mobile={mobile}>
        <img src={iconoUsuario} alt="Usuario" />
      </UserIconGlyph>
      </UserIconButton>

      {open && (
        <UserDropdown mobile={mobile}>
          <UserDropdownItem onClick={() => go(profilePath)}>
            Perfil
          </UserDropdownItem>

          <UserDropdownItem onClick={() => go(progressPath)}>
            Progreso
          </UserDropdownItem>

          {!isProSub && (
            <>
              <UserDropdownDivider />
              <UserDropdownItem onClick={() => go("/academia/upgrade")}>
                Pasar a PRO
              </UserDropdownItem>
            </>
          )}

          <UserDropdownDivider />

          <UserDropdownItem
            onClick={() => {
              logout();
              setOpen(false);
              onAction();
            }}
          >
            Cerrar sesión
          </UserDropdownItem>
        </UserDropdown>
      )}
    </UserMenuRoot>
  );
}