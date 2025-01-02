import React from 'react';
import { DocsNavigation } from './DocsNavigation';
import { DocsContent } from './DocsContent';

export const DocsLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <DocsNavigation />
          <DocsContent />
        </div>
      </div>
    </div>
  );
};
