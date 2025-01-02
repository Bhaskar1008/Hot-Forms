import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import TabList from './TabList';
import TabContent from './TabContent';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { updateComponent } from '../../../redux/slices/formSlice';

interface TabsProps {
  component: FormComponent;
}

const Tabs: React.FC<TabsProps> = ({ component }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const {
    orientation = 'horizontal',
    tabs = [{ id: 'tab-1', label: 'Tab 1' }],
    showBorder = true,
    rounded = true,
    shadow = true,
  } = component.display || {};

  const handleAddTab = () => {
    const newTabs = [
      ...tabs,
      { id: `tab-${Date.now()}`, label: `Tab ${tabs.length + 1}` }
    ];
    dispatch(updateComponent({
      id: component.id,
      updates: {
        display: {
          ...component.display,
          tabs: newTabs
        }
      }
    }));
  };

  const handleTabRename = (index: number, newLabel: string) => {
    const newTabs = tabs.map((tab, i) => 
      i === index ? { ...tab, label: newLabel } : tab
    );
    dispatch(updateComponent({
      id: component.id,
      updates: {
        display: {
          ...component.display,
          tabs: newTabs
        }
      }
    }));
  };

  const handleOrientationChange = (newOrientation: 'horizontal' | 'vertical') => {
    dispatch(updateComponent({
      id: component.id,
      updates: {
        display: {
          ...component.display,
          orientation: newOrientation
        }
      }
    }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div
        className={classNames(
          'transition-all duration-200',
          showBorder && 'border border-gray-200',
          rounded && 'rounded-lg',
          shadow && 'shadow-sm',
          orientation === 'vertical' ? 'flex' : 'block'
        )}
      >
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          orientation={orientation}
          onTabClick={setActiveTab}
          onAddTab={handleAddTab}
          onTabRename={handleTabRename}
          onOrientationChange={handleOrientationChange}
        />

        <div className={classNames(
          'flex-1',
          orientation === 'vertical' ? 'border-l' : 'border-t'
        )}>
          {tabs.map((tab, index) => (
            <TabContent
              key={tab.id}
              tabId={tab.id}
              parentId={component.id}
              isActive={activeTab === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
