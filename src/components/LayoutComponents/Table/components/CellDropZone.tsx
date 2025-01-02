import React from 'react';
import classNames from 'classnames';
import { FormComponent } from '../../../../types/form';
import { useDrop } from 'react-dnd';

interface CellDropZoneProps {
  onDrop: (item: FormComponent) => void;
}

export const CellDropZone: React.FC<CellDropZoneProps> = ({ onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        onDrop(item);
      }
      return { dropped: true };
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      className={classNames(
        'flex items-center justify-center h-[100px] text-gray-400',
        'border-2 border-dashed border-gray-200 rounded-lg transition-colors',
        (isOver && canDrop) && 'border-blue-400 bg-blue-50'
      )}
    >
      Drop component here
    </div>
  );
};
