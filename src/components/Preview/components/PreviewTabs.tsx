import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';

interface PreviewTabsProps {
  component: FormComponent;
  renderComponent: (component: FormComponent) => React.ReactNode;
}

const PreviewTabs: React.FC<PreviewTabsProps> = ({ component, renderComponent }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = component.display?.tabs || [];

  return (
    <div className="mb-4">
      {component.label && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">{component.label}</h3>
      )}
      <div className={`rounded-lg border border-gray-200 ${component.display?.customClass || ''}`}>
        <div className={`flex ${component.display?.orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-2 p-2 bg-gray-50 border-b`}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${activeTab === index 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {tabs.map((tab, index) => {
            if (activeTab !== index) return null;
            const tabComponents = component.children?.filter(
              c => c.parentId === `${component.id}-${tab.id}`
            );
            return (
              <div key={tab.id}>
                {tabComponents?.map(child => renderComponent(child))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewTabs;
