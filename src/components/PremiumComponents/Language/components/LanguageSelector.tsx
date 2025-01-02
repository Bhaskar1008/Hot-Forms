import React from 'react';
import { Check } from 'lucide-react';
import { availableLanguages } from '../config/languages';
import classNames from 'classnames';

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
  onLanguageSwitch: (language: string) => void;
  currentLanguage: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguages,
  onChange,
  onLanguageSwitch,
  currentLanguage
}) => {
  const handleLanguageToggle = (code: string) => {
    const newSelection = selectedLanguages.includes(code)
      ? selectedLanguages.filter(lang => lang !== code)
      : [...selectedLanguages, code];
    
    onChange(newSelection);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {availableLanguages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageToggle(language.code)}
            className={classNames(
              'px-3 py-1.5 rounded-full text-sm font-medium',
              'border transition-colors duration-200',
              selectedLanguages.includes(language.code)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            )}
          >
            <div className="flex items-center gap-2">
              {selectedLanguages.includes(language.code) && (
                <Check className="w-4 h-4" />
              )}
              {language.name}
            </div>
          </button>
        ))}
      </div>

      {selectedLanguages.length > 0 && (
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview Language
          </label>
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageSwitch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedLanguages.map(code => {
              const language = availableLanguages.find(lang => lang.code === code);
              return (
                <option key={code} value={code}>
                  {language?.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};
