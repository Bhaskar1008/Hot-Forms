import React from 'react';
import { FormComponent } from '../../../types/form';
import classNames from 'classnames';

interface PreviewContainerProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ component, renderComponent }) => {
  return (
    <div className={classNames(
      'p-4 rounded-lg border border-gray-200',
      component.display?.customClass
    )}>
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{component.label}</h3>
      )}
      <div className="space-y-4">
        {component.children?.map(child => (
          <div key={child.id}>
            {renderComponent(child)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewContainer;
