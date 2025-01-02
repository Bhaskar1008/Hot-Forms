import { FormComponent } from '../../../types/form';

export interface FormState {
  components: FormComponent[];
  selectedComponent: string | null;
  draggedComponent: FormComponent | null;
  orientation: 'horizontal' | 'vertical';
}