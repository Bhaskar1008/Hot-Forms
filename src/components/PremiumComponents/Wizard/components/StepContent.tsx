import React from 'react';
import { NestedDropZone } from '../../../DropZone/NestedDropZone';
import { FormComponent } from '../../../../types/form';

interface StepContentProps {
  stepId: string;
  components: FormComponent[];
}

export const StepContent: React.FC<StepContentProps> = ({ stepId, components }) => {
  return (
    <NestedDropZone
      parentId={stepId}
      components={components}
      className="p-4 bg-white"
      placeholder="Drop form components here to build your step content"
    />
  );
};
