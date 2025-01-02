import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateComponent } from '../../redux/slices/formSlice';
import { FormComponent } from '../../types/form';
import { Settings, Database, ShieldCheck, Wand2 } from 'lucide-react';
import classNames from 'classnames';
import DisplayTab from '../PropertyEditor/PropertyTabs/DisplayTab';
import DataTab from '../PropertyEditor/PropertyTabs/DataTab';
import ValidationTab from '../PropertyEditor/PropertyTabs/ValidationTab';

interface PropertyEditorProps {
  componentId: string | null;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.FC<any>;
}

const tabs: TabConfig[] = [
  { id: 'display', label: 'Display', icon: Settings },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'validation', label: 'Validation', icon: ShieldCheck },
  { id: 'logic', label: 'Logic', icon: Wand2 },
];

const PropertyEditor: React.FC<PropertyEditorProps> = ({ componentId }) => {
  const [activeTab, setActiveTab] = useState('display');
  const dispatch = useDispatch();
  const component = useSelector((state: RootState) =>
    state.form.components.find((c) => c.id === componentId)
  );

  if (!component) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-lg mb-2">No Component Selected</p>
        <p className="text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  const handleChange = (updates: Partial<FormComponent>) => {
    dispatch(updateComponent({ id: component.id, updates }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'display':
        return <DisplayTab component={component} onChange={handleChange} />;
      case 'data':
        return <DataTab component={component} onChange={handleChange} />;
      case 'validation':
        return <ValidationTab component={component} onChange={handleChange} />;
      case 'logic':
        return <div>Logic tab content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex space-x-1 p-2 bg-gray-50 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            )}
          >
            <tab.icon className={classNames(
              'w-4 h-4 mr-2',
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            )} />
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PropertyEditor;
