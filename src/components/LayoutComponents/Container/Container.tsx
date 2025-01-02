import React from 'react';
import { FormComponent } from '../../../types/form';
import { useNestedDrop } from '../../../hooks/useNestedDrop';
import { componentMap } from '../../../utils/componentMap';
import classNames from 'classnames';

interface ContainerProps {
  component: FormComponent;
}

const Container: React.FC<ContainerProps> = ({ component }) => {
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
      
      <div
        ref={drop}
        className={classNames(
          'min-h-[100px] p-4 rounded-lg border-2 transition-colors',
          isOver && canDrop ? 'border-blue-400 bg-blue-50' : 'border-gray-200',
          component.display?.customClass
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
    </div>
  );
};

export default Container;
