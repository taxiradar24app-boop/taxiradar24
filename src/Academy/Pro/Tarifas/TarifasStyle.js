import styled from "styled-components";

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#0a1528"};
  padding: ${({ theme }) => theme.spacing?.lg || "20px"};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* ===================================================== */
/* HERO / INTRO */
/* ===================================================== */

export const HeroCard = styled.section`
  width: 100%;
  padding: 24px 26px;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(7, 18, 38, 0.98) 0%,
    rgba(8, 19, 37, 0.98) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 18px 16px;
    border-radius: 16px;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.28);
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors?.yellow || "#ffc83d"};

  @media (max-width: 768px) {
    font-size: 1.45rem;
  }
`;

export const IntroText = styled.p`
  margin: 0;
  max-width: 920px;
  font-size: 1rem;
  line-height: 1.7;
  color: #d4d7dd;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const TipBox = styled.div`
  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.22);
  border-left: 4px solid #10a37f;
  padding: 18px 20px;
  border-radius: 16px;
  color: #e8fffa;
  line-height: 1.65;
`;

export const MemoryBox = styled.div`
  background: rgba(255, 200, 61, 0.08);
  border: 1px solid rgba(255, 200, 61, 0.2);
  border-left: 4px solid ${({ theme }) => theme.colors?.yellow || "#ffc83d"};
  padding: 18px 20px;
  border-radius: 16px;
  color: #fff5d6;
  line-height: 1.65;
`;

/* ===================================================== */
/* CONTENT SECTIONS */
/* ===================================================== */

export const SectionCard = styled.section`
  width: 100%;
  background: #081325;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 22px 22px 18px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors?.yellow || "#ffc83d"};

  @media (max-width: 768px) {
    font-size: 1.06rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 14px;
  color: #d4d7dd;
`;

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin: 16px 0 0;
`;

/* ===================================================== */
/* LISTS */
/* ===================================================== */

export const List = styled.ul`
  padding-left: 18px;
  margin: 0;
`;

export const ListItem = styled.li`
  font-size: 0.98rem;
  line-height: 1.68;
  margin-bottom: 10px;
  color: #cfd3da;

  strong {
    color: #f4f6fb;
    font-weight: 700;
  }
`;

/* ===================================================== */
/* HIGHLIGHT TABLE-LIKE BOX */
/* ===================================================== */

export const SummaryBox = styled.div`
  display: grid;
  gap: 12px;
`;

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const SummaryLabel = styled.span`
  color: #e5e7eb;
  font-size: 0.98rem;
  line-height: 1.5;
  font-weight: 600;
`;

export const SummaryValue = styled.span`
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  font-size: 0.98rem;
  line-height: 1.5;
  font-weight: 700;
`;

/* ===================================================== */
/* BUTTONS */
/* ===================================================== */

export const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CTAButton = styled.button`
  background: linear-gradient(135deg, #10a37f, #22c55e);
  color: #03251d;
  padding: 14px 22px;
  border-radius: 14px;
  border: none;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: 0.22s ease;
  box-shadow: 0 10px 24px rgba(16, 163, 127, 0.22);

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors?.yellow || "#ffc83d"};
  padding: 14px 22px;
  border-radius: 14px;
  border: 1px solid rgba(255, 200, 61, 0.38);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.22s ease;

  &:hover {
    background: rgba(255, 200, 61, 0.08);
  }
`;

/* ===================================================== */
/* LINKS */
/* ===================================================== */

export const Link = styled.a`
  color: ${({ theme }) => theme.colors?.yellow || "#ffc83d"};
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    opacity: 0.86;
  }
`;