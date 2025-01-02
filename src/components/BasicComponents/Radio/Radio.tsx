import React from 'react';
import { FormComponent } from '../../../types/form';

interface RadioProps {
  component: FormComponent;
  onChange?: (value: string) => void;
  value?: string;
}

const Radio: React.FC<RadioProps> = ({ component, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {component.options?.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
