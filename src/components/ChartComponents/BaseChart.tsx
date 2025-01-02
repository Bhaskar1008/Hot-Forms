import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { ChartComponentProps } from './types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const BaseChart: React.FC<ChartComponentProps> = ({ component }) => {
  const chartRef = useRef<ChartJS>(null);
  const { settings } = component;

  useEffect(() => {
    if (settings?.dataSource?.type === 'api' && settings.dataSource.url) {
      const fetchData = async () => {
        try {
          const response = await fetch(settings.dataSource.url!);
          const data = await response.json();
          if (chartRef.current) {
            chartRef.current.data = data;
            chartRef.current.update();
          }
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };

      fetchData();

      if (settings.dataSource.refreshInterval) {
        const interval = setInterval(fetchData, settings.dataSource.refreshInterval);
        return () => clearInterval(interval);
      }
    }
  }, [settings?.dataSource]);

  if (!settings?.data) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <h3 className="text-lg font-medium text-gray-900">{component.label}</h3>
      </div>
      <div className="relative h-64">
        <Chart
          ref={chartRef}
          type={settings.chartType || 'pie'}
          data={settings.data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            ...settings.options,
          }}
        />
      </div>
    </div>
  );
};

export default BaseChart;
