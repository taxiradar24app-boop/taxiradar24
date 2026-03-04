import styled from "styled-components";

const TertiaryButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary || "#e5e7eb"};

  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0;
  margin: 0;

  opacity: 0.85;
  transition: 0.16s ease;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export default TertiaryButton;
