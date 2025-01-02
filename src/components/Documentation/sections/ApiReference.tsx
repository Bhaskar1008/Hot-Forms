import React from 'react';

export const ApiReference: React.FC = () => {
  return (
    <div>
      <h1>API Reference</h1>
      <p className="lead">Complete API documentation for Hot Form components.</p>

      <h2>HotForm Component</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="text-left py-2">Prop</th>
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">src</td>
            <td className="py-2">object</td>
            <td className="py-2">Form configuration object</td>
          </tr>
          <tr>
            <td className="py-2">onSubmit</td>
            <td className="py-2">(data: any) => void</td>
            <td className="py-2">Form submission handler</td>
          </tr>
          <tr>
            <td className="py-2">onChange</td>
            <td className="py-2">(data: any) => void</td>
            <td className="py-2">Form change handler</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
