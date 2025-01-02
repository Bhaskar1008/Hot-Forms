import React, { useState } from 'react';
import { Dialog } from '../../../UI/Dialog';
import { TestResult } from '../types';
import { TestResultView } from './TestResultView';
import { saveAPIDetails } from '../utils/apiStorage';

interface SaveAPIDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  testResult: TestResult;
}

export const SaveAPIDialog: React.FC<SaveAPIDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  testResult
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please enter a name for this API');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      await saveAPIDetails({
        name: name.trim(),
        response: testResult.response,
        isSuccess: testResult.isSuccess,
        error: testResult.error
      });

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save API details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Save API Details"
      size="lg"
    >
      <div className="space-y-6">
        <TestResultView result={testResult} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a unique name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save API'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};