import React from 'react';
import { FormComponent } from '../../../types/form';
import TableCell from './TableCell';
import classNames from 'classnames';

interface TableProps {
  component: FormComponent;
}

const Table: React.FC<TableProps> = ({ component }) => {
  const {
    rowCount = 3,
    columnCount = 3,
    showHeaders = false,
    headers = [],
    showBorders = true,
    striped = false,
    hover = true
  } = component.display || {};

  const tableHeaders = headers.length > 0 
    ? headers 
    : Array(columnCount).fill(null).map((_, index) => ({
        label: `Column ${index + 1}`,
        value: `column-${index + 1}`
      }));

  const rows = Array(rowCount).fill(null);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="overflow-x-auto">
        <table className={classNames(
          'min-w-full divide-y divide-gray-200',
          showBorders && 'border border-gray-200',
          component.display?.customClass
        )}>
          {showHeaders && (
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={header.value}
                    className={classNames(
                      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                      showBorders && 'border-b border-gray-200'
                    )}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((_, rowIndex) => (
              <tr 
                key={rowIndex}
                className={classNames(
                  striped && rowIndex % 2 === 0 && 'bg-gray-50',
                  hover && 'hover:bg-gray-100'
                )}
              >
                {tableHeaders.map((_, colIndex) => (
                  <TableCell
                    key={`${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    showBorders={showBorders}
                    tableId={component.id}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
