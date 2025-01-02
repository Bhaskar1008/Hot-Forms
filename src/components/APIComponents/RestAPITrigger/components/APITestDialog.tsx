import React, { useState } from 'react';
import { Dialog } from '../../../UI/Dialog';
import { MethodSelector } from './MethodSelector';
import { HeadersEditor } from './HeadersEditor';
import { RequestBody } from './RequestBody';
import { ResponseViewer } from './ResponseViewer';
import { APIMethod, TestResult } from '../types';
import { testAPI } from '../utils/apiTester';

interface APITestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTestComplete: (result: TestResult) => void;
}

export const APITestDialog: React.FC<APITestDialogProps> = ({
  isOpen,
  onClose,
  onTestComplete
}) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<APIMethod>('GET');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleTest = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      const response = await testAPI({
        url,
        method,
        headers,
        body: method !== 'GET' ? body : undefined
      });

      onTestComplete({
        response,
        isSuccess: response.status >= 200 && response.status < 300,
        error: response.status >= 400 ? response.statusText : undefined
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to test API';
      setError(errorMessage);
      
      // Create a failed test result
      onTestComplete({
        response: {
          status: 0,
          statusText: 'Error',
          data: { error: errorMessage },
          timestamp: new Date().toISOString()
        },
        isSuccess: false,
        error: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Test API Endpoint"
      size="lg"
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter API URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <MethodSelector value={method} onChange={setMethod} />
        </div>

        <HeadersEditor headers={headers} onChange={setHeaders} />
        
        {method !== 'GET' && (
          <RequestBody value={body} onChange={setBody} />
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleTest}
            disabled={!url || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test API'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};