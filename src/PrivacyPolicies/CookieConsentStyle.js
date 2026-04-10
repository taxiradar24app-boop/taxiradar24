// src/PrivacyPolicies/CookieConsentStyle.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background:
    linear-gradient(180deg, rgba(4, 10, 24, 0.08) 0%, rgba(4, 10, 24, 0.28) 100%),
    rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  pointer-events: none;

  @media (max-width: 767px) {
    align-items: flex-end;
    padding:
      0.75rem
      0.75rem
      calc(env(safe-area-inset-bottom, 0px) + 0.75rem);
  }

  @media (min-width: 768px) {
    align-items: flex-end;
    padding: 1.1rem 1.25rem 1.1rem;
  }
`;

export const Modal = styled.div`
  pointer-events: auto;
  width: 100%;
  max-width: 1040px;
  color: #f5f7fb;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top left, rgba(0, 168, 243, 0.16), transparent 32%),
    radial-gradient(circle at top right, rgba(16, 163, 127, 0.1), transparent 24%),
    linear-gradient(180deg, rgba(10, 21, 40, 0.985) 0%, rgba(9, 18, 34, 0.985) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);

  @media (max-width: 767px) {
    max-height: calc(100dvh - env(safe-area-inset-bottom, 0px) - 1rem);
    border-radius: 24px;
  }

  @media (min-width: 768px) {
    max-height: min(82dvh, 760px);
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  flex-shrink: 0;

  @media (max-width: 767px) {
    padding: 0.9rem;
  }

  @media (min-width: 768px) {
    padding: 1rem 1rem 0.9rem;
  }
`;

export const SummaryBar = styled.div`
  flex: 1;
  border-radius: 24px;
  padding: 0.95rem 1rem;
  background: rgba(20, 44, 82, 0.72);
  border: 1px solid rgba(0, 168, 243, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

export const SummaryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const SummaryIcon = styled.span`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(0, 168, 243, 0.22),
    rgba(16, 163, 127, 0.12)
  );
  color: #d9f6ff;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const SummaryTextWrap = styled.div`
  min-width: 0;
`;

export const SummaryTitle = styled.div`
  color: #ffffff;
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.15;

  @media (max-width: 767px) {
    font-size: 0.96rem;
  }
`;

export const SummaryText = styled.div`
  margin-top: 0.22rem;
  color: rgba(232, 237, 245, 0.74);
  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

export const SummaryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const SummaryButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 16px;
  min-height: 44px;
  padding: 0.78rem 0.95rem;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 700;
  font-size: 0.92rem;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.11);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const SummaryConfigButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 16px;
  min-height: 44px;
  padding: 0.78rem 0.95rem;
  background: linear-gradient(180deg, #173c64 0%, #113256 100%);
  color: #ffffff;
  border: 1px solid rgba(75, 166, 255, 0.16);
  font-weight: 700;
  font-size: 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const SummaryDetailButton = SummaryConfigButton;

export const DetailChevron = styled.span`
  font-size: 1rem;
  line-height: 1;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const CloseGhost = styled.button`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.15rem;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(244, 211, 94, 0.18);
  }
`;

export const Content = styled.div`
  padding: 0 1rem 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 0 0.9rem 0.9rem;
  }

  @media (min-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

export const Hero = styled.div`
  padding: 0.1rem 0 0.9rem;
`;

export const Title = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.02em;
  color: #ffffff;

  @media (max-width: 767px) {
    font-size: 1.18rem;
    line-height: 1.18;
  }

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  color: rgba(232, 237, 245, 0.84);
  font-size: 0.96rem;
  line-height: 1.6;
  max-width: 980px;

  @media (max-width: 767px) {
    font-size: 0.92rem;
    line-height: 1.58;
  }
`;

export const Highlight = styled.span`
  color: #f4d35e;
  font-weight: 700;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  margin-top: 0.9rem;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
    align-items: start;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Card = styled.div`
  border-radius: 22px;
  padding: 0.95rem;
  background: rgba(12, 25, 47, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);

  @media (max-width: 767px) {
    border-radius: 20px;
    padding: 0.9rem;
  }

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

export const CardTitle = styled.h4`
  margin: 0 0 0.32rem;
  font-size: 0.98rem;
  font-weight: 800;
  color: #ffffff;
`;

export const CardText = styled.p`
  margin: 0;
  color: rgba(232, 237, 245, 0.76);
  line-height: 1.58;
  font-size: 0.92rem;
`;

export const CategoryList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  margin-top: 0.85rem;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.88rem 0.95rem;
  border-radius: 16px;
  background: rgba(7, 18, 36, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 767px) {
    padding: 0.85rem;
  }
`;

export const CategoryInfo = styled.div`
  min-width: 0;
`;

export const CategoryName = styled.div`
  font-size: 0.94rem;
  font-weight: 700;
  color: #ffffff;
`;

export const CategoryDesc = styled.div`
  margin-top: 0.18rem;
  font-size: 0.84rem;
  color: rgba(232, 237, 245, 0.66);
  line-height: 1.42;
`;

export const AlwaysOn = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.34rem 0.66rem;
  background: rgba(16, 163, 127, 0.16);
  border: 1px solid rgba(16, 163, 127, 0.24);
  color: #c8f7eb;
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
`;

export const Toggle = styled.button`
  position: relative;
  width: 54px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, #00a8f3 0%, #1081b8 100%)"
      : "rgba(255,255,255,0.14)"};
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.14);
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $active }) => ($active ? "27px" : "3px")};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
  }
