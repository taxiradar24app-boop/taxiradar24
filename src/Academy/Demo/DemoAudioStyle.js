import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.pro?.blueDeep || "rgba(15, 23, 42, 0.85)"};
  padding: 40px 0;
`;

export const Title = styled.h1`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.04;
  font-weight: ${({ theme }) => theme.fontWeights?.heavy || 800};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tighter || "-0.03em"};
  color: #FFC83D;
  margin: 0 0 22px;
`;

export const PageContainer = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  color: #f1f5f9;

  @media (max-width: 950px) {
    padding: 20px 16px;
  }
`;

export const IntroText = styled.p`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  color: #cbd5e1;
  margin: 0 0 2.2rem;
  max-width: 760px;
`;

/* ================= GRID ================= */

export const AudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
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
  opacity: ${({ locked }) => (locked ? 0.55 : 1)};
  pointer-events: ${({ locked }) => (locked ? "none" : "auto")};
`;

export const AudioTitle = styled.h3`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: ${({ theme }) => theme.lineHeights?.title || 1.28};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};
  color: #ffc83d;
  margin: 0 0 0.6rem;
`;

export const AudioDescription = styled.p`
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  color: #cbd5e1;
  margin: 0 0 1.2rem;
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  border-radius: 12px;
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

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

  &:hover {
    background: #12c29a;
  }
`;