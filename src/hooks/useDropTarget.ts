import { useDrop } from 'react-dnd';
import { FormComponent } from '../types/form';

interface UseDropTargetProps {
  onDrop: (component: FormComponent) => void;
}

export const useDropTarget = ({ onDrop }: UseDropTargetProps) => {
  return useDrop(() => ({
    accept: 'FORM_COMPONENT',
    drop: (item: FormComponent, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item);
        return { dropped: true };
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }), [onDrop]);
};
