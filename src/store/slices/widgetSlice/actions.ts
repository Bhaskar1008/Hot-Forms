import { createAction } from '@reduxjs/toolkit';
import { WidgetComponent } from '../../../types/form';

export const setSelectedWidget = createAction<string | null>('widget/setSelectedWidget');
export const addWidget = createAction<WidgetComponent>('widget/addWidget');
export const updateWidget = createAction<{ id: string; updates: Partial<WidgetComponent> }>('widget/updateWidget');
export const removeWidget = createAction<string>('widget/removeWidget');