import { ChartData, ChartOptions } from 'chart.js';

export interface ChartComponentProps {
  component: {
    id: string;
    type: string;
    label: string;
    settings?: {
      data?: ChartData;
      options?: ChartOptions;
      chartType?: 'pie' | 'doughnut' | 'bar' | 'line';
      dataSource?: {
        type: 'static' | 'api';
        url?: string;
        refreshInterval?: number;
        data?: any;
      };
    };
  };
  onChange?: (value: any) => void;
}

export interface ChartSettings {
  data: ChartData;
  options: ChartOptions;
  chartType: 'pie' | 'doughnut' | 'bar' | 'line';
  dataSource: {
    type: 'static' | 'api';
    url?: string;
    refreshInterval?: number;
    data?: any;
  };
}
