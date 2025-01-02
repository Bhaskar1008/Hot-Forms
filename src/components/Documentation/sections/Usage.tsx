import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const Usage: React.FC = () => {
  return (
    <div>
      <h1>Usage Guide</h1>
      <p className="lead">Learn how to use Hot Form in your application.</p>

      <h2>Basic Form</h2>
      <CodeBlock language="typescript">
{`// Import the component
import { HotForm } from '@hotform/react';

// Your form configuration
const formConfig = {
  components: [
    {
      type: 'text',
      label: 'Name',
      required: true
    },
    {
      type: 'email',
      label: 'Email'
    }
  ]
};

// Render the form
function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <HotForm
      src={formConfig}
      onSubmit={handleSubmit}
    />
  );
}`}
      </CodeBlock>
    </div>
  );
};
