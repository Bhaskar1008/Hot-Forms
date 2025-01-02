import React from 'react';
import { Download, Upload } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { importComponents } from '../../../redux/slices/formSlice';

export const JsonActions: React.FC = () => {
  const dispatch = useDispatch();
  const components = useSelector((state: RootState) => state.form.components);

  const handleExport = () => {
    const jsonString = JSON.stringify(components, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-components.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        dispatch(importComponents(json));
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        className="hidden"
        id="json-import"
      />
      <label
        htmlFor="json-import"
        className="flex items-center px-4 py-2 rounded-md bg-white shadow-sm border transition-colors hover:bg-gray-50 cursor-pointer"
      >
        <Upload className="w-4 h-4 mr-2" />
        Import JSON
      </label>
      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 rounded-md bg-white shadow-sm border transition-colors hover:bg-gray-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Export JSON
      </button>
    </div>
  );
};
