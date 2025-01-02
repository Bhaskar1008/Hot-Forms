import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComponent } from '../../../../redux/slices/formSlice';
import { FormComponent } from '../../../../types/form';
import { RootState } from '../../../../redux/store';

export const useTabContent = (tabId: string, parentId: string) => {
  const dispatch = useDispatch();
  
  const components = useSelector((state: RootState) => {
    const findComponents = (components: FormComponent[]): FormComponent[] => {
      let result: FormComponent[] = [];
      
      for (const component of components) {
        if (component.id === parentId && component.children) {
          result = result.concat(
            component.children.filter(c => c.parentId === `${parentId}-${tabId}`)
          );
        }
        
        if (component.children) {
          result = result.concat(findComponents(component.children));
        }
      }
      
      return result;
    };

    return findComponents(state.form.components);
  });

  const handleDrop = useCallback((item: FormComponent) => {
    const newComponent = {
      ...item,
      id: `${parentId}-${tabId}-${Date.now()}`,
      parentId: `${parentId}-${tabId}`
    };
    dispatch(addComponent(newComponent));
  }, [parentId, tabId, dispatch]);

  return {
    components,
    handleDrop
  };
};
