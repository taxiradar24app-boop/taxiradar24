import styled from "styled-components";

export const HeroTitle = styled.h1`
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;

  font-size: clamp(2.2rem, 3vw + 1rem, 2.8rem);

  color: ${({ color }) => color || "#ffc83d"};
`;
