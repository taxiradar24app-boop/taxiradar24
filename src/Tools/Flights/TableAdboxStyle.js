import styled from "styled-components";

/* 🎯 Contenedor general */
export const TableContainer = styled.section`
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

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 14px;

  @media (max-width: 640px) {
    margin-bottom: 12px;
  }
`;

export const BackSlot = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid rgba(163, 230, 53, 0.16);
  border-radius: 999px;
  background: rgba(10, 20, 44, 0.72);
  color: #e8eef9;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(163, 230, 53, 0.34);
    background: rgba(12, 24, 52, 0.9);
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(163, 230, 53, 0.06);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    min-height: 40px;
    padding: 9px 12px;
    font-size: 0.88rem;
  }
`;

export const BackIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(163, 230, 53, 0.12);
  color: #c9f36b;
  font-size: 0.95rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const BackText = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
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

export const TableTitle = styled.h3`
  margin: 0;
  color: #f8fafc;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.75rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: ${({ theme }) => theme.lineHeights?.heading || 1.22};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};

  span {
    color: #a3e635;
    font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  }

  @media (max-width: 768px) {
    font-size: 1.45rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

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

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const UpdatePill = styled.div`
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

export const ErrorText = styled.p`
  margin: 0 0 14px 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.22);
  color: #ffb4b4;
  text-align: center;

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.45;
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(8, 18, 42, 0.75);
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 840px;
  border-collapse: collapse;
  background: transparent;

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: rgba(15, 27, 58, 0.98);
    color: #8fb3ff;
    text-align: left;
    padding: 14px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
    font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
    line-height: 1.2;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 14px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: #e8eef9;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;

    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
    font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
    line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
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
    padding-left: 16px;
  }

  td:last-child,
  th:last-child {
    padding-right: 16px;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 12px 12px;
    }
  }
`;

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
  color: #f8fafc;
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const OriginText = styled.span`
  color: #c5d2eb;
`;

export const TimeText = styled.span`
  color: #eef4ff;
  font-variant-numeric: tabular-nums;
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  ${({ status }) => {
    if (status === "Expected") {
      return `
        background: rgba(16, 163, 127, 0.14);
        border: 1px solid rgba(16, 163, 127, 0.26);
        color: #9ff0da;
      `;
    }

    if (status === "Delayed") {
      return `
        background: rgba(245, 158, 11, 0.14);
        border: 1px solid rgba(245, 158, 11, 0.26);
        color: #ffd18a;
      `;
    }

    if (status === "Canceled") {
      return `
        background: rgba(239, 68, 68, 0.14);
        border: 1px solid rgba(239, 68, 68, 0.24);
        color: #ffb0b0;
      `;
    }

    if (status === "landed") {
      return `
        background: rgba(139, 92, 246, 0.14);
        border: 1px solid rgba(139, 92, 246, 0.24);
        color: #d8c0ff;
      `;
    }

    return `
      background: rgba(148, 163, 184, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.24);
      color: #d8e0f0;
    `;
  }}
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