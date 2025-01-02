import React from 'react';
import { FormComponent } from '../../../types/form';
import { ComponentProperties } from '../../../types/propertyTypes';
import PropertyField from '../PropertyField';

interface LogicTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const LogicTab: React.FC<LogicTabProps> = ({ component, onChange }) => {
  const getLogicProperties = () => {
    const baseConditionalProperties = [
      { name: 'conditional.show', type: 'switch' },
      { name: 'conditional.when', type: 'text' },
      { name: 'conditional.eq', type: 'text' },
      { name: 'customConditional', type: 'textarea' }
    ];

    const componentType = component.type as keyof ComponentProperties;
    switch (componentType) {
      case 'text':
      case 'checkbox':
      case 'radio':
      case 'select':
      case 'datetime':
      case 'fileupload':
      case 'otp':
      case 'tags':
        return [
          ...baseConditionalProperties,
          { name: 'calculateValue', type: 'textarea' }
        ];

      case 'button':
        return [
          { name: 'onClick', type: 'textarea' },
          { name: 'customLogic', type: 'textarea' }
        ];

      case 'signature':
        return baseConditionalProperties;

      case 'container':
      case 'table':
      case 'tabs':
      case 'accordion':
        return [
          ...baseConditionalProperties,
          { name: 'calculateValue', type: 'textarea' }
        ];

      default:
        return baseConditionalProperties;
    }
  };

  const properties = getLogicProperties();

  const handleChange = (name: string, value: any) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      onChange({
        logic: {
          ...component.logic,
          [parent]: {
            ...component.logic?.[parent],
            [child]: value
          }
        }
      });
    } else {
      onChange({
        logic: {
          ...component.logic,
          [name]: value
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {properties.map((prop) => (
        <PropertyField
          key={prop.name}
          label={prop.name.split('.').map(part => 
            part.charAt(0).toUpperCase() + part.slice(1)
          ).join(' ')}
          type={prop.type}
          value={prop.name.includes('.') 
            ? component.logic?.[prop.name.split('.')[0]]?.[prop.name.split('.')[1]]
            : component.logic?.[prop.name]}
          onChange={(value) => handleChange(prop.name, value)}
          options={prop.options}
        />
      ))}
    </div>
  );
};

export default LogicTab;
