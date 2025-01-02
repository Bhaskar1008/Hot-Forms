import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ComponentToolbox from './ComponentToolbox';
import DropZone from '../DropZone/DropZone';
import PropertyEditor from './PropertyEditor';
import FormPreview from '../Preview/FormPreview';
import { Eye, Edit } from 'lucide-react';
import { usePanelState } from '../../hooks/usePanelState';
import PanelToggle from '../UI/PanelToggle';
import { JsonActions } from '../UI/JsonActions/JsonActions';
import classNames from 'classnames';

export const FormBuilder: React.FC = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { components, selectedComponent } = useSelector((state: RootState) => state.form);
  const {
    isComponentPanelOpen,
    isPropertiesPanelOpen,
    toggleComponentPanel,
    togglePropertiesPanel
  } = usePanelState();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="flex h-full" >
        {/* Component Panel */}
        <div className="relative flex-shrink-0" style={{ overflowX: 'auto' }}>
          <div
            className={classNames(
              'bg-white shadow-lg transition-all duration-300 ease-in-out',
              isComponentPanelOpen ? 'w-80' : 'w-0 overflow-hidden'
            )}
          >
            {!isPreviewMode && <ComponentToolbox />}
          </div>
          <PanelToggle
            isOpen={isComponentPanelOpen}
            onToggle={toggleComponentPanel}
            side="left"
            label="components"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="sticky top-0 z-10 flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {isPreviewMode ? 'Form Preview' : 'Form Builder'}
            </h1>
            <div className="flex items-center gap-4">
              <JsonActions />
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center px-4 py-2 rounded-md bg-white shadow-sm border transition-colors hover:bg-gray-50"
              >
                {isPreviewMode ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg min-h-[calc(100vh-12rem)]">
            {isPreviewMode ? (
              <FormPreview />
            ) : (
              <DropZone components={components} />
            )}
          </div>
        </div>

        {/* Properties Panel */}
        {!isPreviewMode && selectedComponent && (
          <div className="relative flex-shrink-0" style={{ overflowX: 'auto' }}>
            <div
              className={classNames(
                'bg-white shadow-lg transition-all duration-300 ease-in-out',
                isPropertiesPanelOpen ? 'w-96' : 'w-0 overflow-hidden'
              )}
            >
              <PropertyEditor componentId={selectedComponent} />
            </div>
            <PanelToggle
              isOpen={isPropertiesPanelOpen}
              onToggle={togglePropertiesPanel}
              side="right"
              label="properties"
            />
          </div>
        )}
      </div>
    </div>
  );
};
