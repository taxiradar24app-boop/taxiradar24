import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1000;

  backdrop-filter: blur(10px);
  background: rgba(10, 21, 40, 0.85);

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const HeaderInner = styled.div`
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.25rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
