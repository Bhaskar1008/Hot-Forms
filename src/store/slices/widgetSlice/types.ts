import { WidgetComponent } from '../../../types/form';

export interface WidgetState {
  widgets: WidgetComponent[];
  selectedWidget: string | null;
}