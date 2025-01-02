import React from 'react';
import { FormComponent } from '../../../types/form';
import { ComponentProperties } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';
import TableDisplayTab from './TableDisplayTab';
import WizardDisplayTab from './WizardDisplayTab';

interface DisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const DisplayTab: React.FC<DisplayTabProps> = ({ component, onChange }) => {
  // For specialized components, use their dedicated display tabs
  if (component.type === 'table') {
    return <TableDisplayTab component={component} onChange={onChange} />;
  }
  
  if (component.type === 'wizard') {
    return <WizardDisplayTab component={component} onChange={onChange} />;
  }

  const getDisplayProperties = () => {
    const baseProperties = [
      { name: 'label', type: 'text', required: true },
      { name: 'customClass', type: 'text' },
      { name: 'hideLabel', type: 'switch' },
      { name: 'disabled', type: 'switch' }
    ];

    const componentType = component.type as keyof ComponentProperties;
    switch (componentType) {
      case 'text':
        return [
          ...baseProperties,
          { name: 'placeholder', type: 'text' },
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' },
          { name: 'prefix', type: 'text' },
          { name: 'suffix', type: 'text' },
          { name: 'showCharCount', type: 'switch' },
          { name: 'showWordCount', type: 'switch' },
          { name: 'spellcheck', type: 'switch' }
        ];

      case 'select':
      case 'radio':
        return [
          ...baseProperties,
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' }
        ];

      case 'checkbox':
        return [
          ...baseProperties,
          { name: 'description', type: 'textarea' }
        ];

      case 'datetime':
      case 'fileupload':
      case 'signature':
      case 'otp':
      case 'tags':
        return [
          ...baseProperties,
          { name: 'placeholder', type: 'text' },
          { name: 'description', type: 'textarea' },
          { name: 'tooltip', type: 'text' }
        ];

      default:
        return baseProperties;
    }
  };

  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  const properties = getDisplayProperties();

  return (
    <div className="space-y-6">
      {properties.map((prop) => (
        <PropertyField
          key={prop.name}
          label={prop.name.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
                prop.name.split(/(?=[A-Z])/).join(' ').slice(1)}
          type={prop.type}
          value={component.display?.[prop.name as keyof typeof component.display] ?? ''}
          onChange={(value) => handleDisplayChange(prop.name, value)}
          options={prop.options}
          required={prop.required}
          placeholder={prop.placeholder}
          min={prop.min}
          max={prop.max}
        />
      ))}
    </div>
  );
};

export default DisplayTab;
