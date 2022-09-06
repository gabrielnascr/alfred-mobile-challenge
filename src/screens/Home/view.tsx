import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Patient } from '../../context/PatientsContext';
import { Container, Input, InputContainer, InputWrapper } from './styles';
import FilterIcon from '../../assets/icons/filter-icon.svg';
import colors from '../../global/styles/colors';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../components/Loading';
import { Header, PatientCard, PatientDetailsModal } from '../../components';

interface HomeViewProps {
  patients: Patient[];
  loading: boolean;
  searchQuery?: string;
  loadingMoreResults: boolean;
  handleMoreResults: () => void;
  setSearchQuery: (value: string) => any;
}

const HomeScreen = ({
  patients,
  loading,
  loadingMoreResults,
  searchQuery,
  setSearchQuery,
  handleMoreResults,
}: HomeViewProps) => {
  return (
    <React.Fragment>
      <Header title="Pacientes" />

      {loading ? (
        <Loading />
      ) : (
        <Container>
          <InputContainer>
            <InputWrapper>
              <Input
                placeholder="Digite o nome do paciente."
                onChangeText={value => {
                  setSearchQuery(value);
                }}
              />
              <SearchIcon
                style={{ position: 'absolute', right: 30, top: 10 }}
                width={20}
                height={20}
                fill={colors.gray}
              />
            </InputWrapper>
            <FilterIcon width={36} height={36} fill={colors.gray} />
          </InputContainer>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20, flex: 1 }}>
            <FlatList
              renderItem={({ item }) => <PatientCard patient={item} />}
              data={patients}
              showsVerticalScrollIndicator={false}
              initialNumToRender={50}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              keyExtractor={(item, index) => item.id.value}
              onEndReached={() => {
                if (searchQuery) {
                  return;
                }

                handleMoreResults();
              }}
              ListFooterComponent={
                <View style={{ flex: 1, padding: 30 }}>
                  {loadingMoreResults && (
                    <ActivityIndicator color={colors.red} size={'large'} />
                  )}
                </View>
              }
            />
          </View>
        </Container>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
