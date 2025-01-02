import React from 'react';
import { useUITranslation } from '../hooks/useUITranslation';
import classNames from 'classnames';

interface TranslatedButtonProps {
  type: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export const TranslatedButton: React.FC<TranslatedButtonProps> = ({
  type,
  variant = 'primary',
  onClick,
  className
}) => {
  const { form } = useUITranslation();

  const getButtonText = () => {
    switch (type) {
      case 'submit':
        return form.submit();
      case 'reset':
        return form.reset();
      default:
        return '';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'px-4 py-2 rounded-md transition-colors w-full sm:w-auto',
        variant === 'primary' 
          ? 'text-white bg-blue-600 hover:bg-blue-700'
          : 'text-gray-700 bg-gray-100 hover:bg-gray-200',
        className
      )}
    >
      {getButtonText()}
    </button>
  );
};
