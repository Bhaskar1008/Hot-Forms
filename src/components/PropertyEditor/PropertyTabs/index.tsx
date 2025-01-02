import React from 'react';
import { FormComponent } from '../../../types/form';
import { propertyTabs } from '../config/propertyTabs';
import { TabContent } from './TabContent';
import classNames from 'classnames';

interface PropertyTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  component: FormComponent;
  orientation: 'horizontal' | 'vertical';
}

export const PropertyTabs: React.FC<PropertyTabsProps> = ({
  activeTab,
  setActiveTab,
  component,
  orientation
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={classNames(
      'flex',
      isVertical ? 'flex-row h-full' : 'flex-col'
    )}>
      <div className={classNames(
        'bg-gray-50 border-b',
        isVertical ? 'w-48 border-r' : 'w-full'
      )}>
        <div className={classNames(
          'flex gap-1 p-2',
          isVertical ? 'flex-col' : 'flex-row'
        )}>
          {propertyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                isVertical ? 'w-full justify-between' : 'flex-1',
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              )}
            >
              <div className="flex items-center">
                <tab.icon className={classNames(
                  'w-4 h-4 mr-2',
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                )} />
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={classNames(
        'bg-white',
        isVertical ? 'flex-1' : 'w-full'
      )}>
        <div className="p-4 h-full overflow-y-auto">
          <TabContent
            tab={propertyTabs.find(t => t.id === activeTab)!}
            component={component}
          />
        </div>
      </div>
    </div>
  );
};
