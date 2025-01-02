import React from 'react';
import { FormComponent } from '../../../types/form';
import { TabLayout } from './TabLayout';
import { TabContent } from './TabContent';
import DisplayTab from './DisplayTab';
import DataTab from './DataTab';
import ValidationTab from './ValidationTab';
import LogicTab from './LogicTab';
import classNames from 'classnames';

interface PropertyTabsProps {
  component: FormComponent;
  orientation: 'horizontal' | 'vertical';
  onChange: (updates: Partial<FormComponent>) => void;
}

export const PropertyTabs: React.FC<PropertyTabsProps> = ({
  component,
  orientation,
  onChange
}) => {
  const [activeTab, setActiveTab] = React.useState('display');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'display':
        return <DisplayTab component={component} onChange={onChange} />;
      case 'data':
        return <DataTab component={component} onChange={onChange} />;
      case 'validation':
        return <ValidationTab component={component} onChange={onChange} />;
      case 'logic':
        return <LogicTab component={component} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className={classNames(
      'flex h-full',
      orientation === 'vertical' ? 'flex-row' : 'flex-col'
    )}>
      <TabLayout
        activeTab={activeTab}
        orientation={orientation}
        onTabChange={setActiveTab}
      />
      <div className="flex-1 overflow-hidden">
        <TabContent orientation={orientation}>
          {renderTabContent()}
        </TabContent>
      </div>
    </div>
  );
};
