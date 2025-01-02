import React from 'react';
import { TestResult } from '../types';
import { formatDate } from '../utils/formatters';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestResultViewProps {
  result: TestResult;
}

export const TestResultView: React.FC<TestResultViewProps> = ({ result }) => {
  if (!result || !result.response) {
    return null;
  }

  const { response, isSuccess, error } = result;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <span className={`text-sm font-medium ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          {isSuccess ? 'Test Successful' : 'Test Failed'}
        </span>
        {response.timestamp && (
          <span className="text-xs text-gray-500">
            {formatDate(response.timestamp)}
          </span>
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-md">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    </div>
  );
};