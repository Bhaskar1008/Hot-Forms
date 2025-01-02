import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FormComponent } from '../types/form';
import { addComponent } from '../redux/slices/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { getNestedComponents } from '../utils/componentTree';

export const useComponentTree = (parentId: string) => {
  const dispatch = useDispatch();
  
  const components = useSelector((state: RootState) => 
    getNestedComponents(state.form.components, parentId)
  );

  const handleAddComponent = useCallback((component: FormComponent) => {
    const newComponent = {
      ...component,
      id: uuidv4(),
      parentId,
    };
    dispatch(addComponent(newComponent));
  }, [dispatch, parentId]);

  return {
    components,
    addComponent: handleAddComponent
  };
};
