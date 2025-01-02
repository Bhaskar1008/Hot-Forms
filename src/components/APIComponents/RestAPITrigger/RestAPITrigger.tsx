import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { APITestDialog } from './components/APITestDialog';
import { SaveAPIDialog } from './components/SaveAPIDialog';
import { Network } from 'lucide-react';
import { TestResult } from './types';

interface RestAPITriggerProps {
  component: FormComponent;
  onChange?: (value: any) => void;
}

const RestAPITrigger: React.FC<RestAPITriggerProps> = ({ component, onChange }) => {
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setIsTestDialogOpen(false);
    setIsSaveDialogOpen(true);
  };

  const handleSaveComplete = () => {
    setIsSaveDialogOpen(false);
    onChange?.(testResult);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsTestDialogOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <Network className="w-4 h-4" />
        Test API
      </button>

      <APITestDialog
        isOpen={isTestDialogOpen}
        onClose={() => setIsTestDialogOpen(false)}
        onTestComplete={handleTestComplete}
      />

      {testResult && (
        <SaveAPIDialog
          isOpen={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          onSave={handleSaveComplete}
          testResult={testResult}
        />
      )}
    </div>
  );
};

export default RestAPITrigger;