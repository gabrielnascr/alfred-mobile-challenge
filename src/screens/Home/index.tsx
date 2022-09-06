import React, { useState } from 'react';
import { Patient, usePatients } from '../../context/PatientsContext';
import HomeScreen from './view';

const HomeContainer = () => {
  const { patients, loading, loadingMoreResults, handleMoreResults } = usePatients();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <HomeScreen
      patients={patients.filter(
        (p: Patient) =>
          p?.name?.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p?.name?.last.toLowerCase().includes(searchQuery.toLowerCase()),
      )}
      loading={loading}
      searchQuery={searchQuery}
      setSearchQuery={handleSearchQuery}
      loadingMoreResults={loadingMoreResults}
      handleMoreResults={handleMoreResults}
    />
  );
};

export { HomeContainer };
