import styled from "styled-components";

/* ================================
   WRAPPER
================================ */

export const PageWrapper = styled.div`
  padding: 40px 32px;
  max-width: 1200px;
  margin: 0 auto;

  background: linear-gradient(
    180deg,
    rgba(15, 29, 54, 0.6),
    rgba(10, 21, 40, 0.6)
  );

  border-radius: 18px;
  color: #e9f1ff;
`;

/* ================================
   HEADER
================================ */

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: linear-gradient(135deg, #58e63d, #10a37f);
  box-shadow: 0 0 20px rgba(88, 230, 61, 0.35);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.3rem;
  font-weight: 800;
  color: #061426;
`;

export const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

export const UserEmail = styled.div`
  font-size: 0.8rem;
  opacity: 0.65;
`;

export const PlanBadge = styled.div`
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;

  background: ${({ $pro }) =>
    $pro
      ? "linear-gradient(135deg,#58e63d,#10a37f)"
      : "rgba(255,255,255,0.08)"};

  color: ${({ $pro }) => ($pro ? "#061426" : "#c7d3ee")};
`;

export const DatesRow = styled.div`
  margin-bottom: 20px;
  font-size: 0.8rem;
  opacity: 0.6;
  display: flex;
  gap: 16px;
`;

/* ================================
   SECTIONS
================================ */

export const Section = styled.section`
  margin-top: 28px;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 14px;
  font-size: 1rem;
  font-weight: 700;
`;

/* ================================
   GENERAL PROGRESS CARD
================================ */

export const GeneralProgressCard = styled.div`
  padding: 22px;
  border-radius: 20px;

  background: linear-gradient(
    180deg,
    rgba(88, 230, 61, 0.1),
    rgba(16, 163, 127, 0.08)
  );

  border: 1px solid rgba(88, 230, 61, 0.25);
`;

export const GeneralProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

export const GeneralProgressTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

export const GeneralProgressSub = styled.div`
  font-size: 0.85rem;
  opacity: 0.75;
  margin-top: 6px;
`;

export const GeneralProgressValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  opacity: 0.9;
`;

/* ================================
   PROGRESS BAR
================================ */

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  margin-top: 16px;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #58e63d, #10a37f);
  transition: width 0.35s ease;
`;

/* ================================
   MINI STATS
================================ */

export const MiniStatsRow = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

export const MiniStat = styled.div`
  flex: 1;
  min-width: 120px;
`;

export const MiniStatLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.6;
  margin-bottom: 4px;
`;

export const MiniStatValue = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
`;

/* ================================
   CARDS GRID
================================ */

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

export const UpgradeHint = styled.div`
  margin-top: 16px;
  font-size: 0.85rem;
  opacity: 0.85;
`;