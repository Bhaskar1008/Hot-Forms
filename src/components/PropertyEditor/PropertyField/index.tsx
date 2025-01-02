import React, { useState, useEffect } from 'react';
import { Switch } from '@radix-ui/react-switch';
import classNames from 'classnames';

interface PropertyFieldProps {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'switch' | 'number';
  value: any;
  onChange: (value: any) => void;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  label,
  type,
  value: propValue,
  onChange,
  options,
  required,
  placeholder,
  min,
  max
}) => {
  // Use local state to handle controlled component properly
  const [value, setValue] = useState(propValue ?? '');

  // Update local state when prop value changes
  useEffect(() => {
    setValue(propValue ?? '');
  }, [propValue]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    onChange(newValue);
  };

  const inputClasses = classNames(
    'w-full px-3 py-2 border border-gray-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'text-sm text-gray-900 placeholder-gray-400',
    'transition-colors duration-200'
  );

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={inputClasses}
            placeholder={placeholder}
            required={required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={inputClasses}
            rows={3}
            placeholder={placeholder}
            required={required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={inputClasses}
            required={required}
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'switch':
        return (
          <Switch
            checked={!!value}
            onCheckedChange={handleChange}
            className={classNames(
              'relative inline-flex h-6 w-11 items-center rounded-full',
              value ? 'bg-blue-600' : 'bg-gray-200'
            )}
          >
            <span
              className={classNames(
                'inline-block h-4 w-4 transform rounded-full bg-white transition',
                value ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </Switch>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              handleChange(val === '' ? '' : parseFloat(val));
            }}
            className={inputClasses}
            required={required}
            min={min}
            max={max}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  );
};
