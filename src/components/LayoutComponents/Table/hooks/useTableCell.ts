import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComponent } from '../../../../redux/slices/formSlice';
import { FormComponent } from '../../../../types/form';
import { RootState } from '../../../../redux/store';

export const useTableCell = (cellId: string) => {
  const dispatch = useDispatch();
  
  const cellComponents = useSelector((state: RootState) => {
    // Find all tables (both direct and nested in tabs)
    const findTableComponents = (components: FormComponent[]): FormComponent[] => {
      let result: FormComponent[] = [];
      
      for (const component of components) {
        if (component.type === 'table') {
          if (component.children?.some(c => c.parentId === cellId)) {
            result = result.concat(component.children.filter(c => c.parentId === cellId));
          }
        }
        
        // Check nested components
        if (component.children) {
          result = result.concat(findTableComponents(component.children));
        }
      }
      
      return result;
    };

    return findTableComponents(state.form.components);
  });

  const handleDrop = useCallback((item: FormComponent) => {
    const cellComponent = {
      ...item,
      id: `${cellId}-${Date.now()}`,
      parentId: cellId
    };
    dispatch(addComponent(cellComponent));
  }, [cellId, dispatch]);

  return {
    cellComponents,
    handleDrop
  };
};
