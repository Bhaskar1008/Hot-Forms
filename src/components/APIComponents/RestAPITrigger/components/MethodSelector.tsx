import React from 'react';
import { APIMethod } from '../types';

interface MethodSelectorProps {
  value: APIMethod;
  onChange: (method: APIMethod) => void;
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({ value, onChange }) => {
  const methods: APIMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  
  const getMethodColor = (method: APIMethod) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'PATCH':
        return 'bg-purple-100 text-purple-800';
      case 'OPTIONS':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as APIMethod)}
      className={`px-4 py-2 rounded-md font-medium ${getMethodColor(value)}`}
    >
      {methods.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
};
