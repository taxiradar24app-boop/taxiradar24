// ✅ src/Academy/StyleAcademy/GuiaInformativaStyle.js
// Estilos unificados para toda la Guía Informativa TaxiRadar24

import styled from "styled-components";

// === CONTENEDOR GENERAL ===
export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundScool};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 3rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1rem;
  }
`;

// === TITULOS Y SUBTITULOS ===
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.titleScool};
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 800;
`;

export const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.subTitleScool};
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  text-align: center;
`;

// === PÁRRAFOS GENERALES ===
export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  max-width: 900px;
  margin: 1rem auto;
  text-align: justify;
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.titleScool};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

// === LISTAS GENERALES ===
export const List = styled.ul`
  max-width: 900px;
  margin: 1rem auto;
  padding-left: 1.5rem;
  list-style-type: "🔹 ";
  line-height: 1.7;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.titleScool};
  }
`;

// === CAJA DE EJEMPLOS / CASOS ===
export const ExampleBox = styled.div`
  background: ${({ theme }) => theme.colors.cardSecondary};
  border-left: 5px solid ${({ theme }) => theme.colors.tubo};
  border-radius: 10px;
  padding: 1.2rem;
  margin: 1.2rem auto;
  width: 100%;
  max-width: 900px;
  box-shadow: ${({ theme }) => theme.shadows.light || theme.shadows.dark};
`;

export const ExampleItem = styled.p`
  margin: 0.3rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`;

// === TIP / RECOMENDACIÓN ===
export const TipBox = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-left: 5px solid ${({ theme }) => theme.colors.ontime};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.2rem;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 900px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  strong {
    color: ${({ theme }) => theme.colors.titleScool};
  }
`;

// === LISTA DE PASOS (PROCEDIMIENTO) ===
export const StepList = styled.ul`
  max-width: 900px;
  margin: 1rem auto;
  padding-left: 1.5rem;
  list-style-type: "🟢 ";
`;

export const StepItem = styled.li`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;

  strong {
    color: ${({ theme }) => theme.colors.titleScool};
  }
`;

// === ENLACES ===
export const Link = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.landed};
  font-weight: 600;
  text-decoration: none;
  margin: 0.6rem 0;

  &:hover {
    color: ${({ theme }) => theme.colors.tubo};
    text-decoration: underline;
  }
`;

// === SEPARADOR ===
export const Divider = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  opacity: 0.4;
  margin: 2rem auto;
`;

// === LISTA DE SECCIONES (MENÚ PRINCIPAL DE LA GUÍA) ===
export const GuiaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  margin: 1.5rem auto;
`;

export const GuiaItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  &:before {
    content: "🚖";
    font-size: 1.2rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.tubo};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// === CAJA DE LEYES / NORMATIVA ===
export const LawList = styled.ul`
  max-width: 900px;
  margin: 1rem auto;
  padding-left: 1.5rem;
  list-style-type: "⚖️ ";
`;

export const LawItem = styled.li`
  margin-bottom: 0.6rem;
  text-align: left;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

// === BLOQUE FINAL DE SECCIÓN / CTA ===
export const FinalNote = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 3rem;
`;
// === BOTONES DE ACCIÓN (CTA) ===
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

export const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.titleScool};
  color: #fff;
  padding: 0.7rem 1.4rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    opacity: 0.9;
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

// Botón secundario (versión clara)
export const SecondaryButton = styled(CTAButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.titleScool};
  border: 2px solid ${({ theme }) => theme.colors.titleScool};

  &:hover {
    background: ${({ theme }) => theme.colors.titleScool};
    color: #fff;
  }
`;

