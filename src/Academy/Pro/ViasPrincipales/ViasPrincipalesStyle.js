import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#0a1528"};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ================= FRAME (IGUAL QUE REGLAMENTO) ================= */

export const PageFrame = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;

  padding: 0 40px 24px;

  @media (max-width: 950px) {
    padding: 0 16px 20px;
  }
`;

/* ================= MAP ================= */

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;

  position: sticky;
  top: 64px;
  z-index: 5;

  background: #08101f;
  border-radius: 18px;
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    min-height: 320px;
  }
`;

/* ================= GRID ================= */

export const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* 🔥 SIEMPRE 50 / 50 */
  gap: 16px;
  overflow: hidden;
  background: #0a1528;
`;

/* ================= LIST COLUMN ================= */

export const ListColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 12px 20px 20px;
  gap: 16px;
`;

/* ================= SIDEBAR COLUMN ================= */

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 20px 20px 12px;
  gap: 12px;
`;

/* ================= TITLES ================= */

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  margin-bottom: 6px;
`;

/* ================= LIST ================= */

export const DirectionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const DirectionItem = styled.li`
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  color: #e5e7eb;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 200, 61, 0.08);
    border-color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  }
`;

/* ================= SIDEBAR ITEM ================= */

export const SidebarItem = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(16,163,127,0.6)" : "rgba(255,255,255,0.08)"};
  background: ${({ $active }) =>
    $active ? "rgba(16,163,127,0.15)" : "transparent"};
  color: ${({ $active }) => ($active ? "#10a37f" : "#e5e7eb")};
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(16, 163, 127, 0.15);
  }
`;
