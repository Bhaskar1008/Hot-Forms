import React from 'react';
import { FormComponent } from '../../../types/form';
import { BasicProgress } from './components/ProgressIndicators/BasicProgress';
import { PercentageProgress } from './components/ProgressIndicators/PercentageProgress';
import { AdvancedProgress } from './components/ProgressIndicators/AdvancedProgress';
import { NavigationButtons } from './components/NavigationButtons';
import { useWizardNavigation } from './hooks/useWizardNavigation';
import { WizardType } from './types';

interface WizardProps {
  component: FormComponent;
  onChange?: (value: any) => void;
}

const Wizard: React.FC<WizardProps> = ({ component, onChange }) => {
  const steps = component.settings?.steps || [];
  const type = (component.settings?.type || 'basic') as WizardType;
  const { currentStep, handleNext, handlePrevious } = useWizardNavigation(steps.length);

  const renderProgressIndicator = () => {
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

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="border border-gray-200 rounded-lg p-4">
        {renderProgressIndicator()}
        
        <div className="min-h-[200px] mb-4">
          {steps[currentStep]?.content}
        </div>
        
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Wizard;
