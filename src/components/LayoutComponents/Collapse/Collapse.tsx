import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { useNestedDrop } from '../../../hooks/useNestedDrop';
import { componentMap } from '../../../utils/componentMap';
import { ChevronDown, ChevronUp } from 'lucide-react';
import classNames from 'classnames';

interface CollapseProps {
  component: FormComponent;
}

const Collapse: React.FC<CollapseProps> = ({ component }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: component.id
  });

  const nestedComponents = component.children || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className={classNames(
        'border border-gray-200 rounded-lg overflow-hidden',
        component.display?.customClass
      )}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900">
            {component.display?.collapseTitle || 'Content'}
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {isOpen && (
          <div
            ref={drop}
            className={classNames(
              'p-4 transition-colors',
              isOver && canDrop ? 'bg-blue-50 ring-2 ring-blue-400' : 'bg-white'
            )}
          >
            {nestedComponents.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-gray-400">
                Drop components here
              </div>
            ) : (
              <div className="space-y-4">
                {nestedComponents.map((child) => {
                  const ChildComponent = componentMap[child.type];
                  return ChildComponent ? (
                    <div key={child.id} className="relative">
                      <ChildComponent component={child} />
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collapse;
