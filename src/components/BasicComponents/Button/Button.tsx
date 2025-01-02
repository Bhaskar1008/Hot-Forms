import React from 'react';
import { FormComponent } from '../../../types/form';

interface ButtonProps {
  component: FormComponent;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ component, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={onClick}
      type="button"
    >
      {component.label}
    </button>
  );
};

export default Button;
