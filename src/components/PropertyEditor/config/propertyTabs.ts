import { Settings, Database, ShieldCheck, Wand2 } from 'lucide-react';
import DisplayTab from '../PropertyTabs/DisplayTab';
import DataTab from '../PropertyTabs/DataTab';
import ValidationTab from '../PropertyTabs/ValidationTab';
import LogicTab from '../PropertyTabs/LogicTab';
import { FormComponent } from '../../../types/form';

export interface PropertyTab {
  id: string;
  label: string;
  icon: React.FC<any>;
  component: React.FC<{
    component: FormComponent;
    onChange: (updates: Partial<FormComponent>) => void;
  }>;
}

export const propertyTabs: PropertyTab[] = [
  {
    id: 'display',
    label: 'Display',
    icon: Settings,
    component: DisplayTab
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    component: DataTab
  },
  {
    id: 'validation',
    label: 'Validation',
    icon: ShieldCheck,
    component: ValidationTab
  },
  {
    id: 'logic',
    label: 'Logic',
    icon: Wand2,
    component: LogicTab
  }
];
