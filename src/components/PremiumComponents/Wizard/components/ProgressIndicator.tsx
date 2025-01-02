import React from 'react';
import { Step, WizardType } from '../types';
import { BasicProgress } from './ProgressIndicators/BasicProgress';
import { PercentageProgress } from './ProgressIndicators/PercentageProgress';
import { AdvancedProgress } from './ProgressIndicators/AdvancedProgress';

interface ProgressIndicatorProps {
  type: WizardType;
  steps: Step[];
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  type,
  steps,
  currentStep
}) => {
  switch (type) {
    case 'percentage':
      return (
        <PercentageProgress
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      );
    case 'advanced':
      return (
        <AdvancedProgress
          steps={steps}
          currentStep={currentStep}
        />
      );
    default:
      return (
        <BasicProgress
          steps={steps}
          currentStep={currentStep}
        />
      );
  }
};
