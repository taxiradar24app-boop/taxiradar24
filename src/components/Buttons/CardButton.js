import styled from "styled-components";

const CardButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;

  border: none;
  cursor: pointer;

  font-size: 1rem;
  font-weight: 700;

  background: linear-gradient(135deg, #22c55e, #86efac);
  color: #052e16;

  transition: 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default CardButton;
