import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../../types/form';

export const removeComponentReducer = (
  state: FormState,
  action: PayloadAction<string>
) => {
  const id = action.payload;
  
  const removeFromTree = (components: FormComponent[]): boolean => {
    for (let i = 0; i < components.length; i++) {
      if (components[i].id === id) {
        components.splice(i, 1);
        return true;
      }
      
      if (components[i].children?.length) {
        if (removeFromTree(components[i].children)) {
          if (components[i].children.length === 0) {
            delete components[i].children;
          }
          return true;
        }
      }
    }
    return false;
  };

  removeFromTree(state.components);
  
  if (state.selectedComponent === id) {
    state.selectedComponent = null;
  }
};