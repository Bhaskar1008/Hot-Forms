import React, { createContext, useContext, useState } from "react";

const StructureContext = createContext();

export function StructureProvider({ children }) {
  const [structure, setStructure] = useState(() => ({
    apiKey: "main_container",
    componentType: "Container",
    components: [],
  }));

  const [formData, setFormData] = useState({});

  const updateFormData = (apiKey, value) => {
    setFormData(prev => ({
      ...prev,
      [apiKey]: value
    }));
  };

  const addComponentToStructure = (newComponent) => {
    const { dropZoneId } = newComponent;
    const [apiKey, position] = dropZoneId ? dropZoneId.split(" ") : [];

    const addToComponents = (components, targetApiKey, position, component) => {
      return components.map(comp => {
        if (comp.apiKey === targetApiKey) {
          if (comp.componentType === "Container") {
            return {
              ...comp,
              components: [...comp.components, component]
            };
          } else if (comp.componentType === "Table" && position) {
            const [rowIndex, colIndex] = position.split("-").map(Number);
            const updatedRows = [...comp.rows];
            if (updatedRows[rowIndex - 1] && updatedRows[rowIndex - 1][colIndex - 1]) {
              updatedRows[rowIndex - 1][colIndex - 1].components.push(component);
            }
            return { ...comp, rows: updatedRows };
          }
        }
        if (comp.components) {
          return {
            ...comp,
            components: addToComponents(comp.components, targetApiKey, position, component)
          };
        }
        return comp;
      });
    };

    setStructure(prev => {
      if (!apiKey) {
        return {
          ...prev,
          components: [...prev.components, newComponent]
        };
      }
      return {
        ...prev,
        components: addToComponents(prev.components, apiKey, position, newComponent)
      };
    });
  };

  return (
    <StructureContext.Provider value={{ 
      structure, 
      formData, 
      addComponentToStructure, 
      updateFormData 
    }}>
      {children}
    </StructureContext.Provider>
  );
}

export function useStructure() {
  return useContext(StructureContext);
}