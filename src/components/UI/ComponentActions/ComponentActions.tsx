import React from 'react';
import { Copy, X } from 'lucide-react';
import { FormComponent } from '../../../types/form';
import classNames from 'classnames';

interface ComponentActionsProps {
  component: FormComponent;
  onRemove: () => void;
  className?: string;
}

export const ComponentActions: React.FC<ComponentActionsProps> = ({
  component,
  onRemove,
  className
}) => {
  const handleCopyJson = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a clean copy of the component without circular references
    const cleanComponent = JSON.parse(JSON.stringify(component));
    const jsonString = JSON.stringify(cleanComponent, null, 2);
    
    navigator.clipboard.writeText(jsonString).then(() => {
      // Show a temporary tooltip or notification
      const tooltip = document.createElement('div');
      tooltip.className = 'fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md z-50';
      tooltip.textContent = 'Component JSON copied to clipboard!';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 2000);
    });
  };

  return (
    <div className={classNames(
      'absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity',
      className
    )}>
      <button
        onClick={handleCopyJson}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
        title="Copy component JSON"
      >
        <Copy className="w-4 h-4 text-blue-500" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:border-red-500 hover:bg-red-50"
        title="Remove component"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
};
