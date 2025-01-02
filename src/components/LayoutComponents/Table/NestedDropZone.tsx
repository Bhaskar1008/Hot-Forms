import React, { useRef, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addComponent, reorderComponents, setSelectedComponent } from '../../../redux/slices/formSlice';
import { FormComponent } from '../../../types/form';
import { componentMap } from '../../../utils/componentMap';
import { GripVertical, X } from 'lucide-react';
import classNames from 'classnames';

interface NestedDropZoneProps {
  parentId: string;
  components: FormComponent[];
  className?: string;
}

const NestedDropZone: React.FC<NestedDropZoneProps> = ({ 
  parentId, 
  components,
  className 
}) => {
  const dispatch = useDispatch();
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((item: FormComponent) => {
    const newComponent = {
      ...item,
      id: `${parentId}-${Date.now()}`,
      parentId
    };
    dispatch(addComponent(newComponent));
  }, [parentId, dispatch]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        handleDrop(item);
      }
      return { dropped: true };
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }), [handleDrop]);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.stopPropagation();
    dragItem.current = index;
    setIsDragging(true);
    
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.5';
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent, index: number) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = index;
    
    const target = e.currentTarget as HTMLElement;
    target.classList.add('border-blue-400', 'bg-blue-50');
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('border-blue-400', 'bg-blue-50');
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    
    if (isDragging && dragItem.current !== null && dragOverItem.current !== null) {
      const newComponents = [...components];
      const draggedItemContent = newComponents[dragItem.current];
      newComponents.splice(dragItem.current, 1);
      newComponents.splice(dragOverItem.current, 0, draggedItemContent);
      
      dispatch(reorderComponents({ 
        parentId,
        components: newComponents 
      }));
    }
    
    setIsDragging(false);
    dragItem.current = null;
    dragOverItem.current = null;
    
    document.querySelectorAll('.draggable-component').forEach(el => {
      (el as HTMLElement).classList.remove('border-blue-400', 'bg-blue-50');
    });
  }, [components, dispatch, isDragging, parentId]);

  const handleComponentClick = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    dispatch(setSelectedComponent(componentId));
  }, [dispatch]);

  return (
    <div
      ref={drop}
      className={classNames(
        'space-y-2 p-2 rounded-lg transition-colors',
        (isOver && canDrop) && 'bg-blue-50 ring-2 ring-blue-400',
        className
      )}
    >
      {components.map((component, index) => {
        const Component = componentMap[component.type];
        return Component ? (
          <div
            key={component.id}
            className={classNames(
              'draggable-component',
              'relative group bg-white rounded-lg border transition-all duration-200',
              isDragging ? 'border-transparent' : 'border-gray-200',
              'hover:border-blue-200 hover:shadow-sm'
            )}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <div className="absolute left-0 top-0 h-full flex items-center -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 cursor-move">
                <GripVertical className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newComponents = components.filter(c => c.id !== component.id);
                  dispatch(reorderComponents({ parentId, components: newComponents }));
                  dispatch(setSelectedComponent(null));
                }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:border-red-500 hover:bg-red-50"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>

            <div className="p-4 ml-6">
              <Component component={component} />
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default NestedDropZone;
