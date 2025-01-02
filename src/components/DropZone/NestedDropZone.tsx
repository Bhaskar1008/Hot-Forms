import React from 'react';
import { useNestedDrop } from '../../hooks/useNestedDrop';
import { FormComponent } from '../../types/form';
import { componentMap } from '../../utils/componentMap';
import classNames from 'classnames';

interface NestedDropZoneProps {
  parentId: string;
  components?: FormComponent[];
  className?: string;
  placeholder?: string;
}

export const NestedDropZone: React.FC<NestedDropZoneProps> = ({
  parentId,
  components = [],
  className,
  placeholder = 'Drop components here'
}) => {
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId,
    isNested: true
  });

  return (
    <div
      ref={drop}
      className={classNames(
        'min-h-[100px] rounded-lg transition-colors',
        (isOver && canDrop) && 'bg-blue-50 ring-2 ring-blue-400',
        !components.length && 'flex items-center justify-center',
        className
      )}
    >
      {components.length === 0 ? (
        <div className="text-gray-400 text-sm">
          {placeholder}
        </div>
      ) : (
        <div className="space-y-4">
          {components.map(component => {
            const Component = componentMap[component.type];
            return Component ? (
              <div key={component.id} className="relative">
                <Component component={component} />
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};
