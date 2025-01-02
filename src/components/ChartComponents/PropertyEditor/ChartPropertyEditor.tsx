import React from 'react';
import PropertyField from '../../PropertyEditor/PropertyField';
import { ChartSettings } from '../types';

interface ChartPropertyEditorProps {
  settings: ChartSettings;
  onChange: (settings: ChartSettings) => void;
}

const ChartPropertyEditor: React.FC<ChartPropertyEditorProps> = ({
  settings,
  onChange,
}) => {
  const handleDataSourceChange = (type: 'static' | 'api') => {
    onChange({
      ...settings,
      dataSource: {
        ...settings.dataSource,
        type,
      },
    });
  };

  const handleApiUrlChange = (url: string) => {
    onChange({
      ...settings,
      dataSource: {
        ...settings.dataSource,
        url,
      },
    });
  };

  const handleRefreshIntervalChange = (interval: number) => {
    onChange({
      ...settings,
      dataSource: {
        ...settings.dataSource,
        refreshInterval: interval,
      },
    });
  };

  const handleStaticDataChange = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      onChange({
        ...settings,
        data: parsedData,
      });
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Chart Type"
        type="select"
        value={settings.chartType}
        onChange={(value) => onChange({ ...settings, chartType: value })}
        options={[
          { label: 'Pie Chart', value: 'pie' },
          { label: 'Doughnut Chart', value: 'doughnut' },
          { label: 'Bar Chart', value: 'bar' },
          { label: 'Line Chart', value: 'line' },
        ]}
      />

      <PropertyField
        label="Data Source"
        type="select"
        value={settings.dataSource.type}
        onChange={handleDataSourceChange}
        options={[
          { label: 'Static Data', value: 'static' },
          { label: 'API', value: 'api' },
        ]}
      />

      {settings.dataSource.type === 'api' && (
        <>
          <PropertyField
            label="API URL"
            type="text"
            value={settings.dataSource.url || ''}
            onChange={handleApiUrlChange}
          />

          <PropertyField
            label="Refresh Interval (ms)"
            type="number"
            value={settings.dataSource.refreshInterval || 0}
            onChange={handleRefreshIntervalChange}
          />
        </>
      )}

      {settings.dataSource.type === 'static' && (
        <PropertyField
          label="Static Data (JSON)"
          type="textarea"
          value={JSON.stringify(settings.data, null, 2)}
          onChange={handleStaticDataChange}
        />
      )}
    </div>
  );
};

export default ChartPropertyEditor;
