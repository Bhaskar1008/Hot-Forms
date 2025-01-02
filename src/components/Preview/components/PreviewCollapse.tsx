import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';

interface PreviewCollapseProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

const PreviewCollapse: React.FC<PreviewCollapseProps> = ({ component, renderComponent }) => {
  const [isExpanded, setIsExpanded] = useState(component.display?.initiallyExpanded ?? true);

  return (
    <div className="mb-4">
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{component.label}</h3>
      )}
      <div className={`border border-gray-200 rounded-lg ${component.display?.customClass || ''}`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900">
            {component.display?.collapseTitle || 'Content'}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="p-4">
            {component.children?.map(child => renderComponent(child))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCollapse;
