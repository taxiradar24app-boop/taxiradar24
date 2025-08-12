import styled from 'styled-components';
import { Title } from './homeStyles';

export const AnimatedTitle = styled(Title)`
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s ease-in-out;
`;
