import styled from "styled-components";

const SecondaryButton = styled.button`
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  cursor: pointer;

  background: transparent;
  border: 1px solid rgba(163, 255, 200, 0.4);
  color: #d1fae5;

  font-size: 0.95rem;
  font-weight: 600;

  transition: 0.18s ease;

  &:hover {
    background: rgba(22, 163, 74, 0.12);
    border-color: rgba(163, 255, 200, 0.7);
    color: #ffffff;
  }
`;

export default SecondaryButton;
