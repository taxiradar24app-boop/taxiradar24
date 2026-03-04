import styled from "styled-components";

const IconButton = styled.button`
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  cursor: pointer;

  transition: 0.16s ease;

  &:hover {
    background: rgba(22, 163, 74, 0.15);
    border-color: rgba(163, 255, 200, 0.4);
  }
`;

export default IconButton;
