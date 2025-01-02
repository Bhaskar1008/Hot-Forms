import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import classNames from 'classnames';

interface AccordionProps {
  component: FormComponent;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ component, children }) => {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const sections = component.settings?.sections || [];

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mb-4">
      <div className="border border-gray-200 rounded-lg divide-y">
        {sections.map((section: { title: string; content: React.ReactNode }, index: number) => (
          <div key={index} className="border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className={classNames(
                'w-full px-4 py-3 flex justify-between items-center text-left',
                openSections.includes(index) ? 'bg-gray-50' : 'bg-white'
              )}
            >
              <span className="text-sm font-medium text-gray-900">{section.title}</span>
              {openSections.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openSections.includes(index) && (
              <div className="px-4 py-3 bg-white">
                {section.content}
                {children}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
