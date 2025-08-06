// src/Styles/PhoneVerificationStyle.js
import styled from 'styled-components';
import { Title } from './../Styles/homeStyles';

export const AnimatedTitle = styled(Title)`
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s ease-in-out;
`;

export const GoogleButton = styled.button`
  background-color: #252521;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 32px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const ButtonText = styled.span`
  color: #fff;
  font-size: 16px;
`;
