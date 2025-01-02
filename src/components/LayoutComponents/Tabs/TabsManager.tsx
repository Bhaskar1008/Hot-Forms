import React from 'react';
import { Plus, X } from 'lucide-react';
import classNames from 'classnames';

interface Tab {
  id: string;
  label: string;
}

interface TabsManagerProps {
  tabs: Tab[];
  onChange: (tabs: Tab[]) => void;
}

const TabsManager: React.FC<TabsManagerProps> = ({ tabs, onChange }) => {
  const addTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      label: `Tab ${tabs.length + 1}`
    };
    onChange([...tabs, newTab]);
  };

  const removeTab = (index: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((_, i) => i !== index);
      onChange(newTabs);
    }
  };

  const updateTabLabel = (index: number, label: string) => {
    const newTabs = tabs.map((tab, i) => {
      if (i === index) {
        return { ...tab, label };
      }
      return tab;
    });
    onChange(newTabs);
  };

  return (
    <div className="space-y-4">
      {tabs.map((tab, index) => (
        <div key={tab.id} className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={tab.label}
              onChange={(e) => updateTabLabel(index, e.target.value)}
              placeholder="Tab Label"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {tabs.length > 1 && (
            <button
              onClick={() => removeTab(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addTab}
        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add Tab
      </button>
    </div>
  );
};

export default TabsManager;
