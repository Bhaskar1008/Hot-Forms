import React from 'react';
import { useDocsNavigation } from './hooks/useDocsNavigation';
import { Installation } from './sections/Installation';
import { Usage } from './sections/Usage';
import { LiveDemo } from './sections/LiveDemo';
import { ApiReference } from './sections/ApiReference';

export const DocsContent: React.FC = () => {
  const { activeSection } = useDocsNavigation();

  const renderContent = () => {
    switch (activeSection) {
      case 'installation':
        return <Installation />;
      case 'usage':
        return <Usage />;
      case 'live-demo':
        return <LiveDemo />;
      case 'api':
        return <ApiReference />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="prose max-w-none">
        {renderContent()}
      </div>
    </div>
  );
};
