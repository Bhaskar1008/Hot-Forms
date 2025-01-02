import React from 'react';
import { useDispatch } from 'react-redux';
import { FormComponent } from '../../../types/form';
import { updateComponent } from '../../../redux/slices/formSlice';
import { Globe } from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';
import { LanguageSelector } from './components/LanguageSelector';

interface LanguageProps {
  component: FormComponent;
  onChange?: (value: string[]) => void;
}

const Language: React.FC<LanguageProps> = ({ component, onChange }) => {
  const dispatch = useDispatch();
  const { t, currentLanguage, setLanguage } = useTranslation();

  const handleLanguageChange = (languages: string[]) => {
    dispatch(updateComponent({
      id: component.id,
      updates: {
        settings: {
          ...component.settings,
          selectedLanguages: languages
        }
      }
    }));
    onChange?.(languages);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-5 h-5 text-blue-600" />
        <label className="block text-sm font-medium text-gray-700">
          {t('language.label')}
          {component.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      
      <LanguageSelector
        selectedLanguages={component.settings?.selectedLanguages || ['en']}
        onChange={handleLanguageChange}
        onLanguageSwitch={setLanguage}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default Language;
