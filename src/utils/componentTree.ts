import { FormComponent } from '../types/form';

export const addToComponentTree = (
  components: FormComponent[],
  component: FormComponent,
  parentId: string
): boolean => {
  for (let i = 0; i < components.length; i++) {
    const current = components[i];
    
    // Handle table cell components
    if (current.type === 'table' && parentId.startsWith('cell-')) {
      if (!current.children) current.children = [];
      current.children.push(component);
      return true;
    }
    
    // Handle tabs components
    if (current.type === 'tabs' && parentId.includes(current.id)) {
      if (!current.children) current.children = [];
      current.children.push(component);
      return true;
    }
    
    // Recursively check children
    if (current.children?.length) {
      if (addToComponentTree(current.children, component, parentId)) {
        return true;
      }
    }
  }
  
  return false;
};

export const getNestedComponents = (
  components: FormComponent[],
  parentId: string
): FormComponent[] => {
  let result: FormComponent[] = [];
  
  for (const component of components) {
    if (component.parentId === parentId) {
      result.push(component);
    }
    
    if (component.children?.length) {
      result = result.concat(getNestedComponents(component.children, parentId));
    }
  }
  
  return result;
};
