import React from 'react';
import { FormComponent } from '../../../types/form';
import { ComponentProperties } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface ValidationTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const ValidationTab: React.FC<ValidationTabProps> = ({ component, onChange }) => {
  const getValidationProperties = () => {
    const baseProperties = [
      { name: 'required', type: 'switch' },
      { name: 'validateOn', type: 'select', options: [
        { label: 'Change', value: 'change' },
        { label: 'Blur', value: 'blur' }
      ]}
    ];

    const componentType = component.type as keyof ComponentProperties;
    switch (componentType) {
      case 'text':
        return [
          ...baseProperties,
          { name: 'custom', type: 'textarea' },
          { name: 'customPrivate', type: 'switch' },
          { name: 'minLength', type: 'text' },
          { name: 'maxLength', type: 'text' },
          { name: 'pattern', type: 'text' }
        ];

      case 'checkbox':
      case 'radio':
      case 'select':
        return [
          ...baseProperties,
          { name: 'custom', type: 'textarea' },
          { name: 'customPrivate', type: 'switch' }
        ];

      case 'datetime':
        return [
          ...baseProperties,
          { name: 'strictDateValidation', type: 'switch' }
        ];

      case 'fileupload':
      case 'signature':
        return baseProperties;

      case 'otp':
        return [
          ...baseProperties,
          { name: 'minLength', type: 'text' },
          { name: 'maxLength', type: 'text' }
        ];

      case 'table':
        return [
          { name: 'rowCount', type: 'number' }
        ];

      default:
        return [];
    }
  };

  const properties = getValidationProperties();

  return (
    <div className="space-y-6">
      {properties.map((prop) => (
        <PropertyField
          key={prop.name}
          label={prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
          type={prop.type}
          value={component.validation?.[prop.name as keyof typeof component.validation]}
          onChange={(value) => onChange({
            validation: {
              ...component.validation,
              [prop.name]: value
            }
          })}
          options={prop.options}
        />
      ))}
    </div>
  );
};

export default ValidationTab;
