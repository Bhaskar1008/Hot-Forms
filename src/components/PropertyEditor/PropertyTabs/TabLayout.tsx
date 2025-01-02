import React from 'react';
import { Settings, Database, ShieldCheck, Wand2 } from 'lucide-react';
import classNames from 'classnames';

interface Tab {
  id: string;
  label: string;
  icon: React.FC<any>;
}

const tabs: Tab[] = [
  { id: 'display', label: 'Display', icon: Settings },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'validation', label: 'Validation', icon: ShieldCheck },
  { id: 'logic', label: 'Logic', icon: Wand2 }
];

interface TabLayoutProps {
  activeTab: string;
  orientation: 'horizontal' | 'vertical';
  onTabChange: (tabId: string) => void;
}

export const TabLayout: React.FC<TabLayoutProps> = ({
  activeTab,
  orientation,
  onTabChange
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <nav className={classNames(
      'bg-gray-50',
      isVertical ? 'w-48 border-r' : 'w-full border-b'
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
              'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              isVertical ? 'w-full justify-start' : 'flex-1 justify-center',
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            )}
          >
            <tab.icon className={classNames(
              'w-4 h-4 mr-2',
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            )} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
