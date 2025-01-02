import React from 'react';
import { FormComponent } from '../../../types/form';

interface CheckboxProps {
  component: FormComponent;
  onChange?: (checked: boolean) => void;
  value?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ component, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          checked={value || false}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="text-sm font-medium text-gray-700">
          {component.label}
          {component.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
