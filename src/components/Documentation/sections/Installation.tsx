import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const Installation: React.FC = () => {
  return (
    <div>
      <h1>Installation</h1>
      <p className="lead">Get started with Hot Form in your project.</p>
      
      <h2>NPM Installation</h2>
      <CodeBlock language="bash">
        npm install @hotform/react
      </CodeBlock>

      <h2>Basic Setup</h2>
      <CodeBlock language="typescript">
{`import { HotForm } from '@hotform/react';
import formConfig from './form-config.json';

function App() {
  return <HotForm src={formConfig} />;
}`}
      </CodeBlock>
    </div>
  );
};
