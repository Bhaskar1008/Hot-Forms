import React, { useState, KeyboardEvent } from 'react';
import { FormComponent } from '../../../types/form';
import { X } from 'lucide-react';

interface TagsProps {
  component: FormComponent;
  onChange?: (tags: string[]) => void;
  value?: string[];
}

const Tags: React.FC<TagsProps> = ({ component, onChange, value = [] }) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>(value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      const newTags = [...tags, input.trim()];
      setTags(newTags);
      setInput('');
      onChange?.(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full border-none focus:outline-none p-1"
          placeholder="Type and press Enter to add tags"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Tags;
