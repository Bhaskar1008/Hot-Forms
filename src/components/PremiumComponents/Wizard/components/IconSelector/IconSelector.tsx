import React, { useState } from 'react';
import { IconLibrary } from './IconLibrary';
import { CustomIconUpload } from './CustomIconUpload';
import { IconValidation } from '../../types';

interface IconSelectorProps {
  onSelect: (icon: { type: 'library' | 'custom'; value: string }) => void;
  currentIcon?: { type: 'library' | 'custom'; value: string };
}

const iconValidation: IconValidation = {
  maxSize: 50 * 1024, // 50KB
  allowedTypes: ['image/png', 'image/svg+xml'],
  dimensions: {
    width: 32,
    height: 32
  }
};

export const IconSelector: React.FC<IconSelectorProps> = ({ onSelect, currentIcon }) => {
  const [activeTab, setActiveTab] = useState<'library' | 'custom'>(
    currentIcon?.type || 'library'
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'library'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Icon Library
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'custom'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Custom Icon
        </button>
      </div>

      {activeTab === 'library' ? (
        <IconLibrary
          onSelect={(iconName) => onSelect({ type: 'library', value: iconName })}
          selectedIcon={currentIcon?.type === 'library' ? currentIcon.value : undefined}
        />
      ) : (
        <CustomIconUpload
          onUpload={(base64) => onSelect({ type: 'custom', value: base64 })}
          currentIcon={currentIcon?.type === 'custom' ? currentIcon.value : undefined}
          validation={iconValidation}
        />
      )}
    </div>
  );
};
