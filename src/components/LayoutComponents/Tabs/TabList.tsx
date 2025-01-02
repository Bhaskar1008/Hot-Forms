import React from 'react';
import { Plus, ArrowLeftRight, ArrowUpDown } from 'lucide-react';
import classNames from 'classnames';

interface Tab {
  id: string;
  label: string;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: number;
  orientation: 'horizontal' | 'vertical';
  onTabClick: (index: number) => void;
  onAddTab: () => void;
  onTabRename: (index: number, newLabel: string) => void;
  onOrientationChange: (orientation: 'horizontal' | 'vertical') => void;
}

const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTab,
  orientation,
  onTabClick,
  onAddTab,
  onTabRename,
  onOrientationChange,
}) => {
  const handleTabDoubleClick = (index: number) => {
    const newLabel = prompt('Enter new tab name:', tabs[index].label);
    if (newLabel) {
      onTabRename(index, newLabel);
    }
  };

  const isVertical = orientation === 'vertical';

  return (
    <div className={classNames(
      'bg-gray-50',
      isVertical ? 'w-48' : 'w-full',
      'flex',
      isVertical ? 'flex-col' : 'flex-row items-center',
      'p-2 gap-2'
    )}>
      <div className={classNames(
        'flex flex-1 gap-1',
        isVertical ? 'flex-col w-full' : 'flex-row'
      )}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(index)}
            onDoubleClick={() => handleTabDoubleClick(index)}
            className={classNames(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              isVertical && 'w-full text-left',
              activeTab === index
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={classNames(
        'flex gap-1',
        isVertical ? 'flex-row w-full justify-end border-t pt-2' : 'flex-row'
      )}>
        <button
          onClick={onAddTab}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
          title="Add new tab"
        >
          <Plus className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => onOrientationChange(isVertical ? 'horizontal' : 'vertical')}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
          title={`Switch to ${isVertical ? 'horizontal' : 'vertical'} layout`}
        >
          {isVertical ? (
            <ArrowLeftRight className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TabList;
