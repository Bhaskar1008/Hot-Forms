import React from 'react';
import { FormComponent } from '../../../types/form';
import { PropertyTab } from '../config/propertyTabs';
import classNames from 'classnames';

interface PropertyContentProps {
  tab: PropertyTab;
  component: FormComponent;
  orientation: 'horizontal' | 'vertical';
  onChange: (updates: Partial<FormComponent>) => void;
}

export const PropertyContent: React.FC<PropertyContentProps> = ({
  tab,
  component,
  orientation,
  onChange
}) => {
  const TabComponent = tab.component;
  const isVertical = orientation === 'vertical';

  return (
    <div className={classNames(
      'h-full flex flex-col',
      isVertical ? 'flex-1' : 'w-full'
    )}>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4">
          <TabComponent component={component} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
