import React from 'react';

export const UserTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-100 border-b border-gray-200" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center h-16 border-b border-gray-200 px-6">
            <div className="w-1/3 h-4 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded ml-4" />
            <div className="w-1/4 h-4 bg-gray-200 rounded ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
};