import React from 'react';
import { useDocsNavigation } from './hooks/useDocsNavigation';

export const DocsNavigation: React.FC = () => {
  const { sections, activeSection, setActiveSection } = useDocsNavigation();

  return (
    <nav className="w-64 flex-shrink-0">
      <div className="sticky top-8">
        <h2 className="text-lg font-semibold mb-4">Documentation</h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
