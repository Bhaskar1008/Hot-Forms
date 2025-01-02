import React from 'react';
import { PropertyTab } from '../config/propertyTabs';
import classNames from 'classnames';

interface PropertyTabListProps {
  tabs: PropertyTab[];
  activeTab: string;
  orientation: 'horizontal' | 'vertical';
  onTabChange: (tabId: string) => void;
}

export const PropertyTabList: React.FC<PropertyTabListProps> = ({
  tabs,
  activeTab,
  orientation,
  onTabChange
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={classNames(
      'bg-gray-50 border-b',
      isVertical ? 'w-48 border-r' : 'w-full'
    )}>
      <div className={classNames(
        'flex gap-1 p-2',
        isVertical ? 'flex-col' : 'flex-row'
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
  );
};
