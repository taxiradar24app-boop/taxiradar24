// src/Styles/toolStyle.js
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  overflow-x: hidden;
`;

/* ======== SECCIÓN HERO SUPERIOR ======== */
export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #162c66;
  margin-top: 0; /* 👈 evita hueco inicial */
  padding-top: 0; /* 👈 asegura que quede pegado al header */

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;

export const HeroBackground = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 850px;
  height: auto;
  object-fit: contain;
  object-position: center;
  z-index: 1;
  opacity: 0.6; /* ✅ oscurece la imagen sin perder detalle */
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 20, 40, 0.5) 0%,
    rgba(22, 44, 102, 0.9) 100%
  );
  z-index: 2;
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 10;

  button {
    background: none;
    border: none;
    color: #f4d35e;
    font-size: 1.8rem;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      color 0.3s ease;

    &:hover {
      color: #10a37f;
      transform: scale(1.1);
    }
  }
`;

export const HeroContent = styled.div`
  z-index: 3;
  color: #fff;
  text-align: center;
  max-width: 720px;
  padding: 20px;

  h5 {
    color: #f4d35e;
    letter-spacing: 2px;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  h1 {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 12px;

    span {
      color: #10a37f;
    }
  }

  p {
    color: #e3dcdcff;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 24px;

    b {
      color: #f4d35e;
    }

    span {
      color: #10a37f;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    h1 {
      font-size: 1.8rem;
      line-height: 1.3;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HeroButtonMain = styled.button`
  background-color: #10a37f;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #0e8b6e;
  }
`;

export const HeroButtonSecondary = styled(HeroButtonMain)`
  background: none;
  border: 2px solid #10a37f;
  color: #fff;
  &:hover {
    background-color: #10a37fe;
    color: #162c66;
  }
`;

/* ======== BLOQUE INFERIOR GRIS ======== */
export const SectionInfo = styled.section`
  background-color: #2a2d36;
  width: 100%;
  padding: 60px 20px 100px;
  margin-top: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 16px 80px;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #f4d35e;
  margin-bottom: 40px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 900px;
  width: 100%;
`;

export const InfoCard = styled.div`
  background-color: #243b7a;
  border: 1px solid #10a37f;
  border-radius: 12px;
  padding: 20px;
  color: #e3e3e3;
  transition: 0.3s;
  text-align: left;

  &:hover {
    background-color: #2c4a9c;
    transform: translateY(-4px);
  }

  h3 {
    color: #f4d35e;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    line-height: 1.6;
    font-size: 0.95rem;
  }

  b {
    color: #10a37f;
  }
`;

export const LegendText = styled.p`
  line-height: 1.6;
  font-size: 0.95rem;

  b {
    font-weight: 600;
  }

  .tubo {
    color: ${({ theme }) => theme.colors.tubo};
  }

  .landed {
    color: ${({ theme }) => theme.colors.landed};
  }

  .ontime {
    color: ${({ theme }) => theme.colors.ontime};
  }

  .delayed {
    color: ${({ theme }) => theme.colors.delayed};
  }

  small {
    display: block;
    margin-top: 8px;
    opacity: 0.8;
  }
`;
