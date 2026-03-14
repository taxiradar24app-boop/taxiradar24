import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px 28px;
  max-width: 1040px;
  margin: 0 auto;
  color: #e9f1ff;

  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c6ff, #10a37f);
  box-shadow: 0 0 18px rgba(16, 163, 127, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};

  color: #071425;
`;

export const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.72;
  margin-top: 2px;
`;

export const DatesRow = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.6;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

export const PlanBadge = styled.div`
  padding: 7px 14px;
  border-radius: 999px;

  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: 0.05em;

  background: ${({ $pro }) =>
    $pro ? "rgba(88,230,61,0.16)" : "rgba(255,255,255,0.10)"};

  border: 1px solid
    ${({ $pro }) => ($pro ? "rgba(88,230,61,0.22)" : "rgba(255,255,255,0.10)")};

  color: ${({ $pro }) => ($pro ? "#58e63d" : "#c7d3ee")};
`;

export const Section = styled.section`
  margin-top: 20px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px 0;

  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const SectionSub = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.68;
  margin-bottom: 14px;
`;

export const SettingsCard = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr auto;
  gap: 16px;
  padding: 16px 18px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 10px;
    align-items: flex-start;
  }
`;

export const RowLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.9;
`;

export const RowValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.78;
`;

export const RowValueStrong = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const RowHint = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.6;
  margin-top: 2px;
`;

export const RowActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`;

export const Button = styled.button`
  padding: 9px 13px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #e9f1ff;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(16, 163, 127, 0.32);
  }
`;

export const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #58e63d, #10a37f);
  color: #071425;
  border-color: rgba(88, 230, 61, 0.45);
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;

  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: 0.03em;

  background: ${({ $ok }) =>
    $ok ? "rgba(88,230,61,0.14)" : "rgba(255,255,255,0.08)"};

  border: 1px solid
    ${({ $ok }) => ($ok ? "rgba(88,230,61,0.22)" : "rgba(255,255,255,0.10)")};

  color: ${({ $ok }) => ($ok ? "#58e63d" : "#c7d3ee")};
`;

/* ======================================================
   ✅ LEGACY exports for UserProgressCard (NO romper nada)
====================================================== */

export const Card = styled.div`
  position: relative;
  padding: 22px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const CardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.75;
  margin-bottom: 8px;
`;

export const CardValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1.1;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin-bottom: 6px;
`;

export const CardSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.65;
  margin-bottom: 6px;
`;

export const CardMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  opacity: 0.55;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(6, 20, 38, 0.86);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
  color: #58e63d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;