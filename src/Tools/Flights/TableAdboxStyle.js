import styled from "styled-components";

/* 🎯 Contenedor general */
export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 14px;
  padding: 12px 10px;
  margin: 12px auto;
  width: 95%;
  max-width: 950px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 10px rgba(0,0,0,0.5)"
      : "0 2px 10px rgba(0,0,0,0.15)"};
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

/* ✈️ Título principal */
export const TableTitle = styled.h3`
  text-align: center;
  color: ${({ theme }) =>
    theme.mode === "dark" ? "#ffffff" : "#000000"};
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 6px;

  span {
    color: #7bf186;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

/* 🕒 Subtítulo: hora de actualización */
export const UpdateText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

/* 📋 Tabla */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#262837" : theme.colors.background};
  border-radius: 10px;
  overflow: hidden;

  th {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#1b1d2b" : theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    padding: 10px 4px;
    border-bottom: 2px solid
      ${({ theme }) =>
        theme.mode === "dark" ? "#333" : theme.colors.border};
  }

  td {
    padding: 8px 6px;
    border-bottom: 1px solid
      ${({ theme }) =>
        theme.mode === "dark" ? "#2f3245" : theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
  }

  tr:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#2d3042" : "#f2f2f2"};
  }

  /* ✅ Responsividad */
  @media (max-width: 768px) {
    font-size: 0.8rem;
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

    /* Ocultar columnas: Origen y Programado */
    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(4),
    td:nth-child(4) {
      display: none;
    }
  }
`;

/* 🟢 Estado */
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  background-color: ${({ status }) =>
    status === "Expected"
      ? "#10b981" // verde
      : status === "Delayed"
      ? "#f59e0b" // naranja
      : status === "Canceled"
      ? "#ef4444" // rojo
      : status === "landed"
      ? "#8b5cf6" // 💜 violeta
      : "#6b7280"};

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 3px 6px;
  }
`;
