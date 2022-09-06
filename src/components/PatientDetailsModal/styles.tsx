import { Animated } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../global/styles/colors';

export const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: 'rgba(0, 0, 0, 0.5)';
  position: absolute;
`;

export const Modal = styled(Animated.View)`
  bottom: 0;
  position: absolute;
  height: 54%;
  width: 100%;
  border-color: ${colors.red};
  border-width: 2px;
  border-style: 'solid';

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const PacientImageWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const PacientImage = styled.Image`
  border-color: ${colors.red};
  border-width: 3px;
  border-style: 'solid';

  width: 120px;
  height: 120px;

  border-radius: 100px;

  margin-top: -60px;
`;

export const PacientInfoContainer = styled.View`
  padding: 30px;
`;

export const PacientName = styled.Text`
  color: ${colors.blue_900};
  font-family: 'Inter_700Bold';
  font-size: 32px;
  margin-bottom: 20px;
`;

export const PacientInfoText = styled.Text`
  font-family: 'Inter_400Regular';
  font-size: 16px;
`;

export const FavoriteButtonContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const FavoriteButton = styled.TouchableOpacity`
  background: ${colors.blue_900};
  height: 60px;
  padding: 20px 50px;
  border-radius: 100px;

  align-items: center;
  justify-content: center;
  flex-direction: row;
  
  text-align: center;
`;

