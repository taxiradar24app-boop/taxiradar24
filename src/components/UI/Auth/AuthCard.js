import styled from "styled-components";

const AuthCard = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 34px 28px 30px;
  border-radius: 28px;

  background: rgba(8, 18, 37, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  color: #e8edf3;
  text-align: center;
  backdrop-filter: blur(10px);

  h1,
  h2 {
    margin: 0 0 12px;
    color: #f4d35e;
    font-size: clamp(1.7rem, 2vw + 1rem, 2.2rem);
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 12px rgba(244, 211, 94, 0.14);
  }

  p {
    margin: 0 0 16px;
    color: #d7e3f4;
    font-size: 1rem;
    line-height: 1.6;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    padding: 28px 18px 24px;
    border-radius: 22px;

    h1,
    h2 {
      font-size: 1.85rem;
    }

    p {
      font-size: 0.97rem;
    }
  }
`;

export default AuthCard;