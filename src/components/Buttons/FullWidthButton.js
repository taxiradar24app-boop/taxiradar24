import styled from "styled-components";

const FullWidthButton = styled.button`
  width: 100%;
  padding: 1rem 1.2rem;

  border-radius: 14px;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, #10a37f, #84cc16);
  color: #022c22;

  font-size: 1.1rem;
  font-weight: 700;

  box-shadow: 0 8px 22px rgba(0, 255, 200, 0.25);

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default FullWidthButton;
