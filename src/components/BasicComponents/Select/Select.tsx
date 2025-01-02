import React from 'react';
import { FormComponent } from '../../../types/form';

interface SelectProps {
  component: FormComponent;
  onChange?: (value: string) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ component, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">Select an option</option>
        {component.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
