import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ACADEMY_NAV } from "./academyNavConfig";
import { TOOLS_NAV } from "./toolsNavConfig";

export default function NavLinks({ isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isTools = location.pathname.startsWith("/herramientas");

  const nav = isTools ? TOOLS_NAV : ACADEMY_NAV;

  const go = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {nav.map((item) => (
        <div
          key={item.path}
          onClick={() => go(item.path)}
          style={{
            cursor: "pointer",
            fontWeight: "700",
            color: "white",
            fontSize: isMobile ? "1rem" : "0.9rem",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}