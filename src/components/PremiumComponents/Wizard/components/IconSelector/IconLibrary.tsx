import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconLibraryProps {
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

export const IconLibrary: React.FC<IconLibraryProps> = ({ onSelect, selectedIcon }) => {
  const icons = Object.entries(LucideIcons)
    .filter(([name, component]) => 
      name !== 'createLucideIcon' && 
      typeof component === 'function'
    )
    .map(([name, Icon]) => ({
      name,
      Icon: Icon as React.FC
    }));

  return (
    <div className="grid grid-cols-6 gap-2 max-h-[200px] overflow-y-auto p-2">
      {icons.map(({ name, Icon }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`p-2 rounded-md hover:bg-gray-100 ${
            selectedIcon === name ? 'bg-blue-100 ring-2 ring-blue-500' : ''
          }`}
          title={name}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};
