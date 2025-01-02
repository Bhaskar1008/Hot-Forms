import React from 'react';
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
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options,
  required,
  placeholder,
}) => {
  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            placeholder={placeholder}
            required={required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
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
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            required={required}
          >
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
            checked={value}
            onCheckedChange={onChange}
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
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={inputClasses}
            required={required}
          />
        );

      default:
        return null;
    }
  };

  const inputClasses = classNames(
    'w-full px-3 py-2 border border-gray-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'text-sm text-gray-900 placeholder-gray-400',
    'transition-colors duration-200'
  );

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

export default PropertyField;
