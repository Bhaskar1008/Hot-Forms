import React from 'react';
import classNames from 'classnames';
import * as LucideIcons from 'lucide-react';
import { Step } from '../../types';

interface AdvancedProgressProps {
  steps: Step[];
  currentStep: number;
}

export const AdvancedProgress: React.FC<AdvancedProgressProps> = ({ steps, currentStep }) => {
  const renderStepIcon = (step: Step, stepIndex: number) => {
    if (!step.icon) {
      return stepIndex + 1;
    }

    if (step.icon.type === 'library' && step.icon.value) {
      const IconComponent = LucideIcons[step.icon.value as keyof typeof LucideIcons];
      return IconComponent ? <IconComponent className="w-5 h-5" /> : stepIndex + 1;
    }

    if (step.icon.type === 'custom' && step.icon.value) {
      return (
        <img
          src={step.icon.value}
          alt={step.label}
          className="w-5 h-5 object-contain"
        />
      );
    }

    return stepIndex + 1;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={classNames(
                'flex items-center justify-center w-8 h-8 rounded-full',
                'transition-colors duration-200',
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              )}
            >
              {renderStepIcon(step, index)}
            </div>
            {index < steps.length - 1 && (
              <div
                className={classNames(
                  'w-16 h-1 mx-2',
                  'transition-colors duration-200',
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={classNames(
              'text-xs font-medium',
              index <= currentStep ? 'text-blue-600' : 'text-gray-500'
            )}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};
