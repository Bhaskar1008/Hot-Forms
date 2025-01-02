import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames';

interface ComponentSearchProps {
  onSearch: (query: string) => void;
}

const ComponentSearch: React.FC<ComponentSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <div className="px-4 py-2 border-b">
      <div
        className={classNames(
          'relative flex items-center rounded-md',
          'border transition-all duration-200',
          isFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
        )}
      >
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search components..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ComponentSearch;
