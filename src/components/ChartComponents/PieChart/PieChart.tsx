import React from 'react';
import BaseChart from '../BaseChart';
import type { ChartComponentProps } from '../types';

const PieChart: React.FC<ChartComponentProps> = (props) => {
  const defaultData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const componentWithDefaults = {
    ...props.component,
    settings: {
      ...props.component.settings,
      chartType: 'pie' as const,
      data: props.component.settings?.data || defaultData,
    },
  };

  return <BaseChart {...props} component={componentWithDefaults} />;
};

export default PieChart;
