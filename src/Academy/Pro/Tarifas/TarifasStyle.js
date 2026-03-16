import styled from "styled-components";

/* ===================================================== */
/* 📦 CONTENEDOR PRINCIPAL */
/* ===================================================== */
export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#0a1528"};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageContainer = styled.div`
  background: #081325;
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: stretch; /* 👈 CLAVE */
`;

/* ===================================================== */
/* 🧾 TITULOS */
/* ===================================================== */

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: #ffc83d;
`;

export const Subtitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 36px 0 14px;
  color: #ffc83d;
`;

/* ===================================================== */
/* 📄 TEXTO */
/* ===================================================== */

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 18px;
  color: #d4d7dd;
`;

/* ===================================================== */
/* ➖ DIVISOR */
/* ===================================================== */

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin: 32px 0;
`;

/* ===================================================== */
/* 📋 LISTAS */
/* ===================================================== */

export const List = styled.ul`
  padding-left: 18px;
  margin: 14px 0;
`;

export const ListItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.65;
  margin-bottom: 10px;
  color: #cfd3da;
`;

/* ===================================================== */
/* 🎯 INFO / OBJETIVO */
/* ===================================================== */

export const TipBox = styled.div`
  background: rgba(16, 163, 127, 0.12);
  border-left: 4px solid #10a37f;
  padding: 18px 20px;
  border-radius: 12px;
  margin: 28px 0;
  color: #e8fffa;
  line-height: 1.6;
`;

/* ===================================================== */
/* 🔘 BOTONES */
/* ===================================================== */

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 36px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CTAButton = styled.button`
  background: #10a37f;
  color: #ffffff;
  padding: 14px 22px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: #ffc83d;
  padding: 14px 22px;
  border-radius: 12px;
  border: 1px solid rgba(255, 200, 61, 0.5);
  font-size: 1rem;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    background: rgba(255, 200, 61, 0.08);
  }
`;

/* ===================================================== */
/* 🔗 ENLACES */
/* ===================================================== */

export const Link = styled.a`
  color: #ffc83d;
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    opacity: 0.85;
  }
`;
