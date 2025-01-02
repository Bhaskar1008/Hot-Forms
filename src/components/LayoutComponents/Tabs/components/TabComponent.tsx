import React from 'react';
import { FormComponent } from '../../../../types/form';
import { componentMap } from '../../../../utils/componentMap';
import { GripVertical, X } from 'lucide-react';

interface TabComponentProps {
  component: FormComponent;
  onSelect: () => void;
  onRemove: () => void;
}

export const TabComponent: React.FC<TabComponentProps> = ({
  component,
  onSelect,
  onRemove
}) => {
  const Component = componentMap[component.type];
  
  if (!Component) return null;

  return (
    <div
      className="relative group bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="absolute left-0 top-0 h-full flex items-center -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 cursor-move">
          <GripVertical className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:border-red-500 hover:bg-red-50"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="p-4 ml-6">
        <Component component={component} />
      </div>
    </div>
  );
};
