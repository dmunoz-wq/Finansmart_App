import MainApp from '@/components/MainApp';
import { AppDataProvider } from '@/context/AppDataContext';
import { GlobalProvider } from '@/context/GlobalContext';
import React from 'react';

export default function FinanSmartSingleFile() {
  return (
    <GlobalProvider>
      <AppDataProvider>
        <MainApp />
      </AppDataProvider>
    </GlobalProvider>
  );
}
 
