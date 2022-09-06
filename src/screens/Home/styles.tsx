import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../global/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  margin: 25px;
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const Input = styled(TextInput)`
  padding: 10px 15px;
  color: ${colors.gray};
  background-color: white;
  margin-right: 20px;
  border-radius: 5px;
`;
