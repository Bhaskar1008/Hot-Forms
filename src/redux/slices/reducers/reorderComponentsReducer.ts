import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../types/form';
import { findParentComponent } from '../../../utils/componentUtils';

export const reorderComponentsReducer = (
  state: FormState,
  action: PayloadAction<{ parentId?: string; components: FormComponent[] }>
) => {
  const { parentId, components } = action.payload;
  
  if (!parentId) {
    state.components = components;
    return;
  }

  const parent = findParentComponent(state.components, parentId);
  if (parent) {
    parent.children = components;
  }
};
