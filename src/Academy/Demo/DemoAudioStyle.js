import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.pro?.blueDeep || "rgba(15, 23, 42, 0.85)"};
  padding: 40px 0;
`;
export const Title = styled.h1`
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.08;
  font-weight: 900;
  color: #f4c44e;
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
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffc83d;
  margin-bottom: 0.6rem;
`;

export const AudioDescription = styled.p`
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 1.2rem;
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
  font-size: 0.8rem;
`;

/* ================= CTA ================= */

export const CTABox = styled.div`
  margin-top: 48px;
  padding: 28px;
  border-radius: 18px;
  background: rgba(16, 163, 127, 0.08);
  border: 1px solid rgba(16, 163, 127, 0.35);
  text-align: center;

  p {
    margin-bottom: 18px;
    color: #d1fae5;
  }
`;

export const CTAButton = styled.button`
  background: #10a37f;
  color: #022c22;
  border: none;
  padding: 12px 22px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #12c29a;
  }
`;
