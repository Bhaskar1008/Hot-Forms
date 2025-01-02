import { useState, useCallback } from 'react';
import { APIDetails } from '../types';

const STORAGE_KEY = 'hot-form-api-details';

export const useAPIStorage = () => {
  const [savedAPIs, setSavedAPIs] = useState<APIDetails[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const saveAPIDetails = useCallback((details: APIDetails) => {
    const newAPIs = [...savedAPIs, { ...details, id: crypto.randomUUID() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAPIs));
    setSavedAPIs(newAPIs);
  }, [savedAPIs]);

  const removeAPIDetails = useCallback((id: string) => {
    const newAPIs = savedAPIs.filter(api => api.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAPIs));
    setSavedAPIs(newAPIs);
  }, [savedAPIs]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  return {
    savedAPIs,
    saveAPIDetails,
    removeAPIDetails,
    copyToClipboard
  };
};
