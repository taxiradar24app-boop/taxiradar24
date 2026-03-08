import styled from "styled-components";

/* ================================
   WRAPPER
================================ */

export const PageWrapper = styled.div`
  padding: 28px 24px;
  max-width: 1100px;
  margin: 0 auto;

  background: linear-gradient(
    180deg,
    rgba(15, 29, 54, 0.55),
    rgba(10, 21, 40, 0.55)
  );

  border-radius: 16px;
  color: #e9f1ff;

  @media (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 14px;
  }
`;

/* ================================
   HEADER
================================ */

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  gap: 14px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;

  background: linear-gradient(135deg, #58e63d, #10a37f);
  box-shadow: 0 0 14px rgba(88, 230, 61, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 800;
  color: #061426;
`;

export const UserName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const UserEmail = styled.div`
  font-size: 0.78rem;
  opacity: 0.65;
  margin-top: 2px;
`;

export const PlanBadge = styled.div`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05em;

  background: ${({ $pro }) =>
    $pro
      ? "linear-gradient(135deg,#58e63d,#10a37f)"
      : "rgba(255,255,255,0.08)"};

  color: ${({ $pro }) => ($pro ? "#061426" : "#c7d3ee")};
`;

export const DatesRow = styled.div`
  margin-bottom: 16px;
  font-size: 0.78rem;
  opacity: 0.6;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

/* ================================
   SECTIONS
================================ */

export const Section = styled.section`
  margin-top: 22px;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.2;
`;

/* ================================
   GENERAL PROGRESS CARD
================================ */

export const GeneralProgressCard = styled.div`
  padding: 16px 18px;
  border-radius: 16px;

  background: linear-gradient(
    180deg,
    rgba(88, 230, 61, 0.08),
    rgba(16, 163, 127, 0.06)
  );

  border: 1px solid rgba(88, 230, 61, 0.22);
`;

export const GeneralProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const GeneralProgressTitle = styled.div`
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.35;
`;

export const GeneralProgressSub = styled.div`
  font-size: 0.82rem;
  opacity: 0.72;
  margin-top: 4px;
  line-height: 1.45;
  max-width: 540px;
`;

export const GeneralProgressValue = styled.div`
  font-size: 1.45rem;
  font-weight: 800;
  opacity: 0.92;
  line-height: 1;
`;

/* ================================
   PROGRESS BAR
================================ */

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  margin-top: 12px;
  overflow: hidden;
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
  margin-top: 16px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

export const MiniStat = styled.div`
  flex: 1;
  min-width: 110px;
`;

export const MiniStatLabel = styled.div`
  font-size: 0.72rem;
  opacity: 0.6;
  margin-bottom: 3px;
`;

export const MiniStatValue = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

/* ================================
   MODULE PROGRESS PANEL
================================ */

export const ModuleProgressPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ModuleProgressRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) auto minmax(180px, 1fr);
  align-items: center;
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ModuleProgressInfo = styled.div`
  min-width: 0;
`;

export const ModuleProgressName = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #f3f7ff;
`;

export const ModuleProgressMeta = styled.div`
  font-size: 0.78rem;
  opacity: 0.68;
  margin-top: 2px;
  line-height: 1.35;
`;

export const ModuleProgressPercent = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: #b8ffd2;
  min-width: 46px;
  text-align: right;

  @media (max-width: 720px) {
    text-align: left;
    min-width: auto;
  }
`;

export const ModuleProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const ModuleProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #58e63d, #10a37f);
  transition: width 0.35s ease;
`;

/* ================================
   CARDS GRID
================================ */

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

export const UpgradeHint = styled.div`
  margin-top: 14px;
  font-size: 0.84rem;
  opacity: 0.85;
  // line-height: 1.45;
`;