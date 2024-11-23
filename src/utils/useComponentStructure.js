import React, { createContext, useContext, useState } from "react";

const StructureContext = createContext();

export function StructureProvider({ children }) {
  const [structure, setStructure] = useState(() => {
    const savedStructure = {
      apiKey: "main_container",
      componentType: "Container",
      components: [
        {
          componentType: "Container",
          apiKey: "main_container",
          components: [
         
          ]
        }
      ],
    };
    return savedStructure;
  });

  // New state to store form data
  const [formData, setFormData] = useState([]);

  // Function to add or update key-value pairs in formData
  const updateFormData = (apiKey, value) => {
    setFormData((prevFormData) => {
      // Check if the key already exists in the formData
      const existingItemIndex = prevFormData.findIndex(item => item.hasOwnProperty(apiKey));

      if (existingItemIndex >= 0) {
        // Update the existing key-value pair
        const updatedFormData = [...prevFormData];
        updatedFormData[existingItemIndex] = { [apiKey]: value };
        return updatedFormData;
      } else {
        // Add new key-value pair
        return [...prevFormData, { [apiKey]: value }];
      }
    });
  };

  const addComponentToStructure = (data) => {
    const { dropZoneId } = data;
    const [apiKey, position] = dropZoneId.split(" ");

    function findAndAddComponent(structure, apiKey, position, data) {
      for (const comp of structure.components) {
        if (comp.apiKey === apiKey) {
          if (comp.componentType === "Container") {
            comp.components.push(data);
          } else if (comp.componentType === "Table" && position) {
            const [rowIndex, colIndex] = position.split("-").map(Number);
            if (comp.rows[rowIndex - 1] && comp.rows[rowIndex - 1][colIndex - 1]) {
              comp.rows[rowIndex - 1][colIndex - 1].components.push(data);
            }
          } else if (comp.componentType === "Tabs") {
            const tabToUpdate = comp.components.find(
              (tab) => tab.key === position
            );
            if (tabToUpdate) {
              tabToUpdate.components.push(data);
            }
          }
          return true;
        }

        if (comp.components && comp.components.length > 0) {
          if (findAndAddComponent(comp, apiKey, position, data)) {
            return true;
          }
        }

        if (comp.rows && comp.rows.length > 0) {
          for (const row of comp.rows) {
            for (const cell of row) {
              if (cell.components && cell.components.length > 0) {
                if (findAndAddComponent(cell, apiKey, position, data)) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    }

    const newStructure = { ...structure };

    if (!findAndAddComponent(newStructure, apiKey, position, data)) {
      // If no component was added, handle as needed
    } else {
      setStructure(newStructure);
    }
  };

  return (
    <StructureContext.Provider
      value={{ structure, formData, addComponentToStructure, updateFormData }}
    >
      {children}
    </StructureContext.Provider>
  );
}

export function useStructure() {
  return useContext(StructureContext);
}
