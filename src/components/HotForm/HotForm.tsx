import React, { useState } from 'react';
import { FormComponent } from '../../types/form';
import { componentMap } from '../../utils/componentMap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface HotFormProps {
  src: {
    components: FormComponent[];
  };
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void;
}

export const HotForm: React.FC<HotFormProps> = ({ src, onSubmit, onChange }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (id: string, value: any) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const renderComponent = (component: FormComponent): React.ReactNode => {
    const Component = componentMap[component.type];
    if (!Component) return null;

    // For layout components, handle nested rendering
    if (['container', 'table', 'tabs', 'collapse'].includes(component.type)) {
      return (
        <Component
          key={component.id}
          component={component}
          renderComponent={renderComponent}
          onChange={(value: any) => handleChange(component.id, value)}
        />
      );
    }

    // For regular form components
    return (
      <div key={component.id} className="mb-4">
        <Component
          component={component}
          value={formData[component.id]}
          onChange={(value: any) => handleChange(component.id, value)}
        />
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {src.components.map(renderComponent)}
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setFormData({})}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </DndProvider>
  );
};