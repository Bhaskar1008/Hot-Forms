import { createAction } from '@reduxjs/toolkit';
import { FormComponent } from '../../../types/form';

export const setSelectedComponent = createAction<string | null>('form/setSelectedComponent');
export const toggleOrientation = createAction('form/toggleOrientation');
export const importComponents = createAction<FormComponent[]>('form/importComponents');