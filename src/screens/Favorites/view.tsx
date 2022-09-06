import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Header, PatientCard } from '../../components';
import { usePatients } from '../../context/PatientsContext';
import { Container } from './styles';

const FavoritesScreen = () => {
  const { favoritesPatients } = usePatients();

  return (
    <React.Fragment>
      <Header title="Favoritos" />
      <Container>
        <FlatList
          renderItem={({ item }) => (
            <PatientCard isFavorited={true} patient={item} />
          )}
          data={favoritesPatients}
          showsVerticalScrollIndicator={false}
          initialNumToRender={50}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item, index) => item.email}
        />
      </Container>
    </React.Fragment>
  );
};

export default FavoritesScreen;
