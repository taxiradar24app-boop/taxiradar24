import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(16, 163, 127, 0);
  }
  50% {
    box-shadow: 0 0 24px rgba(16, 163, 127, 0.18);
  }
  100% {
    box-shadow: 0 0 0 rgba(16, 163, 127, 0);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(220%);
  }
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: clamp(24px, 4vw, 40px) 18px 56px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at top, rgba(16, 163, 127, 0.10), transparent 28%),
    linear-gradient(180deg, #061226 0%, #07152b 100%);
  color: #ffffff;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 760px;
  animation: ${fadeUp} 0.45s ease;
`;

const HeroCard = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(12, 19, 35, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: clamp(24px, 4vw, 34px);
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right, rgba(16, 163, 127, 0.12), transparent 28%),
      radial-gradient(circle at left center, rgba(255, 200, 61, 0.08), transparent 24%);
    pointer-events: none;
  }
`;

const TopBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(16, 163, 127, 0.14);
  border: 1px solid rgba(16, 163, 127, 0.22);
  color: #b8f3e0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  margin: 18px 0 10px;
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes.hero});
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1.04;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
`;

const HeroSubtitle = styled.p`
  max-width: 62ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

const ProgressBlock = styled.div`
  margin-top: 24px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProgressLabel = styled.div`
  color: rgba(255, 255, 255, 0.92);
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

const ProgressMeta = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.35;
`;

const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
`;

const ProgressFill = styled.div`
  position: relative;
  height: 100%;
  width: ${({ $value = 0 }) => `${$value}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, #10a37f 0%, #34d399 55%, #84cc16 100%);
  transition: width 0.45s ease;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 38%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.18) 50%,
      transparent 100%
    );
    animation: ${shimmer} 2.2s linear infinite;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  background: rgba(15, 23, 42, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 26px);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

const SectionText = styled.p`
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.78);
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

const StepsList = styled.div`
  display: grid;
  gap: 14px;
`;

const StepCard = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 18px;
  background: ${({ $done }) =>
    $done
      ? "linear-gradient(180deg, rgba(16, 163, 127, 0.12) 0%, rgba(16, 163, 127, 0.08) 100%)"
      : "rgba(255, 255, 255, 0.04)"};
  border: 1px solid
    ${({ $done }) =>
      $done ? "rgba(16, 163, 127, 0.22)" : "rgba(255, 255, 255, 0.05)"};
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ $done }) =>
      $done ? "rgba(16, 163, 127, 0.30)" : "rgba(255, 255, 255, 0.10)"};
  }
`;

const StepIcon = styled.div`
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: ${({ $done }) =>
    $done ? "rgba(16, 163, 127, 0.18)" : "rgba(255, 255, 255, 0.06)"};
  color: ${({ $done }) => ($done ? "#9ef0d7" : "rgba(255,255,255,0.72)")};
  font-size: 1rem;
  font-weight: 800;
`;

const StepContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StepTitle = styled.div`
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

const StepDescription = styled.div`
  color: rgba(255, 255, 255, 0.76);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

const StepStatus = styled.div`
  margin-top: 8px;
  color: ${({ $done }) => ($done ? "#8ff0cf" : "#fbbf24")};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const Button = styled.button`
  min-height: 46px;
  padding: 0.9rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  transition: transform 0.18s ease, filter 0.18s ease, opacity 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.04);
  }

  &:disabled {
    opacity: 0.62;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #10a37f 0%, #34d399 100%);
  color: #05261f;
  box-shadow:
    0 0 14px rgba(34, 197, 94, 0.16),
    0 10px 22px rgba(16, 163, 127, 0.24);
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const GhostNote = styled.div`
  margin-top: 12px;
  color: ${({ $error }) => ($error ? "#fca5a5" : "rgba(255,255,255,0.72)")};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

const SideCard = styled.div`
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SideCardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

const SideCardText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

const ReadyPanel = styled(Panel)`
  animation: ${pulseGlow} 2.4s ease-in-out infinite;
`;

const ReadyBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(16, 163, 127, 0.14);
  border: 1px solid rgba(16, 163, 127, 0.22);
  color: #b8f3e0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ReadyTitle = styled.h2`
  margin: 16px 0 10px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

const ReadyText = styled.p`
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.82);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

const EnterButton = styled(PrimaryButton)`
  width: 100%;
  min-height: 54px;
`;

const Countdown = styled.div`
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.68);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.45;
`;

const LoadingWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at top, rgba(16, 163, 127, 0.10), transparent 28%),
    linear-gradient(180deg, #061226 0%, #07152b 100%);
  color: #fff;
`;

const LoadingCard = styled.div`
  width: min(92vw, 520px);
  padding: 28px;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
`;

const LoadingTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
`;

const LoadingText = styled.div`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.72);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;
