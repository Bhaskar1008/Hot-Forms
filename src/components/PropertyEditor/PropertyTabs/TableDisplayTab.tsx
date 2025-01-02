import React from 'react';
import { FormComponent } from '../../../types/form';
import PropertyField from '../PropertyField';
import TableHeaderManager from '../../LayoutComponents/Table/TableHeaderManager';

interface TableDisplayTabProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

const TableDisplayTab: React.FC<TableDisplayTabProps> = ({ component, onChange }) => {
  const handleDisplayChange = (name: string, value: any) => {
    onChange({
      display: {
        ...component.display,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <PropertyField
        label="Label"
        type="text"
        value={component.display?.label || ''}
        onChange={(value) => handleDisplayChange('label', value)}
        required
      />

      <PropertyField
        label="Row Count"
        type="number"
        value={component.display?.rowCount || 3}
        onChange={(value) => handleDisplayChange('rowCount', value)}
        min={1}
      />

      <PropertyField
        label="Column Count"
        type="number"
        value={component.display?.columnCount || 3}
        onChange={(value) => handleDisplayChange('columnCount', value)}
        min={1}
      />

      <PropertyField
        label="Show Headers"
        type="switch"
        value={component.display?.showHeaders || false}
        onChange={(value) => handleDisplayChange('showHeaders', value)}
      />

      {component.display?.showHeaders && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Headers</label>
          <TableHeaderManager
            headers={component.display?.headers || []}
            onChange={(headers) => handleDisplayChange('headers', headers)}
          />
        </div>
      )}

      <PropertyField
        label="Show Borders"
        type="switch"
        value={component.display?.showBorders ?? true}
        onChange={(value) => handleDisplayChange('showBorders', value)}
      />

      <PropertyField
        label="Striped Rows"
        type="switch"
        value={component.display?.striped || false}
        onChange={(value) => handleDisplayChange('striped', value)}
      />

      <PropertyField
        label="Hover Effect"
        type="switch"
        value={component.display?.hover ?? true}
        onChange={(value) => handleDisplayChange('hover', value)}
      />

      <PropertyField
        label="Custom Class"
        type="text"
        value={component.display?.customClass || ''}
        onChange={(value) => handleDisplayChange('customClass', value)}
      />
    </div>
  );
};

export default TableDisplayTab;
