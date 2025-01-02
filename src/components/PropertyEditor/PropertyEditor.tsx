import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { FormComponent } from '../../types/form';
import { propertyTabs } from './config/propertyTabs';
import { usePropertyPanelOrientation } from '../../hooks/usePropertyPanelOrientation';
import { updateComponent } from '../../redux/slices/formSlice';
import { PropertyHeader } from './components/PropertyHeader';
import { PropertyTabList } from './components/PropertyTabList';
import { PropertyContent } from './components/PropertyContent';
import classNames from 'classnames';

interface PropertyEditorProps {
  componentId: string;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ componentId }) => {
  const [activeTab, setActiveTab] = useState('display');
  const { orientation, toggleOrientation } = usePropertyPanelOrientation();
  const dispatch = useDispatch();
  
  const component = useSelector((state: RootState) => {
    const mainComponent = state.form.components.find(c => c.id === componentId);
    if (mainComponent) return mainComponent;

    // Check nested components
    for (const parent of state.form.components) {
      if ((parent.type === 'table' || parent.type === 'tabs') && parent.children) {
        const child = parent.children.find(c => c.id === componentId);
        if (child) return child;
      }
    }
    return null;
  });

  if (!component) {
    return <PropertyEditorEmpty />;
  }

  const handleChange = (updates: Partial<FormComponent>) => {
    dispatch(updateComponent({ id: component.id, updates }));
  };

  const currentTab = propertyTabs.find(tab => tab.id === activeTab)!;

  return (
    <div className="h-full flex flex-col">
      <PropertyHeader
        orientation={orientation}
        onOrientationChange={toggleOrientation}
      />
      
      <div className={classNames(
        'flex flex-1 min-h-0',
        orientation === 'vertical' ? 'flex-row' : 'flex-col'
      )}>
        <PropertyTabList
          tabs={propertyTabs}
          activeTab={activeTab}
          orientation={orientation}
          onTabChange={setActiveTab}
        />
        
        <div className={classNames(
          'flex-1 min-h-0 overflow-hidden',
          orientation === 'vertical' ? 'border-l' : 'border-t'
        )}>
          <PropertyContent
            tab={currentTab}
            component={component}
            orientation={orientation}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const PropertyEditorEmpty: React.FC = () => (
  <div className="h-full flex items-center justify-center bg-gray-50 p-8">
    <div className="text-center">
      <p className="text-lg font-medium text-gray-700 mb-2">
        No Component Selected
      </p>
      <p className="text-sm text-gray-500">
        Select a component to edit its properties
      </p>
    </div>
  </div>
);

export default PropertyEditor;
