import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3.5rem;
  box-sizing: border-box;
  overflow-x: clip;

  @media (max-width: 768px) {
    padding: 0.9rem 0.85rem 2.5rem;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.35rem;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex?.sticky || 100};
  background: rgba(7, 17, 31, 0.84);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.4rem 0;
`;

export const HeroContent = styled.div`
  padding-top: 0.75rem;
  max-width: 860px;
`;

export const HeroEyebrow = styled.div`
  color: #00f5ff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.55rem;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const HeroTitle = styled.h1`
  margin: 0 0 0.65rem;
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: clamp(1.95rem, 5vw, 3rem);
  line-height: 1.08;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};

  @media (max-width: 768px) {
    font-size: clamp(1.9rem, 8vw, 2.7rem);
  }
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 780px;
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.02rem;
    line-height: 1.58;
  }
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.1rem;
  margin-top: 1.7rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const panelStyles = `
  background: rgba(10, 22, 40, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 1.35rem;
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.44);
`;

export const MainCard = styled.div`
  ${panelStyles};
  padding: 1.15rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 1.2rem;
  }
`;

export const SideCard = styled.aside`
  ${panelStyles};
  padding: 1.15rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 0.95rem;
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.35rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.85rem;
  }
`;

export const HighlightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
  padding: 1rem;
  border-radius: 1.05rem;
  border: 1px solid rgba(0, 245, 255, 0.24);
  background: linear-gradient(
    135deg,
    rgba(18, 42, 88, 0.92),
    rgba(8, 20, 38, 0.96)
  );
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.95rem;
    border-radius: 1rem;
  }
`;

export const HighlightLabel = styled.div`
  color: #7dd3fc;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.35rem;
`;

export const HighlightTime = styled.div`
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  margin-bottom: 0.35rem;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 10vw, 2.9rem);
  }
`;

export const HighlightMeta = styled.div`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#cbd5e1"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.98rem;
  }
`;

export const ArrivalsList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

export const ArrivalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.95rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(148, 163, 184, 0.12);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.9rem 0.95rem;
    gap: 0.55rem;
  }
`;

export const ArrivalTime = styled.div`
  color: #00f5ff;
  font-size: 1.55rem;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  min-width: 88px;

  @media (max-width: 640px) {
    min-width: 0;
    font-size: 1.9rem;
    line-height: 1;
  }
`;

export const ArrivalMeta = styled.div`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#cbd5e1"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.5;
  text-align: right;

  strong {
    color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
    font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  }

  @media (max-width: 640px) {
    text-align: left;
    width: 100%;
    font-size: 0.98rem;
  }
`;

export const RouteCard = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(148, 163, 184, 0.12);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.9rem;
  }
`;

export const RouteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
`;

export const RouteLabel = styled.span`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const RouteLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: 1rem;
  padding: 0.9rem 0.8rem;
  border-radius: 0.95rem;
  background: rgba(0, 245, 255, 0.04);
  border: 1px solid rgba(0, 245, 255, 0.12);

  @media (max-width: 520px) {
    flex-wrap: wrap;
    gap: 0.35rem;
  }
`;

export const RouteStation = styled.span`
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  text-transform: uppercase;

  @media (max-width: 520px) {
    font-size: 0.95rem;
  }
`;

export const Arrow = styled.span`
  color: #00f5ff;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const TableWrap = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 0.95rem;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 980px) {
    margin-top: 0.25rem;
  }
`;

export const BoatsTable = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  border-radius: 0.95rem;
  background: rgba(7, 17, 31, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.12);

  thead th {
    text-align: left;
    padding: 0.9rem 0.85rem;
    color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
    font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
    white-space: nowrap;
  }

  tbody td {
    padding: 0.9rem 0.85rem;
    color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
    font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
    border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    white-space: nowrap;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 980px) {
    min-width: 500px;

    thead th,
    tbody td {
      padding: 0.75rem 0.7rem;
    }
  }

  @media (max-width: 640px) {
    min-width: 460px;
  }
`;

export const EmptyText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.6;
`;