import styled from "styled-components";

/* ======================================================
   PAGE / LAYOUT
====================================================== */

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 32px 20px 72px;
  display: flex;
  justify-content: center;

  background:
    radial-gradient(circle at 18% 18%, rgba(16, 163, 127, 0.08), transparent 34%),
    radial-gradient(circle at 82% 12%, rgba(255, 200, 61, 0.06), transparent 30%),
    #06152b;

  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 22px 14px 56px;
  }
`;

export const SectionHeader = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const SectionTitle = styled.h1`
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.08;
  font-weight: 900;
  color: #f4c44e;
  margin: 0 0 22px;
`;

/* ======================================================
   TOP INFO
====================================================== */

export const AttemptsInfo = styled.div`
  margin-top: 18px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.84);

  strong {
    color: #ffffff;
    font-weight: 900;
  }
`;

export const Timer = styled.div`
  margin-top: 10px;
  font-size: 0.98rem;
  font-weight: 800;
  color: #34d399;
`;

/* ======================================================
   INTRO CARD (VISUAL IGUAL AL SIMULADOR)
====================================================== */

export const IntroCard = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 29, 54, 0.92),
    rgba(8, 21, 43, 0.96)
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 30px;
  padding: 28px 26px 30px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    padding: 22px 16px 24px;
    border-radius: 24px;
  }
`;

export const IntroTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
`;

export const DemoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  background: #f4c44e;
  color: #081321;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.01em;
`;

export const IntroTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  line-height: 1.15;
  font-weight: 900;
  color: #f8fafc;
`;

export const IntroLead = styled.p`
  margin: 14px 0 0;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.84);
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
`;

/* ======================================================
   INTRO GRID / BLOCKS
====================================================== */

export const IntroGrid = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const IntroColumn = styled.div`
  width: 100%;
`;

export const IntroBlock = styled.div`
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.045),
    rgba(255, 255, 255, 0.03)
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 22px 22px 20px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);

  @media (max-width: 768px) {
    padding: 18px 16px;
    border-radius: 20px;
  }
`;

export const IntroBlockTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 1.08rem;
  line-height: 1.3;
  font-weight: 900;
  color: #ffffff;
`;

export const IntroText = styled.p`
  margin: 0 0 14px;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.84);

  strong {
    color: #ffffff;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IntroList = styled.ul`
  margin: 0 0 14px;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.9);
`;

export const IntroListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IntroExamples = styled.div`
  margin-top: 18px;
`;

export const IntroExampleTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 0.98rem;
  line-height: 1.35;
  font-weight: 900;
  color: #f4c44e;
`;

export const IntroHint = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(7, 20, 39, 0.7);
  border: 1px solid rgba(255, 200, 61, 0.14);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.96rem;
  line-height: 1.6;
`;

export const IntroFooter = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
`;

/* ======================================================
   MAIN GRID
====================================================== */

export const MainGrid = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 28px auto 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ExamColumn = styled.div`
  width: 100%;
  min-width: 0;
`;

/* ======================================================
   EXAM CARDS
====================================================== */

export const CalleCard = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 29, 54, 0.92),
    rgba(8, 21, 43, 0.96)
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 20px 18px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  & + & {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 16px 14px;
  }
`;

export const CalleTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 1.04rem;
  line-height: 1.45;
  font-weight: 800;
  color: #ffffff;
`;

export const InputsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const CalleInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 14px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.92);
  color: #081321;
  font-size: 0.98rem;
  font-weight: 700;
  text-align: center;
  outline: none;
  transition: 0.18s ease;

  &::placeholder {
    color: rgba(8, 19, 33, 0.52);
    font-weight: 700;
  }

  &:focus {
    border-color: rgba(16, 163, 127, 0.95);
    box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.18);
  }
`;

export const SubmitButton = styled.button`
  margin-top: 24px;
  width: 100%;
  border: 0;
  border-radius: 18px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #10a37f, #20c997);
  color: #081321;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition: 0.18s ease;
  box-shadow: 0 14px 34px rgba(16, 163, 127, 0.28);

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* ======================================================
   SIDEBAR
====================================================== */

export const Sidebar = styled.aside`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 29, 54, 0.92),
    rgba(8, 21, 43, 0.96)
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 22px 20px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

export const SidebarTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 1.08rem;
  line-height: 1.3;
  font-weight: 900;
  color: #ffffff;
`;

export const SidebarText = styled.p`
  margin: 0 0 14px;
  font-size: 0.96rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.84);

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #ffffff;
  }
`;

/* ======================================================
   RESULTS / LOCK
====================================================== */

export const ResultBox = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 29, 54, 0.92),
    rgba(8, 21, 43, 0.96)
  );
  border: 1px solid rgba(16, 163, 127, 0.28);
  border-radius: 24px;
  padding: 24px 20px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  h3 {
    margin: 0 0 12px;
    font-size: 1.18rem;
    color: #ffffff;
  }

  p {
    margin: 0 0 10px;
    font-size: 0.98rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.88);
  }
`;

export const RetryButton = styled.button`
  margin-top: 10px;
  border: 1px solid rgba(255, 200, 61, 0.32);
  border-radius: 14px;
  padding: 12px 16px;
  background: rgba(255, 200, 61, 0.08);
  color: #f4c44e;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  transition: 0.18s ease;

  &:hover {
    background: rgba(255, 200, 61, 0.14);
    transform: translateY(-1px);
  }
`;

export const LockBox = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 24px auto 0;
  padding: 20px 18px;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 200, 61, 0.08),
    rgba(255, 200, 61, 0.05)
  );
  border: 1px solid rgba(255, 200, 61, 0.22);
  color: #f8e08a;
  text-align: center;
  font-size: 0.98rem;
  line-height: 1.65;
  font-weight: 800;
`;

/* ======================================================
   COMPAT EXPORTS
====================================================== */

export const Page = PageWrapper;
export const Shell = SectionHeader;
export const Content = styled.div`
  width: 100%;
`;

export const Card = IntroCard;
export const Grid = IntroGrid;
export const InfoBox = IntroBlock;
export const InfoTitle = IntroBlockTitle;
export const Notice = IntroHint;
export const StartButton = SubmitButton;
export const Attempts = AttemptsInfo;
export const AttemptInfo = styled.div`
  margin-top: 8px;
  text-align: center;
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.64);
`;