import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FormComponent } from '../types/form';

export const useNestedComponents = (parentId: string) => {
  return useSelector((state: RootState) => {
    const findComponents = (components: FormComponent[]): FormComponent[] => {
      let result: FormComponent[] = [];
      
      for (const component of components) {
        // Check if this component has the target parentId
        if (component.parentId === parentId) {
          result.push(component);
        }
        
        // Check children recursively
        if (component.children?.length) {
          result = result.concat(findComponents(component.children));
        }
      }
      
      return result;
    };

    return findComponents(state.form.components);
  });
};
