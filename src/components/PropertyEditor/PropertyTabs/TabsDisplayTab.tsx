import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';
import { OrientationToggle } from '../../UI/OrientationToggle/OrientationToggle';

interface TabsDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const TabsDisplayTab: React.FC<TabsDisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  const handleOrientationChange = () => {
    const newOrientation = component.display?.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    handleDisplayChange('orientation', newOrientation);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PropertyField
          label="Label"
          type="text"
          value={component.display?.label || ''}
          onChange={(value) => handleDisplayChange('label', value)}
          required
        />
        <OrientationToggle
          orientation={component.display?.orientation || 'horizontal'}
          onChange={handleOrientationChange}
        />
      </div>

      {/* ... rest of the component remains the same */}
    </div>
  );
};

export default TabsDisplayTab;
