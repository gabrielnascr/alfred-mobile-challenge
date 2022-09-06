import React, { createContext, useCallback, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { asyncStorage } from '../services';
import coreRestApi from '../services/coreRestApi';

export interface Patient {
  id: {
    value: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  birthdate: string;
  phone: string;
  nacionality: string;
  addres: string;
  dob: {
    date?: string;
  };
  picture: {
    medium: string;
    large: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
    street: {
      name: string;
      number: string;
    };
  };
  isFavorited?: boolean;
}

interface ContextData {
  patients: Patient[];
  patientSelected: Patient;
  favoritesPatients: Patient[];
  loading: boolean;
  showPacientModal: boolean;
  loadingMoreResults: boolean;

  handleSetPatients: (patients: Patient[]) => Promise<void>;
  handleSetPatientSelected: (patient: Patient) => Promise<void>;
  handlePacientModal: (value: boolean) => void;
  handleMoreResults: () => void;

  addFavoritePatient: (patient: Patient) => Promise<void>;
  removeFavoritedPatient: (patient: Patient) => Promise<void>;
}

interface PatientProviderProps {
  children: React.ReactNode;
}

const PatientContext = createContext({} as ContextData);

export function PatientesProvider({ children }: PatientProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [patientSelected, setPatientSelected] = useState<Patient>(
    {} as Patient,
  );
  const [showPacientModal, setShowPacientModal] = useState<boolean>(false);
  const [favoritesPatients, setFavoritesPatients] = useState<Patient[]>([]);

  const [loadingMoreResults, setLoadingMoreResults] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  

  const getApiData = useCallback(async () => {
    coreRestApi
      .getPatients({ results: 50, page: searchPage })
      .then(data => {
        setPatients(prevState => [...prevState, ...data?.results]);
      })
      .catch(() => {
        Alert.alert('Houve um erro ao buscar pacientes.');
      })
      .finally(() => {
        setLoading(false);
        setLoadingMoreResults(false);
      });
  }, []);

  const getFavoritedPatientsOnAsyncStorage = async () => {
    await asyncStorage.getData('@favoritedPatients').then(data => {
      setFavoritesPatients(data);
    });
  };

  useEffect(() => {
    setLoading(true);
    getApiData();
    getFavoritedPatientsOnAsyncStorage();
  }, []);

  const addFavoritePatient = async (patient: Patient) => {
    const patientFavoritedIndex = favoritesPatients?.findIndex(p => {
      return p.id.value === patient.id.value;
    });

    if (patientFavoritedIndex > 0) {
      Alert.alert('Aviso', 'Você já favoritou esse paciente.');
      return;
    }

    const favoriteList: Patient[] = favoritesPatients || [];

    favoriteList.push(patient);

    await asyncStorage
      .storeData('@favoritedPatients', [...favoriteList])
      .then(() => {
        setFavoritesPatients([...favoriteList]);
      });
  };

  const removeFavoritedPatient = async (pacient: Patient) => {
    const patientFavoritedIndex = favoritesPatients?.findIndex(p => {
      return p.id.value === pacient.id.value;
    });

    if (patientFavoritedIndex < 0) {
      Alert.alert('Aviso', 'Você já removeu da lista esse paciente.');
      return;
    }

    const newFavoritesPatientsList = favoritesPatients.filter(p => {
      return p.id.value !== pacient.id.value;
    });

    await asyncStorage
      .storeData('@favoritedPatients', newFavoritesPatientsList)
      .then(() => {
        setFavoritesPatients(newFavoritesPatientsList);
      });
  };

  const handleSetPatients = async (patients: Patient[]) => {
    setPatients(prevState => [...prevState, ...patients]);
  };

  const handleSetPatientSelected = async (patient: Patient) => {
    setShowPacientModal(!showPacientModal);
    setPatientSelected(patient);
  };

  const handlePacientModal = async (value: boolean) => {
    setShowPacientModal(value);
  };

  const handleMoreResults = useCallback(() => {
    if (loadingMoreResults) {
      return;
    }

    setLoadingMoreResults(true);
    setSearchPage(searchPage + 1);
    getApiData();
  }, [loadingMoreResults,searchPage])

  return (
    <PatientContext.Provider
      value={{
        patients,
        loadingMoreResults,
        favoritesPatients,
        loading,
        patientSelected,
        showPacientModal,
        handleSetPatients,
        handleSetPatientSelected,
        handlePacientModal,
        handleMoreResults,
        addFavoritePatient,
        removeFavoritedPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export const usePatients = () => useContext(PatientContext);
