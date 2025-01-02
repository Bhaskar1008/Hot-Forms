import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';

interface CollapseDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const CollapseDisplayTab: React.FC<CollapseDisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Label"
        type="text"
        value={component.display?.label || ''}
        onChange={(value) => handleDisplayChange('label', value)}
        required
      />

      <PropertyField
        label="Collapse Title"
        type="text"
        value={component.display?.collapseTitle || ''}
        onChange={(value) => handleDisplayChange('collapseTitle', value)}
      />

      <PropertyField
        label="Initially Expanded"
        type="switch"
        value={component.display?.initiallyExpanded ?? true}
        onChange={(value) => handleDisplayChange('initiallyExpanded', value)}
      />

      <PropertyField
        label="Show Border"
        type="switch"
        value={component.display?.showBorder ?? true}
        onChange={(value) => handleDisplayChange('showBorder', value)}
      />

      <PropertyField
        label="Custom Class"
        type="text"
        value={component.display?.customClass || ''}
        onChange={(value) => handleDisplayChange('customClass', value)}
      />
    </div>
  );
};

export default CollapseDisplayTab;
