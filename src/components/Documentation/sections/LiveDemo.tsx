import React, { useState } from 'react';
import { HotForm } from '../components/HotForm';
import { CodeBlock } from '../components/CodeBlock';
import { JsonEditor } from '../components/JsonEditor';

export const LiveDemo: React.FC = () => {
  const [formConfig, setFormConfig] = useState({
    components: [
      {
        type: 'text',
        label: 'Full Name',
        required: true
      },
      {
        type: 'email',
        label: 'Email Address',
        required: true
      }
    ]
  });

  return (
    <div>
      <h1>Live Demo</h1>
      <p className="lead">Try Hot Form with this interactive demo.</p>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Form Configuration</h3>
          <JsonEditor
            value={formConfig}
            onChange={setFormConfig}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <div className="p-4 border rounded-lg bg-white">
            <HotForm src={formConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};
