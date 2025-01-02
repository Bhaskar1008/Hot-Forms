import React from 'react';
import { Plus, X } from 'lucide-react';

interface Header {
  label: string;
  value: string;
}

interface TableHeaderManagerProps {
  headers: Header[];
  onChange: (headers: Header[]) => void;
}

const TableHeaderManager: React.FC<TableHeaderManagerProps> = ({ headers, onChange }) => {
  const addHeader = () => {
    onChange([...headers, { label: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    onChange(newHeaders);
  };

  const updateHeader = (index: number, field: 'label' | 'value', value: string) => {
    const newHeaders = headers.map((header, i) => {
      if (i === index) {
        return { ...header, [field]: value };
      }
      return header;
    });
    onChange(newHeaders);
  };

  return (
    <div className="space-y-4">
      {headers.map((header, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={header.label}
              onChange={(e) => updateHeader(index, 'label', e.target.value)}
              placeholder="Header Label"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={header.value}
              onChange={(e) => updateHeader(index, 'value', e.target.value)}
              placeholder="Header Key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => removeHeader(index)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addHeader}
        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add Header
      </button>
    </div>
  );
};

export default TableHeaderManager;
