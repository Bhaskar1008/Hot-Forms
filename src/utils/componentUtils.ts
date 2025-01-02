import { FormComponent } from '../types/form';

export const findComponentById = (
  components: FormComponent[],
  id: string
): FormComponent | null => {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children?.length) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findParentComponent = (
  components: FormComponent[],
  childId: string
): FormComponent | null => {
  for (const component of components) {
    if (component.type === 'table' && childId.startsWith('cell-')) {
      return component;
    }
    
    if (component.type === 'tabs' && childId.includes(component.id)) {
      return component;
    }
    
    if (component.children?.some(child => child.id === childId)) {
      return component;
    }
    
    if (component.children?.length) {
      const found = findParentComponent(component.children, childId);
      if (found) return found;
    }
  }
  return null;
};

export const updateComponentInTree = (
  components: FormComponent[],
  id: string,
  updates: Partial<FormComponent>
): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components[i] = { ...components[i], ...updates };
      return true;
    }
    
    const children = components[i].children;
    if (children?.length) {
      if (updateComponentInTree([...children], id, updates)) {
        return true;
      }
    }
  }
  return false;
};

export const removeComponentFromTree = (
  components: FormComponent[],
  id: string
): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components.splice(i, 1);
      return true;
    }
    
    const children = components[i].children;
    if (children?.length) {
      if (removeComponentFromTree([...children], id)) {
        if (children.length === 0) {
          components[i].children = undefined;
        }
        return true;
      }
    }
  }
  return false;
};
