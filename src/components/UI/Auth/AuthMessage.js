import styled, { css } from "styled-components";

const successStyles = css`
  background: rgba(16, 163, 127, 0.14);
  border: 1px solid rgba(16, 163, 127, 0.34);
  color: #d8fff3;
`;

const errorStyles = css`
  background: rgba(244, 91, 105, 0.14);
  border: 1px solid rgba(244, 91, 105, 0.34);
  color: #ffd7dc;
`;

const AuthMessage = styled.div`
  width: 100%;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.55;
  text-align: center;
  white-space: pre-line;

  ${({ type, $type }) => {
    const variant = type || $type;
    return variant === "success" ? successStyles : errorStyles;
  }}
`;

export default AuthMessage;