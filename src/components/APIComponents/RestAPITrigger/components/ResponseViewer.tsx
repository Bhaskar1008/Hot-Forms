import React from 'react';
import { APIResponse } from '../types';

interface ResponseViewerProps {
  response: APIResponse;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Response</h3>
        <span className={`text-sm font-medium ${getStatusColor(response.status)}`}>
          {response.status} {response.statusText}
        </span>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
      
      <div className="text-xs text-gray-500">
        Response received at: {new Date(response.timestamp).toLocaleString()}
      </div>
    </div>
  );
};
