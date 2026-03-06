import styled from "styled-components";

const AuthDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 18px 0 8px;
  color: #aebed4;
  font-size: 0.92rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(148, 163, 184, 0.2);
  }
`;

AuthDivider.defaultProps = {
  children: "o",
};

export default AuthDivider;