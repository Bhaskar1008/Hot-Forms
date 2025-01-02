import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../../types/form';

export const updateComponentReducer = (
  state: FormState,
  action: PayloadAction<{ id: string; updates: Partial<FormComponent> }>
) => {
  const { id, updates } = action.payload;
  
  const updateInTree = (components: FormComponent[]): boolean => {
    for (let i = 0; i < components.length; i++) {
      if (components[i].id === id) {
        components[i] = { ...components[i], ...updates };
        return true;
      }
      
      if (components[i].children?.length) {
        if (updateInTree(components[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  updateInTree(state.components);
};