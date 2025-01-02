import { 
  TextCursor, 
  CheckSquare, 
  CircleDot, 
  ListOrdered,
  Calendar,
  Upload,
  PenTool,
  Hash,
  Tags,
  LayoutGrid,
  Table2,
  Layers,
  ChevronDown,
  Crown,
  Wand,
  Globe,
  PieChart,
  BarChart,
  LineChart,
  TrendingUp,
  Network
} from 'lucide-react';

export const componentTabs = [
  {
    id: 'form',
    label: 'Form Elements',
    icon: LayoutGrid,
    components: [
      { type: 'text', label: 'Text Field', icon: TextCursor },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
      { type: 'radio', label: 'Radio', icon: CircleDot },
      { type: 'select', label: 'Select', icon: ListOrdered },
    ]
  },
  {
    id: 'advanced',
    label: 'Advanced Elements',
    icon: PenTool,
    components: [
      { type: 'datetime', label: 'Date/Time', icon: Calendar },
      { type: 'fileupload', label: 'File Upload', icon: Upload },
      { type: 'signature', label: 'Signature', icon: PenTool },
      { type: 'otp', label: 'OTP', icon: Hash },
      { type: 'tags', label: 'Tags', icon: Tags },
    ]
  },
  {
    id: 'premium',
    label: 'Premium Components',
    icon: Crown,
    components: [
      { type: 'wizard', label: 'Wizard', icon: Wand },
      { type: 'language', label: 'Language', icon: Globe }
    ]
  },
  {
    id: 'layout',
    label: 'Layout Components',
    icon: Layers,
    components: [
      { type: 'container', label: 'Container', icon: LayoutGrid },
      { type: 'table', label: 'Table', icon: Table2 },
      { type: 'tabs', label: 'Tabs', icon: Layers },
      { type: 'collapse', label: 'Collapse', icon: ChevronDown },
    ]
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: TrendingUp,
    components: [
      { type: 'pie-chart', label: 'Pie Chart', icon: PieChart },
      { type: 'doughnut-chart', label: 'Doughnut Chart', icon: PieChart },
      { type: 'bar-chart', label: 'Bar Chart', icon: BarChart },
      { type: 'line-chart', label: 'Line Chart', icon: LineChart }
    ]
  },
  {
    id: 'api',
    label: 'API Components',
    icon: Network,
    components: [
      { type: 'rest-api', label: 'REST API Trigger', icon: Network }
    ]
  }
];
