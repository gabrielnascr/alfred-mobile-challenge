import styled from 'styled-components/native';
import colors from '../../global/styles/colors';

interface TabTextProps {
  focused: boolean
}

export const Container = styled.View`
  display: flex;
  align-items: center;
`;

export const TabText = styled.Text<TabTextProps>`
  opacity: ${(props) => props.focused ? 1 : 0.5};
  color: ${colors.white};
  font-family: Inter_500Medium;
`;
