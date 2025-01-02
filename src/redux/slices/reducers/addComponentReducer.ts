import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../types/form';

export const addComponentReducer = (
  state: FormState,
  action: PayloadAction<FormComponent>
) => {
  const component = { ...action.payload };
  
  if (!component.parentId) {
    state.components.push(component);
    return;
  }

  const addToNestedComponents = (components: FormComponent[]): boolean => {
    for (let i = 0; i < components.length; i++) {
      const current = components[i];
      
      // Check if this component is the parent
      if (current.id === component.parentId) {
        if (!current.children) current.children = [];
        current.children.push(component);
        return true;
      }
      
      // Handle table cells
      if (current.type === 'table' && component.parentId?.startsWith('cell-')) {
        if (!current.children) current.children = [];
        current.children.push(component);
        return true;
      }
      
      // Handle tabs
      if (current.type === 'tabs' && component.parentId?.startsWith(current.id)) {
        if (!current.children) current.children = [];
        current.children.push(component);
        return true;
      }
      
      // Check children recursively
      if (current.children?.length) {
        if (addToNestedComponents(current.children)) {
          return true;
        }
      }
    }
    return false;
  };

  // If not added to nested components, add to root
  if (!addToNestedComponents(state.components)) {
    state.components.push(component);
  }
};
