import { useState } from 'react';

export const usePropertyPanelOrientation = (initialOrientation: 'horizontal' | 'vertical' = 'horizontal') => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(initialOrientation);

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return {
    orientation,
    toggleOrientation
  };
};
