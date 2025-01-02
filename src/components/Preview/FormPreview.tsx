import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { componentMap } from '../../utils/componentMap';
import { FormComponent } from '../../types/form';
import PreviewContainer from './components/PreviewContainer';
import PreviewTable from './components/PreviewTable';
import PreviewTabs from './components/PreviewTabs';
import PreviewCollapse from './components/PreviewCollapse';
import { TranslatedButton } from '../PremiumComponents/Language/components/TranslatedButton';
import { TranslationProvider } from '../PremiumComponents/Language/context/TranslationContext';

const FormPreview: React.FC = () => {
  const { components } = useSelector((state: RootState) => state.form);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleComponentChange = (componentId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [componentId]: value
    }));
  };

  const renderComponent = (component: FormComponent): React.ReactNode => {
    const Component = componentMap[component.type];
    if (!Component) return null;

    // For layout components, use special rendering
    if (['container', 'table', 'tabs', 'collapse', 'wizard'].includes(component.type)) {
      switch (component.type) {
        case 'container':
          return <PreviewContainer key={component.id} component={component} renderComponent={renderComponent} />;
        case 'table':
          return <PreviewTable key={component.id} component={component} renderComponent={renderComponent} />;
        case 'tabs':
          return <PreviewTabs key={component.id} component={component} renderComponent={renderComponent} />;
        case 'collapse':
          return <PreviewCollapse key={component.id} component={component} renderComponent={renderComponent} />;
        case 'wizard':
          return (
            <Component
              key={component.id}
              component={component}
              renderComponent={renderComponent}
              onChange={(value: any) => handleComponentChange(component.id, value)}
            />
          );
      }
    }

    // For regular form components
    return (
      <div key={component.id} className="mb-4">
        <Component
          component={component}
          value={formData[component.id]}
          onChange={(value: any) => handleComponentChange(component.id, value)}
        />
      </div>
    );
  };

  return (
    <TranslationProvider>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {components.map(component => renderComponent(component))}
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-6 border-t">
              <TranslatedButton
                type="reset"
                variant="secondary"
                onClick={() => setFormData({})}
              />
              <TranslatedButton
                type="submit"
                variant="primary"
              />
            </div>
          </form>
        </div>
        
        <div className="mt-6 p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Form Data</h3>
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </TranslationProvider>
  );
};

export default FormPreview;
