import { z } from 'zod';

// Base Properties
export const baseDisplayProperties = {
  label: z.string(),
  customClass: z.string().optional(),
  hideLabel: z.boolean().optional(),
  disabled: z.boolean().optional(),
};

export const baseDataProperties = {
  persistent: z.boolean().optional(),
  protected: z.boolean().optional(),
  tableView: z.boolean().optional(),
  modalEdit: z.boolean().optional(),
};

export const baseValidationProperties = {
  required: z.boolean().optional(),
  validateOn: z.enum(['change', 'blur']).optional(),
};

export const baseLogicProperties = {
  conditional: z.object({
    show: z.boolean().optional(),
    when: z.string().optional(),
    eq: z.string().optional(),
  }).optional(),
  customConditional: z.string().optional(),
};

// Component-specific Properties
export interface DisplayPropertiesType {
  label?: string;
  customClass?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  showCharCount?: boolean;
  showWordCount?: boolean;
  spellcheck?: boolean;
  pageCount?: number;
  collapseTitle?: string;
  initiallyExpanded?: boolean;
  showBorder?: boolean;
  rowCount?: number;
  columnCount?: number;
  showHeaders?: boolean;
  headers?: Array<{ label: string; value: string }>;
  showBorders?: boolean;
  striped?: boolean;
  hover?: boolean;
  orientation?: 'horizontal' | 'vertical';
  tabs?: Array<{ id: string; label: string }>;
}

export interface DataPropertiesType {
  persistent?: boolean;
  protected?: boolean;
  tableView?: boolean;
  modalEdit?: boolean;
  defaultValue?: any;
  multiple?: boolean;
  unique?: boolean;
  calculateValue?: string;
  calculateServer?: boolean;
  allowCalculateOverride?: boolean;
  encrypted?: boolean;
}

export interface ValidationPropertiesType {
  required?: boolean;
  validateOn?: 'change' | 'blur';
  custom?: string;
  customPrivate?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  strictDateValidation?: boolean;
}

export interface LogicPropertiesType {
  conditional?: {
    show?: boolean;
    when?: string;
    eq?: string;
  };
  customConditional?: string;
  calculateValue?: string;
  onClick?: string;
  customLogic?: string;
}

// Component Types
export interface FormComponent {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: ValidationPropertiesType;
  display?: DisplayPropertiesType;
  data?: DataPropertiesType;
  logic?: LogicPropertiesType;
  children?: FormComponent[];
  parentId?: string;
  settings?: {
    type?: string;
    steps?: Array<{
      label: string;
      content: string;
      icon?: {
        type: 'library' | 'custom';
        value: string;
      };
    }>;
  };
}

export interface FormState {
  components: FormComponent[];
  selectedComponent: string | null;
  draggedComponent: FormComponent | null;
  orientation: 'horizontal' | 'vertical';
}

export interface WidgetComponent extends FormComponent {
  settings: Record<string, any>;
  style: Record<string, any>;
}
