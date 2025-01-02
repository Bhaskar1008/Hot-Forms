import React from 'react';
import { FormComponent } from '../../../../types/form';
import PropertyField from '../../../PropertyEditor/PropertyField';
import { availableLanguages } from '../config/languages';

interface LanguagePropertyEditorProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const LanguagePropertyEditor: React.FC<LanguagePropertyEditorProps> = ({
  component,
  onChange
}) => {
  const handleSettingsChange = (name: string, value: any) => {
    onChange({
      settings: {
        ...component.settings,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Label"
        type="text"
        value={component.label}
        onChange={(value) => onChange({ label: value })}
        required
      />

      <PropertyField
        label="Default Language"
        type="select"
        value={component.settings?.defaultLanguage || 'en'}
        onChange={(value) => handleSettingsChange('defaultLanguage', value)}
        options={availableLanguages.map(lang => ({
          label: lang.name,
          value: lang.code
        }))}
      />

      <PropertyField
        label="Show Language Selector"
        type="switch"
        value={component.settings?.showSelector ?? true}
        onChange={(value) => handleSettingsChange('showSelector', value)}
      />

      <PropertyField
        label="Auto-detect User Language"
        type="switch"
        value={component.settings?.autoDetect ?? false}
        onChange={(value) => handleSettingsChange('autoDetect', value)}
      />
    </div>
  );
};

export default LanguagePropertyEditor;
