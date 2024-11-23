import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Table, Button } from "antd";
import HFBModal from "../../HFBModal";
import DropZone from "../../../DropZone/DropZone";

const { Column } = Table;

const DynamicTable = ({
  numberOfRows,
  numberOfColumns,
  label,
  tableColumns,
  apiKey,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [jsonOutput, setJsonOutput] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    const initialRows = Array.from({ length: numberOfRows }, (_, index) => ({
      key: index,
    }));
    setDataSource(initialRows);
  }, [numberOfRows]);

  useEffect(() => {
    const jsonFormat = dataSource.map((row, rowIndex) => {
      const rowData = {};
      Object.keys(row).forEach((colKey) => {
        if (colKey !== "key") {
          if (colKey.startsWith("col")) {
            rowData[colKey] = {
              ...(row[colKey] || {}),
              label: "",
              description: "",
            };
          } else {
            rowData[colKey] = row[colKey];
          }
        }
      });
      return rowData;
    });

    setJsonOutput(jsonFormat);
  }, [dataSource]);

  const handleCellChange = useCallback((rowIndex, colIndex, value) => {
    setDataSource((prevDataSource) => {
      const newDataSource = [...prevDataSource];
      if (!newDataSource[rowIndex]) {
        newDataSource[rowIndex] = {};
      }
      newDataSource[rowIndex][`col${colIndex}`] = {
        ...newDataSource[rowIndex][`col${colIndex}`],
        value: value,
      };
      return newDataSource;
    });
  }, []);


  return (
    <DndProvider backend={HTML5Backend}>
      <Table dataSource={dataSource} pagination={false} rowKey="key">
        {tableColumns.map((col, colIndex) => (
          <Column
            key={`col${colIndex}`}
            title={col.value}
            dataIndex={`col${colIndex}`}
            render={(component, _, rowIndex) => {
              const cellId = `cell-${rowIndex}-${colIndex}`;
              
              return (
                <DropZone
                  id={`${apiKey} ${rowIndex + 1}-${colIndex + 1}`} 
                  setDisplayObj={() => {}}
                  label={` ${label} ${rowIndex + 1}-${colIndex + 1}`}
                  addField={(field, componentType) =>
                    setDataSource((prevDataSource) => {
                      const newDataSource = [...prevDataSource];
                      if (!newDataSource[rowIndex]) {
                        newDataSource[rowIndex] = {};
                      }
                      newDataSource[rowIndex][`col${colIndex}`] = {
                        ...field,
                        type: componentType,
                        value: field.type === "Checkbox" ? false : "",
                      };
                      return newDataSource;
                    })
                  }
                />
              );
            }}
          />
        ))}
      </Table>
    </DndProvider>
  );
};

export default DynamicTable;
