import React, { useEffect, useState } from 'react';
import { Dimensions, Animated, Text } from 'react-native';
import { usePatients } from '../../context/PatientsContext';
import {
  Container,
  FavoriteButton,
  FavoriteButtonContainer,
  Modal,
  PacientImage,
  PacientImageWrapper,
  PacientInfoContainer,
  PacientInfoText,
  PacientName,
} from './styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import colors from '../../global/styles/colors';

import FavoriteIcon from '../../assets/icons/favorite-icon.svg';
import UnFavoriteIcon from '../../assets/icons/unfavorite-icon.svg';

const { height } = Dimensions.get('window');

export default function PatientDetailsModal() {
  const {
    patientSelected,
    showPacientModal,
    handlePacientModal,
    favoritesPatients,
    addFavoritePatient,
    removeFavoritedPatient,
  } = usePatients();

  const [state] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const [isSelectedPacientFavorited, setIsSelectedPacientFavorited] =
    useState<boolean>();

  useEffect(() => {
    const checkIsSelectedPacientFavorited = () => {
      const selectedPacientFavoriteIndex = favoritesPatients?.findIndex(
        favoritedPacient =>
          favoritedPacient?.id?.value === patientSelected?.id?.value,
      );

      if (selectedPacientFavoriteIndex >= 0) {
        setIsSelectedPacientFavorited(true);
        return;
      }

      setIsSelectedPacientFavorited(false);
    };

    checkIsSelectedPacientFavorited();
  }, [favoritesPatients, patientSelected, showPacientModal]);

  const openPacientModalAnimation = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        useNativeDriver: true,
        toValue: 0,
        duration: 100,
      }),
      Animated.timing(state.opacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 300,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();

    handlePacientModal(true);
  };

  const closePacientModalAnimation = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 600,
      }),
      Animated.timing(state.container, {
        useNativeDriver: true,
        toValue: height,
        duration: 100,
      }),
    ]).start();

    handlePacientModal(false);
  };

  useEffect(() => {
    if (showPacientModal) {
      return openPacientModalAnimation();
    }

    return closePacientModalAnimation();
  }, [showPacientModal]);

  const { name, email, gender, location, dob, picture, phone, id } =
    patientSelected;

  return (
    <Container
      style={{
        opacity: state.opacity,
        transform: [{ translateY: state.container }],
      }}
    >
      <GestureRecognizer
        onSwipeDown={closePacientModalAnimation}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Modal
          style={{
            backgroundColor: colors.white,
            transform: [{ translateY: state.modal }],
          }}
        >
          <PacientImageWrapper>
            <PacientImage source={{ uri: picture?.large }} />
          </PacientImageWrapper>
          <PacientInfoContainer>
            <PacientName>
              {name?.first} {name?.last}
            </PacientName>
            <PacientInfoText>{email}</PacientInfoText>
            <PacientInfoText>{gender}</PacientInfoText>
            <PacientInfoText>
              {new Date(dob?.date).toLocaleDateString('pt-BR')}
            </PacientInfoText>
            <PacientInfoText>{phone}</PacientInfoText>
            <PacientInfoText>
              {location?.city} - {location?.state}
            </PacientInfoText>
            <PacientInfoText>
              {location?.street?.name}, {location?.street?.number}
            </PacientInfoText>
            <PacientInfoText>{id?.value}</PacientInfoText>
          </PacientInfoContainer>
          <FavoriteButtonContainer>
            <FavoriteButton
              onPress={() => {
                if (isSelectedPacientFavorited) {
                  removeFavoritedPatient(patientSelected);
                  return;
                }

                addFavoritePatient(patientSelected);
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inter_700Bold' }}>
                {isSelectedPacientFavorited
                  ? 'Remover dos favoritos'
                  : 'Adicionar nos favoritos'}
              </Text>
              {isSelectedPacientFavorited ? (
                <UnFavoriteIcon
                  width={16}
                  height={16}
                  style={{ marginLeft: 10 }}
                  fill={colors.red}
                />
              ) : (
                <FavoriteIcon
                  width={16}
                  height={16}
                  style={{ marginLeft: 10 }}
                  fill={colors.red}
                />
              )}
            </FavoriteButton>
          </FavoriteButtonContainer>
        </Modal>
      </GestureRecognizer>
    </Container>
  );
}
