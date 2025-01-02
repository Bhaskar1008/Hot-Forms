import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../types/form';
import { updateComponentInTree } from '../../../utils/componentUtils';

export const updateComponentReducer = (
  state: FormState,
  action: PayloadAction<{ id: string; updates: Partial<FormComponent> }>
) => {
  const { id, updates } = action.payload;
  updateComponentInTree(state.components, id, updates);
};
