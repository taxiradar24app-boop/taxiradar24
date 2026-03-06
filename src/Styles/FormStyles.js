import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;

  background: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 58px;
  padding: 0 18px;
  font-size: 1rem;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.84);
  color: #f8fafc;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: #9fb1c8;
    opacity: 0.82;
  }

  &:focus {
    outline: none;
    border-color: rgba(244, 211, 94, 0.72);
    box-shadow: 0 0 0 4px rgba(244, 211, 94, 0.12);
    background: rgba(15, 23, 42, 0.96);
  }
`;

export const Button = styled.button`
  width: 100%;
  min-height: 58px;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 0.14s ease,
    background 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;

  background: linear-gradient(135deg, #10a37f 0%, #6acb45 100%);
  color: #081325;
  box-shadow: 0 16px 34px rgba(74, 222, 128, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(74, 222, 128, 0.24);
    filter: brightness(1.03);
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.68;
    cursor: not-allowed;
    transform: none;
    filter: grayscale(0.1);
  }
`;

export const TextLink = styled.span`
  color: #59a8ff;
  font-size: 0.98rem;
  cursor: pointer;
  text-align: center;
  margin-top: 6px;
  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #8dc5ff;
  }
`;