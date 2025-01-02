import React from 'react';
import classNames from 'classnames';
import { Step } from '../../types';

interface BasicProgressProps {
  steps: Step[];
  currentStep: number;
}

export const BasicProgress: React.FC<BasicProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={classNames(
              'text-sm font-medium',
              index === currentStep
                ? 'text-blue-600'
                : index < currentStep
                ? 'text-green-600'
                : 'text-gray-400'
            )}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};
