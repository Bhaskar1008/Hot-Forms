import { PayloadAction } from '@reduxjs/toolkit';
import { FormState } from '../../../types/form';
import { removeComponentFromTree } from '../../../utils/componentUtils';

export const removeComponentReducer = (
  state: FormState,
  action: PayloadAction<string>
) => {
  const id = action.payload;
  removeComponentFromTree(state.components, id);
  
  if (state.selectedComponent === id) {
    state.selectedComponent = null;
  }
};
