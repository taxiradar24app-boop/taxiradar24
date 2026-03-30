import styled, { css } from "styled-components";

/* =========================
   CONTENEDORES
========================= */

export const Container = styled.section`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto 24px;
  padding: 18px;
  border-radius: 24px;
  background:
    linear-gradient(
      180deg,
      rgba(11, 24, 56, 0.96) 0%,
      rgba(8, 20, 48, 0.98) 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors?.text || "#e6edf7"};

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 14px;
    border-radius: 18px;
    margin-bottom: 18px;
  }

  @media (max-width: 480px) {
    width: calc(100% - 16px);
    padding: 12px;
    border-radius: 16px;
  }
`;

export const TableContainer = styled(Container)`
  background:
    linear-gradient(
      180deg,
      rgba(10, 22, 50, 0.96) 0%,
      rgba(8, 18, 42, 0.99) 100%
    );
`;

/* =========================
   HEADER
========================= */

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  z-index: 2;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
  z-index: 1;
  margin: 0 0 16px 0;
`;

export const Kicker = styled.div`
  color: #a3e635;
  text-transform: uppercase;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: 0.08em;
`;

export const Title = styled.h3`
  margin: 0;
  color: #f8fafc;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.75rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: 1.15;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};
  display: block;

  span {
    color: #a3e635;
    font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  }

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 1.15;
  }
`;

export const TableTitle = styled(Title)``;

export const HeaderSubtitle = styled.p`
  margin: 0;
  max-width: 760px;
  color: #b8c6e3;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

/* =========================
   RESUMEN POR HORA
========================= */

export const HourForecastWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 6px;
  width: 100%;
  max-width: 720px;

  @media (max-width: 768px) {
    gap: 10px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const HourForecastItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 50px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(16, 163, 127, 0.1);
  border: 1px solid rgba(16, 163, 127, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 8px 20px rgba(0, 0, 0, 0.18);

  ${({ $isCurrentHour }) =>
    $isCurrentHour &&
    css`
      background: rgba(168, 85, 247, 0.16);
      border: 1px solid rgba(168, 85, 247, 0.42);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 0 0 1px rgba(168, 85, 247, 0.14),
        0 10px 24px rgba(76, 29, 149, 0.28);
    `}

  @media (max-width: 480px) {
    min-height: 44px;
    padding: 8px 11px;
    gap: 8px;
  }
`;

export const HourForecastHour = styled.span`
  color: ${({ $isCurrentHour }) => ($isCurrentHour ? "#f3e8ff" : "#d9e8ff")};
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.84rem;
  }
`;

export const HourForecastCount = styled.span`
  color: ${({ $isCurrentHour }) => ($isCurrentHour ? "#e9d5ff" : "#a3e635")};
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: 1.2;
  white-space: nowrap;
  text-align: right;

  @media (max-width: 480px) {
    font-size: 0.84rem;
  }
`;

/* =========================
   PILLS / META
========================= */

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const LastUpdated = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.28);
  color: #dff7ee;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
`;

export const UpdatePill = styled(LastUpdated)``;

export const ErrorText = styled.p`
  margin: 0 0 14px 0;
  color: #ffb4b4;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

/* =========================
   TABLAS
========================= */

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: visible;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(8, 18, 42, 0.75);
`;

export const TableScroll = styled(TableWrap)``;

export const Table = styled.table`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  background: transparent;
  table-layout: fixed;

  th,
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: rgba(15, 27, 58, 0.98);
    color: #8fb3ff;
    text-align: left;
    padding: 14px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
    font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  td {
    padding: 13px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: #e8eef9;
    text-align: left;
    vertical-align: middle;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
    font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
    line-height: 1.3;
    letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  }

  tbody tr {
    transition: background 0.18s ease;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  td:first-child,
  th:first-child {
    padding-left: 14px;
  }

  td:last-child,
  th:last-child {
    padding-right: 14px;
  }

  @media (max-width: 768px) {
    .hide-flight-mobile {
      display: none;
    }

    th {
      font-size: 0.74rem;
      padding: 11px 8px;
      letter-spacing: 0.03em;
    }

    td {
      font-size: 0.85rem;
      padding: 11px 8px;
    }

    td:first-child,
    th:first-child {
      padding-left: 10px;
    }

    td:last-child,
    th:last-child {
      padding-right: 10px;
    }
  }

  @media (max-width: 520px) {
    th {
      font-size: 0.68rem;
      padding: 10px 6px;
    }

    td {
      font-size: 0.78rem;
      padding: 10px 6px;
    }

    td:first-child,
    th:first-child {
      padding-left: 8px;
    }

    td:last-child,
    th:last-child {
      padding-right: 8px;
    }
  }
`;

/* =========================
   CELDAS
========================= */

export const FlightCode = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(244, 211, 94, 0.1);
  border: 1px solid rgba(244, 211, 94, 0.18);
  color: #f7de7b;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
`;

export const AirlineText = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f8fafc;
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const OriginText = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #c5d2eb;
`;

export const TimeText = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #eef4ff;
  font-variant-numeric: tabular-nums;
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  max-width: 100%;
  min-height: 34px;
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.24);

  @media (max-width: 520px) {
    gap: 4px;
    padding: 5px 8px;
    font-size: 0.72rem;
  }
`;

const statusStyles = {
  Expected: css`
    color: #9ff0da;
    background: rgba(16, 163, 127, 0.14);
    border: 1px solid rgba(16, 163, 127, 0.24);
  `,
  Delayed: css`
    color: #ffd08b;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.22);
  `,
  Canceled: css`
    color: #ffb4b4;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.22);
  `,
  landed: css`
    color: #e9d5ff;
    background: rgba(168, 85, 247, 0.12);
    border: 1px solid rgba(168, 85, 247, 0.22);
  `,
};

export const StatusBadge = styled(Status)`
  ${({ status }) => statusStyles[status] || ""}
`;

export const EmptyState = styled.div`
  padding: 22px 16px;
  text-align: center;
  color: #b9c7e0;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
`;