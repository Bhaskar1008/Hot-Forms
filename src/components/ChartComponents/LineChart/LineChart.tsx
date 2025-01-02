import React from 'react';
import BaseChart from '../BaseChart';
import type { ChartComponentProps } from '../types';

const LineChart: React.FC<ChartComponentProps> = (props) => {
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  const componentWithDefaults = {
    ...props.component,
    settings: {
      ...props.component.settings,
      chartType: 'line' as const,
      data: props.component.settings?.data || defaultData,
    },
  };

  return <BaseChart {...props} component={componentWithDefaults} />;
};

export default LineChart;
