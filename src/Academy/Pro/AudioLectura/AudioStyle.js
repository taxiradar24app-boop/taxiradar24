import styled, { css } from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#0a1528"};
  padding: ${({ theme }) => theme.spacing?.lg || "24px"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 24px 40px;
  color: #f1f5f9;
  background: #081325;

  @media (max-width: 950px) {
    padding: 20px 16px;
  }
`;

export const PageTitle = styled.h1`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.04;
  font-weight: ${({ theme }) => theme.fontWeights?.heavy || 800};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tighter || "-0.03em"};
  color: #ffc83d;
  margin: 0 0 18px;
`;

export const IntroText = styled.p`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  color: #cbd5e1;
  margin: 0 0 2rem;
  max-width: 860px;
`;

/* ================= RATE ================= */

export const RateBar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
`;

export const RateLabel = styled.span`
  color: #cbd5e1;
  font-weight: 600;
`;

export const RateButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 650;
  transition: 0.2s ease;

  ${({ active }) =>
    active &&
    css`
      background: rgba(255, 200, 61, 0.18);
      border-color: rgba(255, 200, 61, 0.38);
      color: #ffc83d;
    `}

  &:hover {
    transform: translateY(-1px);
  }
`;

/* ================= GRID ================= */

export const AudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  align-items: stretch;
`;

/* ================= CARD ================= */

export const AudioCard = styled.div`
  position: relative;
  background: linear-gradient(180deg, #0f1b2d, #0a1528);
  padding: 1.8rem;
  border-radius: 20px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  opacity: ${({ locked }) => (locked ? 0.58 : 1)};
  pointer-events: ${({ locked }) => (locked ? "none" : "auto")};
  min-height: 230px;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  }
`;

export const AudioTitle = styled.h3`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 700};
  line-height: 1.35;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};
  color: #ffc83d;
  margin: 0 0 0.65rem;
`;

export const AudioDescription = styled.p`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.6};
  color: #cbd5e1;
  margin: 0 0 1rem;
  flex-grow: 1;
`;

export const AudioMeta = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  color: #9fb0c7;
  margin: 0 0 0.85rem;

  strong {
    color: #ffc83d;
  }
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 0.25rem;
  border-radius: 12px;
  outline: none;

  &::-webkit-media-controls-panel {
    background-color: #e7e7e7;
  }

  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-timeline {
    filter: contrast(1.08);
  }
`;

/* ================= LOCK ================= */

export const LockedOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
`;

export const LockedBadge = styled.div`
  position: absolute;
  bottom: 18px;
  right: 18px;
  background: rgba(16, 163, 127, 0.15);
  border: 1px solid rgba(16, 163, 127, 0.4);
  color: #7ef0c8;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 600};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

/* ================= STATUS ================= */

export const StatusText = styled.p`
  font-size: 0.85rem;
  line-height: 1.45;
  margin: 0 0 10px;
  color: ${({ error }) => (error ? "#ff6b6b" : "#cbd5e1")};
`;

export const ManualLoadButton = styled.button`
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 650;
  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

/* ================= CTA ================= */

export const CTABox = styled.div`
  margin-top: 48px;
  padding: 28px;
  border-radius: 18px;
  background: rgba(16, 163, 127, 0.08);
  border: 1px solid rgba(16, 163, 127, 0.35);
  text-align: center;
`;

export const CTAText = styled.p`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  color: #d1fae5;
  margin: 0 0 18px;

  strong {
    font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  }
`;

export const CTAButton = styled.button`
  background: #10a37f;
  color: #022c22;
  border: none;
  padding: 12px 22px;
  border-radius: 999px;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #12c29a;
  }
`;