`;

export const SectionTitle = styled.div`
  margin: 0 0 0.5rem;
  font-size: 0.94rem;
  font-weight: 800;
  color: #ffffff;
`;

export const LegalAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const LegalItem = styled.div`
  border-radius: 16px;
  background: rgba(7, 18, 36, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.07);
  overflow: hidden;
`;

export const LegalHeader = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  text-align: left;
  padding: 0.92rem;
  cursor: pointer;
`;

export const LegalHeaderLeft = styled.div`
  min-width: 0;
`;

export const LegalHeaderTitle = styled.div`
  font-size: 0.93rem;
  font-weight: 800;
  color: #ffffff;
`;

export const LegalHeaderSub = styled.div`
  margin-top: 0.16rem;
  font-size: 0.82rem;
  color: rgba(232, 237, 245, 0.62);
  line-height: 1.42;
`;

export const Plus = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  width: 22px;
  min-width: 22px;
  text-align: center;
  color: ${({ $open }) => ($open ? "#f4d35e" : "rgba(255,255,255,0.82)")};
  flex-shrink: 0;
`;

export const LegalBody = styled.div`
  padding: 0 0.92rem 0.92rem;
  color: rgba(232, 237, 245, 0.82);
  line-height: 1.6;
  font-size: 0.9rem;

  a {
    color: #f4d35e;
    text-decoration: none;
    font-weight: 700;
  }
`;

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FooterText = styled.p`
  margin: 0;
  color: rgba(232, 237, 245, 0.7);
  font-size: 0.85rem;
  line-height: 1.55;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;

  @media (max-width: 767px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

export const ButtonIcon = styled.span`
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $light }) =>
    $light ? "rgba(255,255,255,0.18)" : "rgba(12, 23, 42, 0.14)"};
  font-size: 0.96rem;
  flex-shrink: 0;
`;

export const ButtonTextWrap = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

export const ButtonLabel = styled.span`
  font-weight: 800;
  line-height: 1.05;
`;

export const ButtonSub = styled.span`
  margin-top: 0.14rem;
  font-size: 0.78rem;
  opacity: 0.82;
  font-weight: 600;
`;

export const PillButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 18px;
  min-height: 56px;
  padding: 0.78rem 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 800;
  font-size: 0.94rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;
    min-height: 54px;
    padding: 0.78rem 0.9rem;
  }
