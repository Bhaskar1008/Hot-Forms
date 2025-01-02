import React from 'react';

interface PercentageProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const PercentageProgress: React.FC<PercentageProgressProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const percentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="mb-4">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {percentage}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};
