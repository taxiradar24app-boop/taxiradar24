// src/components/HeaderBox/shared/UserMenu.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useThemeMode } from "@/context/ThemeContext";

export default function UserMenu() {
  const { user, logout, userData } = useAuth();
  const { toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  // Si no hay usuario logueado → CTA simple
  if (!user) {
    return (
      <div className="user-menu user-menu--guest">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="user-menu__btn"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="user-menu__btn user-menu__btn--secondary"
        >
          Crear cuenta
        </button>
      </div>
    );
  }

  const displayName =
    user.displayName ||
    (user.email ? user.email.split("@")[0] : "usuario");

  const isPro =
    userData?.subscription === "PRO" ||
    userData?.subscription === "ACADEMIA_PRO";

  return (
    <div className="user-menu user-menu--logged">
      <div className="user-menu__info">
        <span className="user-menu__name">{displayName}</span>
        {isPro && <span className="user-menu__badge">PRO</span>}
      </div>

      <ul className="user-menu__list">
        <li>
          <Link to="/perfil" className="user-menu__link">
            Perfil
          </Link>
        </li>

        {/* Si quieres activar el cambio de tema, puedes
            añadir algún estilo extra a este botón. */}
        {/* <li>
          <button
            type="button"
            onClick={toggleTheme}
            className="user-menu__link"
          >
            Cambiar tema
          </button>
        </li> */}

        <li>
          <button
            type="button"
            onClick={logout}
            className="user-menu__link user-menu__logout"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}
