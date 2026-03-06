import styled from "styled-components";

const AuthInput = styled.input`
  width: 100%;
  min-height: 56px;
  margin-top: 12px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.82);
  color: #f8fafc;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &::placeholder {
    color: #9fb1c8;
    opacity: 0.82;
  }

  &:focus {
    border-color: rgba(244, 211, 94, 0.72);
    box-shadow: 0 0 0 4px rgba(244, 211, 94, 0.12);
    background: rgba(15, 23, 42, 0.96);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default AuthInput;