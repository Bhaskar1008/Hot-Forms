import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { FormComponent } from '../../types/form';
import { useOrientation } from '../../hooks/useOrientation';
import { OrientationToggle } from '../UI/OrientationToggle';
import { componentTabs } from './config/componentTabs';
import classNames from 'classnames';

const ComponentToolbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');
  const { orientation, handleOrientationChange } = useOrientation();

  const DraggableComponent: React.FC<{ type: string; label: string; Icon: any }> = ({ 
    type, 
    label, 
    Icon 
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'FORM_COMPONENT',
      item: {
        type,
        label,
        required: false,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={classNames(
          'flex items-center p-3 rounded-lg cursor-move transition-all duration-200',
          'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50',
          'hover:shadow-sm hover:scale-[1.02]',
          isDragging ? 'opacity-50 bg-gray-50' : 'bg-white'
        )}
      >
        <Icon className="w-5 h-5 mr-3 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
        <h3 className="text-lg font-semibold text-gray-800">Hot-Form Components</h3>
        <OrientationToggle
          orientation={orientation}
          onChange={handleOrientationChange}
        />
      </div>
      
      <div className={classNames(
        'flex gap-1 p-2 bg-white border-b',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {componentTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              orientation === 'vertical' ? 'w-full justify-between' : 'flex-1',
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center">
              <tab.icon className={classNames(
                'w-4 h-4 mr-2',
                activeTab === tab.id ? 'text-white' : 'text-gray-500'
              )} />
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {componentTabs.map((tab) => (
          <div
            key={tab.id}
            className={classNames(
              'space-y-2 transition-all duration-300',
              activeTab === tab.id ? 'opacity-100' : 'hidden opacity-0'
            )}
          >
            {tab.components.map((component) => (
              <DraggableComponent
                key={component.type}
                type={component.type}
                label={component.label}
                Icon={component.icon}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentToolbox;
