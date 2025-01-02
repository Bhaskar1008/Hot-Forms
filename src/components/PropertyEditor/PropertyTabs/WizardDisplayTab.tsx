import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';
import { IconSelector } from '../../PremiumComponents/Wizard/components/IconSelector/IconSelector';

interface WizardDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const WizardDisplayTab: React.FC<WizardDisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  const handleSettingsChange = (name: string, value: any) => {
    onChange({
      settings: {
        ...component.settings,
        [name]: value
      }
    });
  };

  const handleStepChange = (index: number, field: string, value: any) => {
    const steps = [...(component.settings?.steps || [])];
    steps[index] = { ...steps[index], [field]: value };
    handleSettingsChange('steps', steps);
  };

  const handleStepIconChange = (index: number, icon: { type: 'library' | 'custom'; value: string }) => {
    const steps = [...(component.settings?.steps || [])];
    steps[index] = { ...steps[index], icon };
    handleSettingsChange('steps', steps);
  };

  const handlePageCountChange = (value: number) => {
    const currentSteps = component.settings?.steps || [];
    const newSteps = Array(value).fill(null).map((_, index) => {
      return currentSteps[index] || {
        label: `Step ${index + 1}`,
        content: ''
      };
    });
    handleSettingsChange('steps', newSteps);
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
        label="Number of Steps"
        type="number"
        value={component.settings?.steps?.length || 1}
        onChange={handlePageCountChange}
        min={1}
        max={10}
      />

      <PropertyField
        label="Progress Type"
        type="select"
        value={component.settings?.type || 'basic'}
        onChange={(value) => handleSettingsChange('type', value)}
        options={[
          { label: 'Basic', value: 'basic' },
          { label: 'Percentage', value: 'percentage' },
          { label: 'Advanced', value: 'advanced' }
        ]}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Steps</h3>
        {(component.settings?.steps || []).map((step, index) => (
          <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-md">
            <h4 className="text-sm font-medium text-gray-700">Step {index + 1}</h4>

            <PropertyField
              label="Label"
              type="text"
              value={step.label}
              onChange={(value) => handleStepChange(index, 'label', value)}
            />

            <PropertyField
              label="Content"
              type="textarea"
              value={step.content}
              onChange={(value) => handleStepChange(index, 'content', value)}
            />

            {component.settings?.type === 'advanced' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Icon
                </label>
                <IconSelector
                  onSelect={(icon) => handleStepIconChange(index, icon)}
                  currentIcon={step.icon}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WizardDisplayTab;
