import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Patient, usePatients } from '../../context/PatientsContext';
import {
  Container,
  PacientInfoText,
  PatientImage,
  PatientInfoContainer,
  PatientName,
} from './styles';

import DeleteIcon from '../../assets/icons/delete-icon.svg';
import FavoriteIcon from '../../assets/icons/heart-icon.svg';
import colors from '../../global/styles/colors';
import PatientDetailsModal from '../PatientDetailsModal';

type PatientCardProps = {
  patient: Patient;
  isFavorited?: boolean;
};

export default function PatientCard({
  patient,
  isFavorited = false,
}: PatientCardProps) {
  const { handleSetPatientSelected, removeFavoritedPatient } = usePatients();

  const {
    name: { first, last },
    phone,
    email,
    picture,
  } = patient;

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          padding: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.blue_500,
        }}
      >
        <TouchableOpacity onPress={() => {
          removeFavoritedPatient(patient);
        }}>
          <View
            style={{
              padding: 8,
              borderColor: colors.white,
              borderWidth: 3,
              borderStyle: 'solid',
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DeleteIcon width={32} height={32} fill={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      rightThreshold={1}
      enabled={isFavorited}
      renderRightActions={rightSwipeActions}
    >
      <Container
        activeOpacity={0.7}
        onPress={() => handleSetPatientSelected(patient)}
      >
        <PatientImage source={{ uri: picture.medium }} />
        <PatientInfoContainer>
          <PatientName>
            {first} {last}
          </PatientName>
          <PacientInfoText>{email}</PacientInfoText>
          <PacientInfoText>{phone}</PacientInfoText>
        </PatientInfoContainer>
      </Container>
    </Swipeable>
  );
}
