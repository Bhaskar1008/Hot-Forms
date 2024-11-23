import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "../../../DropZone/DropZone";

const GridContainer = ({numberOfGrid, customClass}) => {
  const [components, setComponents] = useState([]);

  // Function to add a new field/component
  const addField = (field, componentType) => {
    const { display } = field;

    // Create a new component object
    const newComponent = {
      componentType: componentType,
      theme: display?.theme,
      label: display?.label,
      components: [], // Assuming components can nest in some cases
    };

    // Update the components state
    setComponents([...components, newComponent]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numberOfGrid || 2}, 1fr)`, // 4 columns in a single row
          gap: "20px",
          margin: "20px",
        }}
        className={customClass}
      >
        {/* DropZone components */}
        {[...Array(+numberOfGrid || 2)].map((_, index) => (
          <DropZone
            key={index}
            setDisplayObj={() => {}}
            label={`Drop Zone ${index + 1}`}
            addField={addField}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default GridContainer;
