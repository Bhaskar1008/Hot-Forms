import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface TranslationContextType {
  t: ReturnType<typeof useTranslation>['t'];
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, currentLanguage, setLanguage } = useTranslation();

  return (
    <TranslationContext.Provider value={{ t, currentLanguage, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};
