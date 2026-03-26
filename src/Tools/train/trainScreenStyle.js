import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3.5rem;

  @media (max-width: 768px) {
    padding: 1rem 0.95rem 3rem;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
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
  padding-top: 0.65rem;
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
  margin: 0 0 0.6rem;
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.06;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 780px;
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  line-height: 1.65;
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: 1.25rem;
  margin-top: 2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const panelStyles = `
  background: rgba(10, 22, 40, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 1.4rem;
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.44);
`;

export const MainCard = styled.div`
  ${panelStyles};
  padding: 1.35rem;
`;

export const SideCard = styled.aside`
  ${panelStyles};
  padding: 1.35rem;
`;

export const NotesCard = styled.section`
  ${panelStyles};
  padding: 1.35rem;
  margin-top: 1.25rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.35rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
`;

export const HighlightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1.15rem 1.1rem;
  border-radius: 1.15rem;
  border: 1px solid rgba(0, 245, 255, 0.24);
  background: linear-gradient(
    135deg,
    rgba(18, 42, 88, 0.92),
    rgba(8, 20, 38, 0.96)
  );
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
`;

export const HighlightMeta = styled.div`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#cbd5e1"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.55;
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

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ArrivalTime = styled.div`
  color: #00f5ff;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  min-width: 88px;
`;

export const ArrivalMeta = styled.div`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#cbd5e1"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.5;
  text-align: right;

  @media (max-width: 640px) {
    text-align: left;
  }
`;

export const RouteCard = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(148, 163, 184, 0.12);
`;

export const RouteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
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
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 1.15rem;
  padding: 1rem 0.9rem;
  border-radius: 0.95rem;
  background: rgba(0, 245, 255, 0.04);
  border: 1px solid rgba(0, 245, 255, 0.12);

  @media (max-width: 520px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const RouteStation = styled.span`
  color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  text-transform: uppercase;
`;

export const Arrow = styled.span`
  color: #00f5ff;
  font-size: 1.3rem;
  font-weight: 700;
`;

export const StopsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StopColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.9rem 0.8rem;
  border-radius: 0.95rem;
  background: rgba(7, 17, 31, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.12);
`;

export const StopLabel = styled.div`
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const StopTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;

  span {
    color: ${({ theme }) => theme.colors?.academy?.textMain || "#e6edf7"};
    font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
    line-height: 1.35;
    font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  }
`;

export const NoteItem = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#cbd5e1"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.7;

  & + & {
    margin-top: 0.75rem;
  }

  strong {
    color: #ffffff;
  }
`;

export const EmptyText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors?.academy?.textSoft || "#94a3b8"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  line-height: 1.6;
`;