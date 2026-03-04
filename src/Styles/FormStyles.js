// src/styles/FormStyles.js
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;

  /* 🔒 Forzamos dark */
  background: #40414f;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid #565869;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0px 4px 6px rgba(0,0,0,0.6);
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid #565869;
  background: #343541;
  color: #ececf1;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #10a37f;
    box-shadow: 0 0 0 2px #10a37f33;
  }
`;


export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.secondary : theme.colors.muted};
  }
`;
export const TextLink = styled.span`
  color: #4da6ff; /* azul tipo enlace */
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  &:hover {
    text-decoration: underline;
  }
`;