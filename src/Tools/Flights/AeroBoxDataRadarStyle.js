// src/Styles/AeroBoxDataRadarStyle.js
import styled from "styled-components";

/* 🎯 Contenedor principal */
export const Container = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#1e2030" : "#f9f9f9"};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 14px;
  padding: 14px 12px;
  margin: 14px auto;
  width: 95%;
  max-width: 950px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 12px rgba(0,0,0,0.6)"
      : "0 2px 10px rgba(0,0,0,0.15)"};
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "dark" ? "#2d2f42" : "rgba(244,211,94,0.35)"};

  display: flex;
  flex-direction: column;
  align-items: center; /* 🔹 centra todo el contenido dentro */
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    border-radius: 0;
    padding: 8px;
  }
`;

/* ✈️ Título principal */
export const Title = styled.h3`
  color: ${({ theme }) =>
    theme.mode === "dark" ? "#f4d35e" : "#162c66"};
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 6px;
  text-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 0 6px rgba(244,211,94,0.3)"
      : "none"};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

/* 🕓 Última actualización */
export const LastUpdated = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  margin: 6px 0 12px 0;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

/* 📋 Tabla principal */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#26283a" : theme.colors.background};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 6px;

  th {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#1b1d2b" : "#f4d35e40"};
    color: ${({ theme }) =>
      theme.mode === "dark" ? "#ffffff" : "#000000"};
    font-weight: 600;
    padding: 10px 6px;
    border-bottom: 2px solid
      ${({ theme }) =>
        theme.mode === "dark" ? "#333" : theme.colors.border};
    text-align: center;
    white-space: nowrap;
  }

  td {
    padding: 8px 8px;
    border-bottom: 1px solid
      ${({ theme }) =>
        theme.mode === "dark" ? "#2f3245" : theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }

  /* 🔹 Centramos el contenido general */
  th,
  td {
    text-align: center;
  }

  /* Última columna (estado) más clara visualmente */
  th:last-child,
  td:last-child {
    text-align: center;
    width: 150px;
  }

  /* 🔸 Responsive */
  @media (max-width: 768px) {
    font-size: 0.85rem;
    th,
    td {
      padding: 6px 4px;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    th,
    td {
      padding: 5px 2px;
    }

    /* 🚫 Ocultar columna Origen en móvil */
    .hide-mobile {
      display: none;
    }
  }
`;

/* 🟣 Estado visual (Aterriz. / Maletas / Aproxi.) */
export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  letter-spacing: 0.3px;
  margin: 0 auto; /* 🔹 centra dentro del td */

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.15);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
