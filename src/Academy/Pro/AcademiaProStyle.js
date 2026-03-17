// src/Academy/Pro/AcademiaProStyle.js
import styled from "styled-components";

const getColor = (theme, path, fallback) => {
  try {
    return path.split(".").reduce((acc, key) => acc?.[key], theme) || fallback;
  } catch {
    return fallback;
  }
};

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  background: ${({ theme }) => theme.blueDeep};
  color: ${({ theme }) => getColor(theme, "colors.white", "#ffffff")};
`;

export const InnerWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  /* EXACTAMENTE como Reglamento / Audios */
  padding: 32px 16px 48px;

  @media (min-width: 768px) {
    padding: 32px 24px 56px;
  }

  @media (min-width: 1024px) {
    padding: 32px 32px 64px;
  }
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
`;

export const TopBarLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  background: rgba(34, 197, 94, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.3);
`;

export const TopTitle = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#dde1e8ff")};
`;

export const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/* ===== GREETING / HERO ===== */

export const GreetingSection = styled.section`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const GreetingText = styled.div`
  display: flex;
  align-items: center;
`;

export const GreetingTitle = styled.h1`
  font-size: clamp(1.5rem, 1.5vw + 0.8rem, 1.7rem);
  font-weight: 600;
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#cbd5f5")};
`;

export const Highlight = styled.span`
  color: ${({ theme }) => getColor(theme, "colors.accent", "#a3e635")};
`;

export const GreetingSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => getColor(theme, "colors.white", "#9ca3af")};
`;

export const GreetingPillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const GreetingPill = styled.span`
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#e5e7eb")};
`;

export const GreetingPillAccent = styled(GreetingPill)`
  border-color: rgba(74, 222, 128, 0.6);
  background: radial-gradient(
    circle at top left,
    rgba(74, 222, 128, 0.22),
    rgba(15, 23, 42, 0.95)
  );
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
`;

export const ActionButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 0.95rem;

  background: radial-gradient(circle at top left, #4ade80, #22c55e, #16a34a);
  color: #022c22;
  box-shadow: 0 0 25px rgba(34, 197, 94, 0.45);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.03);
    box-shadow: 0 0 32px rgba(34, 197, 94, 0.6);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
    box-shadow: 0 0 18px rgba(34, 197, 94, 0.4);
  }
`;

export const GhostButton = styled.button`
  border-radius: 999px;
  padding: 9px 18px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.9);
  color: ${({ theme }) => getColor(theme, "colors.textSecondary", "#e5e7eb")};
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: rgba(30, 64, 175, 0.3);
    border-color: rgba(129, 140, 248, 0.8);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* ===== STATS ===== */

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const StatCard = styled.div`
  background: radial-gradient(
    circle at top left,
    rgba(51, 65, 85, 0.55),
    rgba(15, 23, 42, 0.95)
  );
  border-radius: 18px;
  padding: 14px 16px 12px;
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.8);
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => getColor(theme, "colors.accent", "#a3e635")};
`;

export const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => getColor(theme, "colors.textSecondary", "#e5e7eb")};
`;

export const StatHint = styled.div`
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => getColor(theme, "colors.textMuted", "#9ca3af")};
`;

/* ===== PROGRESS SECTION ===== */

export const ProgressSection = styled.section`
  margin: 20px 0 24px;
  padding: 14px 16px 16px;
  border-radius: 16px;
  background: radial-gradient(
    circle at top left,
    rgba(74, 222, 128, 0.14),
    rgba(15, 23, 42, 0.96)
  );
  border: 1px solid rgba(74, 222, 128, 0.38);
  box-shadow: 0 12px 28px rgba(22, 163, 74, 0.18);

  @media (max-width: 640px) {
    margin: 16px 0 20px;
    padding: 14px 14px 15px;
    border-radius: 14px;
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
`;

export const ProgressText = styled.p`
  font-size: 0.92rem;
  line-height: 1.45;
  max-width: 560px;
  color: ${({ theme }) => getColor(theme, "colors.textSecondary", "#e5e7eb")};

  strong {
    color: ${({ theme }) => getColor(theme, "colors.white", "#ffffff")};
    font-weight: 700;
  }
`;

export const ProgressBarTrack = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.28);
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #22c55e, #a3e635);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.45);
  transition: width 0.3s ease;
`;

/* ===== MODULES GRID ===== */

export const ModulesSection = styled.section`
  margin-top: 8px;
`;

export const SectionHeader = styled.div`
  margin-bottom: 18px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const SectionSubtitle = styled.p`
  margin-top: 4px;
  font-size: 0.9rem;
  max-width: 640px;
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#9ca3af")};
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const ModuleCard = styled.button`
  width: 100%;
  height: 100%; /* 👈 clave para grid uniforme */

  text-align: left;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  padding: 18px 18px 16px;
  border-radius: 18px;

  background: radial-gradient(
    circle at top left,
    rgba(15, 23, 42, 0.9),
    rgba(15, 23, 42, 0.98)
  );

  border: 1.5px solid rgba(30, 64, 175, 0.5);

  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.85);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  /* 👇 esto hace que el contenido se distribuya bien */
  & > *:last-child {
    margin-top: auto;
  }

  &:hover {
    transform: translateY(-4px);

    border-color: rgba(74, 222, 128, 0.8);

    background: radial-gradient(
      circle at top left,
      rgba(74, 222, 128, 0.12),
      rgba(15, 23, 42, 0.98)
    );

    box-shadow: 0 26px 60px rgba(15, 23, 42, 0.95);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
export const ModuleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.45);
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#e5e7eb")};
`;

export const ModuleTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => getColor(theme, "colors.yellow", "#ffffff")};
`;

export const ModuleDescription = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme }) => getColor(theme, "colors.greylight", "#9ca3af")};
`;

export const ModuleFooter = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ModuleCTA = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #4ade80;
`;
