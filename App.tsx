import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Routes } from './src/navigations/routes';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { PatientesProvider } from './src/context/PatientsContext';
import { PatientDetailsModal } from './src/components';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PatientesProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <PatientDetailsModal />
    </PatientesProvider>
  );
}
