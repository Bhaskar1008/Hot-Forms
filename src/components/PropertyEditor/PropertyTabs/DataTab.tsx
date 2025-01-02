import React from 'react';
import { FormComponent } from '../../../types/form';
import { ComponentProperties } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface DataTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const DataTab: React.FC<DataTabProps> = ({ component, onChange }) => {
  const getDataProperties = () => {
    const baseProperties = [
      { name: 'persistent', type: 'switch' },
      { name: 'protected', type: 'switch' },
      { name: 'tableView', type: 'switch' },
      { name: 'modalEdit', type: 'switch' }
    ];

    const componentType = component.type as keyof ComponentProperties;
    switch (componentType) {
      case 'text':
        return [
          { name: 'defaultValue', type: 'text' },
          { name: 'multiple', type: 'switch' },
          { name: 'unique', type: 'switch' },
          ...baseProperties,
          { name: 'calculateValue', type: 'textarea' },
          { name: 'calculateServer', type: 'switch' },
          { name: 'allowCalculateOverride', type: 'switch' },
          { name: 'encrypted', type: 'switch' }
        ];

      case 'checkbox':
        return [
          { name: 'defaultValue', type: 'switch' },
          ...baseProperties,
          { name: 'encrypted', type: 'switch' }
        ];

      case 'radio':
      case 'select':
        return [
          { name: 'defaultValue', type: 'text' },
          { name: 'multiple', type: 'switch' },
          ...baseProperties,
          { name: 'encrypted', type: 'switch' }
        ];

      case 'datetime':
        return [
          { name: 'defaultValue', type: 'text' },
          ...baseProperties,
          { name: 'encrypted', type: 'switch' }
        ];

      case 'fileupload':
        return [
          { name: 'multiple', type: 'switch' },
          ...baseProperties,
          { name: 'encrypted', type: 'switch' }
        ];

      case 'otp':
        return [
          { name: 'defaultValue', type: 'text' },
          ...baseProperties
        ];

      case 'tags':
        return [
          { name: 'defaultValue', type: 'text' },
          { name: 'multiple', type: 'switch' },
          ...baseProperties
        ];

      case 'container':
      case 'table':
      case 'tabs':
      case 'accordion':
        return baseProperties;

      default:
        return [];
    }
  };

  const properties = getDataProperties();

  return (
    <div className="space-y-6">
      {properties.map((prop) => (
        <PropertyField
          key={prop.name}
          label={prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
          type={prop.type}
          value={component.data?.[prop.name as keyof typeof component.data]}
          onChange={(value) => onChange({
            data: {
              ...component.data,
              [prop.name]: value
            }
          })}
          options={prop.options}
        />
      ))}
    </div>
  );
};

export default DataTab;
