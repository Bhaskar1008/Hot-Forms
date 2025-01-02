import { create } from 'zustand';
import { translations } from '../config/languages';

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;

interface TranslationStore {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export const useTranslation = create<TranslationStore>((set, get) => ({
  currentLanguage: 'en',
  setLanguage: (language) => set({ currentLanguage: language }),
  t: (key, params) => {
    const { currentLanguage } = get();
    let text = translations[currentLanguage][key] || translations.en[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    
    return text;
  }
}));
