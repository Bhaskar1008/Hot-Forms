import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { IconValidation } from '../../types';
import { validateIcon } from '../../utils/iconValidation';

interface CustomIconUploadProps {
  onUpload: (base64: string) => void;
  currentIcon?: string;
  validation: IconValidation;
}

export const CustomIconUpload: React.FC<CustomIconUploadProps> = ({
  onUpload,
  currentIcon,
  validation
}) => {
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationResult = await validateIcon(file, validation);
    if (!validationResult.isValid) {
      setError(validationResult.error);
      return;
    }

    setError(undefined);
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpload('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={validation.allowedTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Icon
        </button>
        {currentIcon && (
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {currentIcon && (
        <div className="w-8 h-8 border border-gray-200 rounded-md">
          <img
            src={currentIcon}
            alt="Custom icon"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
