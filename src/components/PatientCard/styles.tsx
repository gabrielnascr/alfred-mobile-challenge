import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../../global/styles/colors";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.red};
  padding: 15px;
  flex-direction: row;

  border-bottom-left-radius: 5px;

  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

`;

export const PatientImage = styled.Image`
  border-radius: 100px;
  width: 70px;
  height: 70px;

  margin-right: 20px;
`;

export const PatientInfoContainer = styled.View``;

export const PatientName = styled.Text`
  font-size: 24px;
  font-family: 'Inter_700Bold';
  color: ${colors.blue_100};
`;

export const PacientInfoText = styled.Text`
  font-size: 14px;
  font-family: 'Inter_500Medium';
  color: ${colors.blue_100};
`;