import React, { useCallback } from 'react';
import { FormComponent } from '../../../types/form';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  component: FormComponent;
  onChange?: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ component, onChange }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onChange?.(files);
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-1 text-sm text-gray-600">
          Drag and drop files here, or{' '}
          <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && onChange?.(e.target.files)}
              multiple
            />
          </label>
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
