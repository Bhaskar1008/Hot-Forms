import React from 'react';
import BaseChart from '../BaseChart';
import type { ChartComponentProps } from '../types';

const BarChart: React.FC<ChartComponentProps> = (props) => {
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const componentWithDefaults = {
    ...props.component,
    settings: {
      ...props.component.settings,
      chartType: 'bar' as const,
      data: props.component.settings?.data || defaultData,
    },
  };

  return <BaseChart {...props} component={componentWithDefaults} />;
};

export default BarChart;
