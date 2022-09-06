import { Platform } from 'react-native';

import styled from 'styled-components/native';
import colors from '../../global/styles/colors';

export const StatusBarContainer = styled.SafeAreaView`
  height: ${Platform.OS === 'ios' ? '100px' : '80px'};
  background-color: ${colors.blue_300};
  justify-content: center;
`;

export const Title = styled.Text`
  color: white;
  text-align: center;

  margin-top: 6px;

  font-family: 'Inter_700Bold';
  font-size: 26px;
`;
