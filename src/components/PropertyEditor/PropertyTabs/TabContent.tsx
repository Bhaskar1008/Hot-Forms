import React from 'react';
import classNames from 'classnames';

interface TabContentProps {
  orientation: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ orientation, children }) => {
  return (
    <div className={classNames(
      'h-full bg-white flex flex-col',
      orientation === 'vertical' ? 'flex-1' : 'w-full'
    )}>
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};
