import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 2.5rem auto 0;
  padding: 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const Title = styled.h4`
  margin: 0 0 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.3;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #f9fafb;
`;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.5;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover {
    color: #f4d35e;
  }
`;