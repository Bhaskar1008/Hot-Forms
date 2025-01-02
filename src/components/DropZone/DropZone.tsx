import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setSelectedComponent, reorderComponents } from '../../redux/slices/formSlice';
import { FormComponent } from '../../types/form';
import { useDnd } from '../../context/DndContext';
import { GripVertical } from 'lucide-react';
import { ComponentActions } from '../UI/ComponentActions/ComponentActions';
import classNames from 'classnames';
import { componentMap } from '../../utils/componentMap';

interface DropZoneProps {
  components?: FormComponent[];
}

const DropZone: React.FC<DropZoneProps> = ({ components = [] }) => {
  const dispatch = useDispatch();
  const { handleDrop } = useDnd();
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      if (!monitor.didDrop()) {
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }), [handleDrop]);

  const handleDragStart = (e: React.DragEvent, position: number) => {
    e.stopPropagation();
    dragItem.current = position;
    setIsDragging(true);
    e.currentTarget.classList.add('opacity-50', 'border-blue-500', 'shadow-lg');
  };

  const handleDragEnter = (e: React.DragEvent, position: number) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = position;
    
    const dropTargets = document.querySelectorAll('.component-item');
    dropTargets.forEach((target, index) => {
      if (index === position) {
        target.classList.add('border-blue-500', 'border-dashed');
      } else {
        target.classList.remove('border-blue-500', 'border-dashed');
      }
    });
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);

    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newComponents = [...components];
      const draggedItemContent = newComponents[dragItem.current];
      newComponents.splice(dragItem.current, 1);
      newComponents.splice(dragOverItem.current, 0, draggedItemContent);
      dispatch(reorderComponents({ components: newComponents }));
    }
    
    // Clean up visual feedback
    const dropTargets = document.querySelectorAll('.component-item');
    dropTargets.forEach(target => {
      target.classList.remove('opacity-50', 'border-blue-500', 'border-dashed', 'shadow-lg');
    });
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('border-blue-500', 'border-dashed');
  };

  const handleComponentClick = (id: string) => {
    dispatch(setSelectedComponent(id));
  };

  const handleRemoveComponent = (id: string) => {
    const newComponents = components.filter(c => c.id !== id);
    dispatch(reorderComponents({ components: newComponents }));
    dispatch(setSelectedComponent(null));
  };

  return (
    <div
      ref={drop}
      className={classNames(
        'min-h-[calc(100vh-4rem)] p-4 rounded-lg transition-colors duration-200',
        'border-2 border-dashed',
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      )}
    >
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-[200px] text-gray-500">
          <div className="text-center">
            <p className="mb-2 text-lg">Drag and drop components here</p>
            <p className="text-sm text-gray-400">Components will appear in the order they are added</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {components.map((component, index) => {
            const Component = componentMap[component.type];
            return Component ? (
              <div
                key={component.id}
                className={classNames(
                  'component-item relative group',
                  'rounded-lg border border-transparent',
                  'hover:border-blue-200 hover:bg-blue-50',
                  'transition-all duration-200'
                )}
                onClick={() => handleComponentClick(component.id)}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragEnd}
              >
                <div 
                  className="absolute left-0 inset-y-0 flex items-center -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:border-blue-500">
                    <GripVertical className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                
                <ComponentActions
                  component={component}
                  onRemove={() => handleRemoveComponent(component.id)}
                />

                <div className="p-4 ml-8">
                  <Component component={component} />
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default DropZone;
