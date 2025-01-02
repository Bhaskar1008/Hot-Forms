import React from 'react';

interface RequestBodyProps {
  value: string;
  onChange: (value: string) => void;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Request Body</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter request body (JSON)"
        rows={5}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      />
    </div>
  );
};
