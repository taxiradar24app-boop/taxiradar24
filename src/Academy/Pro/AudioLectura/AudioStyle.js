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


/* ================= FRAME (MISMO QUE REGLAMENTO) ================= */

export const PageContainer = styled.div`
background: #081325;
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;

  padding: 24px 40px;
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
  align-items: stretch;
`;

/* ================= CARD ================= */

export const AudioCard = styled.div`
  background: linear-gradient(180deg, #0f1b2d, #0a1528);
  padding: 1.8rem;
  border-radius: 20px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  }
`;

export const AudioTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffc83d;
  margin-bottom: 0.6rem;
  line-height: 1.35;
`;

export const AudioDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #cbd5e1;
  margin-bottom: 1.2rem;
  flex-grow: 1;
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 0.6rem;
  border-radius: 12px;
  outline: none;

  &::-webkit-media-controls-panel {
    background-color: #ac9e9eff;
  }

  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-timeline {
    filter: contrast(1.2);
  }
`;
