import { createAction } from '@reduxjs/toolkit';
import { PanelPayloads } from './types';

export const toggleComponentPanel = createAction('panel/toggleComponentPanel');
export const togglePropertiesPanel = createAction('panel/togglePropertiesPanel');
export const setPanelStates = createAction<PanelPayloads['setPanelStates']>('panel/setPanelStates');