import styled from "styled-components";

const AuthLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  position: relative;
  overflow: hidden;

  background:
    linear-gradient(rgba(10, 15, 30, 0.32), rgba(10, 15, 30, 0.32)),
    linear-gradient(180deg, #06101f 0%, #081325 55%, #0b1f3b 100%);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 20%, rgba(0, 168, 243, 0.08), transparent 28%),
      radial-gradient(circle at 82% 18%, rgba(244, 211, 94, 0.06), transparent 24%),
      radial-gradient(circle at 50% 100%, rgba(16, 163, 127, 0.08), transparent 32%);
    pointer-events: none;
  }
`;

export default AuthLayout;