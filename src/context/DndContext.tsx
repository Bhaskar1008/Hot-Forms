import React, { createContext, useContext, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { addComponent } from '../redux/slices/formSlice';
import { FormComponent } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

interface DndContextType {
  handleDrop: (item: FormComponent, targetId?: string) => void;
}

const DndContext = createContext<DndContextType | null>(null);

export const FormDndProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const handleDrop = (item: FormComponent, targetId?: string) => {
    const newComponent: FormComponent = {
      ...item,
      id: uuidv4(),
      parentId: targetId,
    };
    dispatch(addComponent(newComponent));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DndContext.Provider value={{ handleDrop }}>
        {children}
      </DndContext.Provider>
    </DndProvider>
  );
};

export const useDnd = () => {
  const context = useContext(DndContext);
  if (!context) {
    throw new Error('useDnd must be used within a FormDndProvider');
  }
  return context;
};