`;

export const PrimaryButton = styled(PillButton)`
  background: linear-gradient(180deg, #f2d36a 0%, #dfbf52 100%);
  color: #0c1118;
  box-shadow:
    0 10px 22px rgba(244, 211, 94, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.32);

  ${ButtonIcon} {
    background: rgba(12, 23, 42, 0.12);
    color: #0c1118;
  }

  ${ButtonLabel} {
    color: #111827;
  }

  ${ButtonSub} {
    color: rgba(17, 24, 39, 0.82);
    opacity: 1;
  }
`;

export const SecondaryButton = styled(PillButton)`
  background: linear-gradient(180deg, #235289 0%, #173f6d 100%);
  color: #ffffff;
  border: 1px solid rgba(95, 170, 255, 0.18);
  box-shadow:
    0 10px 22px rgba(9, 23, 46, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);

  ${ButtonIcon} {
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
  }

  ${ButtonLabel} {
    color: #f8fbff;
  }

  ${ButtonSub} {
    color: rgba(232, 237, 245, 0.86);
    opacity: 1;
  }
`;

export const TertiaryButton = styled(PillButton)`
  background: linear-gradient(
    180deg,
    rgba(58, 73, 102, 0.88) 0%,
    rgba(33, 44, 67, 0.92) 100%
  );
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 10px 22px rgba(9, 23, 46, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  ${ButtonLabel} {
    color: #f4f7fb;
  }

  ${ButtonSub} {
    color: rgba(214, 222, 235, 0.82);
    opacity: 1;
  }
`;

/* ---------- ESTILOS REUTILIZABLES PARA PÁGINAS LEGALES ---------- */

export const LegalPageShell = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(0, 168, 243, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(16, 163, 127, 0.1), transparent 24%),
    linear-gradient(180deg, #08111f 0%, #0a1528 100%);
  color: #f5f7fb;
  padding: 2rem 1rem 4rem;

  @media (min-width: 768px) {
    padding: 2.4rem 1.5rem 5rem;
  }
`;

export const LegalPageContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 72px;
  padding: 0.9rem 1.2rem;
  border-radius: 24px;
  text-decoration: none;
  background: linear-gradient(180deg, #173c64 0%, #113256 100%);
  color: #ffffff;
  border: 1px solid rgba(75, 166, 255, 0.18);
  box-shadow:
    0 10px 24px rgba(9, 23, 46, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  font-weight: 800;
  margin-bottom: 1.25rem;
`;

export const BackIcon = styled.span`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.12);
  font-size: 1rem;
`;

export const LegalHero = styled.div`
  border-radius: 28px;
  padding: 1.4rem;
  background:
    radial-gradient(circle at top left, rgba(0, 168, 243, 0.12), transparent 30%),
    linear-gradient(180deg, rgba(12, 25, 47, 0.92) 0%, rgba(9, 18, 34, 0.92) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (min-width: 768px) {
    padding: 1.8rem;
  }
`;

export const LegalEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(20, 44, 82, 0.9);
  border: 1px solid rgba(0, 168, 243, 0.16);
  color: #d9f6ff;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const LegalMainTitle = styled.h1`
  margin: 1rem 0 0.6rem;
  font-size: 2rem;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 2.7rem;
  }
`;

export const LegalLead = styled.p`
  margin: 0;
  color: rgba(232, 237, 245, 0.86);
  line-height: 1.75;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.05rem;
  }
`;

export const LegalMeta = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export const LegalMetaItem = styled.div`
  padding: 0.62rem 0.9rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(232, 237, 245, 0.84);
  font-size: 0.9rem;
  font-weight: 600;
`;

export const LegalBodyWrap = styled.div`
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const LegalSection = styled.section`
  border-radius: 24px;
  padding: 1.2rem;
  background: rgba(12, 25, 47, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);

  @media (min-width: 768px) {
    padding: 1.35rem;
  }
`;

export const LegalSectionTitle = styled.h2`
  margin: 0 0 0.8rem;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
`;

export const LegalParagraph = styled.p`
  margin: 0 0 0.9rem;
  color: rgba(232, 237, 245, 0.84);
  line-height: 1.8;
  font-size: 0.98rem;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: #f4d35e;
    text-decoration: none;
    font-weight: 700;
  }

  strong {
    color: #ffffff;
  }
`;

export const LegalList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: rgba(232, 237, 245, 0.84);

  li {
    margin-bottom: 0.65rem;
    line-height: 1.8;
  }

  li:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #ffffff;
  }
`;

export const LegalNote = styled.div`
  margin-top: 1rem;
  border-radius: 20px;
  padding: 1rem 1.05rem;
  background: rgba(244, 211, 94, 0.08);
  border: 1px solid rgba(244, 211, 94, 0.16);
  color: rgba(255, 247, 220, 0.92);
  line-height: 1.7;
  font-size: 0.95rem;
`;

export const LegalLinkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LegalNavCard = styled(Link)`
  display: block;
  text-decoration: none;
  border-radius: 20px;
  padding: 1rem;
  background: rgba(7, 18, 36, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  transition: transform 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(244, 211, 94, 0.24);
  }
`;

export const LegalNavTitle = styled.div`
  font-weight: 800;
  font-size: 1rem;
  color: #ffffff;
`;

export const LegalNavText = styled.div`
  margin-top: 0.25rem;
  color: rgba(232, 237, 245, 0.7);
  line-height: 1.6;
  font-size: 0.9rem;
`;