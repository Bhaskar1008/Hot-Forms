export interface Step {
  label: string;
  content: string;
  icon?: {
    type: 'library' | 'custom';
    value: string;
  };
}

export type WizardType = 'basic' | 'percentage' | 'advanced';

export interface IconValidation {
  maxSize: number; // in bytes
  allowedTypes: string[];
  dimensions: {
    width: number;
    height: number;
  };
}
