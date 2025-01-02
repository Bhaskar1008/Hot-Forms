import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../../types/form';

export const reorderComponentsReducer = (
  state: FormState,
  action: PayloadAction<{ parentId?: string; components: FormComponent[] }>
) => {
  const { parentId, components } = action.payload;
  
  if (!parentId) {
    state.components = components;
    return;
  }

  const updateParentChildren = (tree: FormComponent[]): boolean => {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === parentId) {
        tree[i].children = components;
        return true;
      }
      
      if (tree[i].children?.length) {
        if (updateParentChildren(tree[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  updateParentChildren(state.components);
};