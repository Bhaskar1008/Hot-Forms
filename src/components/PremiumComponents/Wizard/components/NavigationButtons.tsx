import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={classNames(
          'flex items-center px-4 py-2 rounded-md text-sm font-medium',
          'transition-colors duration-200',
          currentStep === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={classNames(
          'flex items-center px-4 py-2 rounded-md text-sm font-medium',
          'transition-colors duration-200',
          currentStep === totalSteps - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        )}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};
