import styled from "styled-components";

/* ======================================================
   PAGE / LAYOUT
====================================================== */

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 32px 20px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background:
    radial-gradient(
      circle at 18% 18%,
      rgba(16, 163, 127, 0.08),
      transparent 34%
    ),
    radial-gradient(
      circle at 82% 12%,
      rgba(255, 200, 61, 0.06),
      transparent 30%
    ),
    #06152b;

  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 22px 14px 56px;
  }
`;

export const SectionHeader = styled.div`
  width: 100%;
  max-width: 980px;
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
   INTRO CARD
====================================================== */

export const IntroCard = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;

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
   INTRO GRID
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
  margin: 0 0 16px;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.88);
`;

export const IntroListItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.55;
  font-size: 0.97rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IntroExamples = styled.div`
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const IntroExampleTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 0.96rem;
  font-weight: 900;
  color: #f4c44e;
`;

export const IntroHint = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(16, 163, 127, 0.08);
  border: 1px solid rgba(16, 163, 127, 0.18);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.96rem;
  line-height: 1.6;
`;

export const IntroFooter = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

/* ======================================================
   MAIN GRID
====================================================== */

export const MainGrid = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 28px auto 0;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
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
  max-width: 480px; /* ✅ IGUAL QUE PRO */
  box-sizing: border-box;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );

  border-radius: 18px;
  padding: 18px 20px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);

  @media (max-width: 420px) {
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
  width: 100%; /* ← CLAVE */
  display: flex;
  justify-content: center; /* ← CLAVE */
  gap: 0.6rem;
  box-sizing: border-box;

  @media (max-width: 420px) {
    gap: 0.5rem;
  }
`;

export const CalleInput = styled.input`
  box-sizing: border-box;

  width: 100%;
  max-width: 140px; /* desktop */

  padding: 0.75rem;
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;

  background: #d3d0d0;
  color: #081325;
  border: 2px solid #10a37f;

  &:focus {
    border-color: #ffc83d;
    box-shadow: 0 0 0 3px rgba(255, 200, 61, 0.35);
    outline: none;
  }

  /* 📱 MOBILE */
  @media (max-width: 420px) {
    max-width: 120px; /* ← NO SE SALE JAMÁS */
    padding: 0.6rem;
    font-size: 0.95rem;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #10a37f, #0f8a6b);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
  box-shadow: 0 14px 30px rgba(16, 163, 127, 0.24);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(16, 163, 127, 0.3);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

/* ======================================================
   SIDEBAR
====================================================== */

export const Sidebar = styled.aside`
  width: 100%;
  position: sticky;
  top: 90px;
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

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SidebarTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 1.02rem;
  font-weight: 900;
  color: #f4c44e;
`;

export const SidebarText = styled.p`
  margin: 0 0 14px;
  font-size: 0.96rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.84);

  strong {
    color: #ffffff;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

/* ======================================================
   RESULT / LOCK
====================================================== */

export const ResultBox = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 29, 54, 0.92),
    rgba(8, 21, 43, 0.96)
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 24px 20px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  h3 {
    margin: 0 0 14px;
    color: #ffffff;
    font-size: 1.15rem;
    font-weight: 900;
  }

  p {
    margin: 0 0 10px;
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.6;
  }
`;

export const RetryButton = styled.button`
  margin-top: 14px;
  padding: 14px 18px;
  border: none;
  border-radius: 14px;
  background: #f4c44e;
  color: #081321;
  font-size: 0.98rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(244, 196, 78, 0.22);
  }
`;

export const LockBox = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 28px auto 0;
  padding: 22px 20px;
  border-radius: 22px;
  background: linear-gradient(
    180deg,
    rgba(52, 11, 11, 0.82),
    rgba(36, 10, 10, 0.9)
  );
  border: 1px solid rgba(255, 107, 107, 0.2);
  color: #ffe2e2;
  text-align: center;
  line-height: 1.7;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);

  strong {
    color: #ffffff;
  }
`;
