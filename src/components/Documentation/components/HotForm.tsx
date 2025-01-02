import React from 'react';
import { FormComponent } from '../../../types/form';
import { componentMap } from '../../../utils/componentMap';

interface HotFormProps {
  src: {
    components: FormComponent[];
  };
  onSubmit?: (data: any) => void;
  onChange?: (data: any) => void;
}

export const HotForm: React.FC<HotFormProps> = ({ src, onSubmit, onChange }) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (id: string, value: any) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {src.components.map((component) => {
        const Component = componentMap[component.type];
        return Component ? (
          <Component
            key={component.id}
            component={component}
            value={formData[component.id]}
            onChange={(value) => handleChange(component.id, value)}
          />
        ) : null;
      })}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
