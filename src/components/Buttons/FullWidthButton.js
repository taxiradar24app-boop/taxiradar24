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

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;

  box-shadow: 0 8px 22px rgba(16, 163, 127, 0.35);

  transition: transform 0.15s ease,
              filter 0.15s ease,
              box-shadow 0.15s ease;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(16, 163, 127, 0.45);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(20%);
  }
`;
export default FullWidthButton;
