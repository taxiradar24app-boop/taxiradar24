import styled from "styled-components";
import { Link } from "react-router-dom";

// =========================
// LAYOUT GENERAL
// =========================

export const Page = styled.main`
  background: #efeff5;
  color: #1a1919;
  min-height: 100vh;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 720px; // 🔥 antes 980
  margin: 0 auto;
  padding: 28px 20px 80px;
`;

export const Content = styled.div`
  width: 100%;
`;

// =========================
// BREADCRUMBS
// =========================

export const Breadcrumbs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.35;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const CrumbLink = styled(Link)`
  color: #111111;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const CrumbCurrent = styled.span`
  color: #666666;
`;

export const Separator = styled.span`
  color: #999999;
`;

// =========================
// HERO
// =========================

export const Hero = styled.header`
  margin-bottom: 30px;
`;

export const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: #555555;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0 0 16px;
  color: #000000;
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes.hero});
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1.04;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};

  @media (max-width: 768px) {
    margin-bottom: 14px;
  }
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 760px;
  color: #222222;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

// =========================
// SNIPPET / RESUMEN RÁPIDO
// =========================

export const SnippetBox = styled.div`
  margin-top: 22px;
  padding: 18px;
  border: 1px solid #dddddd;
  border-radius: 16px;
  background: #fafafa;
`;

export const SnippetLabel = styled.p`
  margin: 0 0 8px;
  color: #555555;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const SnippetText = styled.p`
  margin: 0;
  color: #111111;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const SnippetNote = styled.p`
  margin: 12px 0 0;
  color: #555555;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

// =========================
// SECCIONES
// =========================

export const Section = styled.section`
  margin-top: 34px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 14px;
  color: #000000;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const SubTitle = styled.h3`
  margin: 0 0 10px;
  color: #111111;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const Paragraph = styled.p`
  margin: 0 0 16px;
  color: #1d1d1d;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const Strong = styled.strong`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: #000000;
`;

// =========================
// LISTAS
// =========================

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    color: #1d1d1d;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  }
`;

export const NumberList = styled.ol`
  margin: 0;
  padding-left: 22px;

  li {
    margin-bottom: 10px;
    color: #1d1d1d;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  }
`;

// =========================
// TARJETAS / BLOQUES
// =========================

export const Card = styled.div`
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 18px;
  background: #ffffff;
`;

export const SoftCard = styled.div`
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 18px;
  background: #fafafa;
`;

export const Grid = styled.div`
  display: grid;
  gap: 14px;
`;

export const GridTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GridThree = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// =========================
// CTA
// =========================

export const CTABox = styled.section`
  margin-top: 36px;
  padding: 24px;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  background: #f7f7f7;
`;

export const CTATitle = styled.h2`
  margin: 0 0 10px;
  color: #000000;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const CTAParagraph = styled.p`
  margin: 0 0 18px;
  color: #1d1d1d;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  &:hover {
    background: #000000;
  }
`;

export const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid #111111;
  background: #ffffff;
  color: #111111;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  &:hover {
    background: #f5f5f5;
  }
`;

// =========================
// FAQ
// =========================

export const FaqWrap = styled.div`
  margin-top: 10px;
`;

export const FaqItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #ececec;
`;

export const FaqQuestion = styled.h3`
  margin: 0 0 8px;
  color: #111111;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const FaqAnswer = styled.p`
  margin: 0;
  color: #1d1d1d;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

// =========================
// RELACIONADOS
// =========================

export const RelatedSection = styled.section`
  margin-top: 42px;
`;

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const RelatedCard = styled(Link)`
  display: block;
  padding: 18px;
  border: 1px solid #e3e3e3;
  border-radius: 18px;
  background: #ffffff;
  color: #111111;
  text-decoration: none;

  &:hover {
    background: #fafafa;
  }
`;

export const RelatedTitle = styled.h3`
  margin: 0 0 8px;
  color: #111111;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const RelatedText = styled.p`
  margin: 0;
  color: #444444;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

// =========================
// TABLAS SIMPLES SEO
// =========================

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
`;

export const Thead = styled.thead`
  background: #f7f7f7;
`;

export const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
`;

export const Th = styled.th`
  padding: 14px 16px;
  text-align: left;
  color: #111111;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.3;
`;

export const Td = styled.td`
  padding: 14px 16px;
  color: #1d1d1d;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

// =========================
// SEPARADOR
// =========================

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ececec;
  margin: 34px 0 0;
`;

// =========================
// BADGES / ETIQUETAS
// =========================

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid #dddddd;
  background: #f8f8f8;
  color: #444444;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

// =========================
// UTILIDADES
// =========================

export const InlineLink = styled(Link)`
  color: #111111;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const Muted = styled.span`
  color: #666666;
`;

export const Spacer = styled.div`
  height: ${({ size = 16 }) => `${size}px`};
`;