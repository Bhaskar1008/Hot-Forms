import React,{useState} from "react";
import { Collapse, Input } from "antd";
import { ViewPlugin } from "@uiw/react-codemirror";
import "./Accordian.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableDraggableArea from "./DroppableCell";
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
// const items = [
//   {
//     key: '1',
//     label: 'This is panel header 1',
//     children: <p>{text}</p>,
//   },
//   {
//     key: '2',
//     label: 'This is panel header 2',
//     children: <p>{text}</p>,
//   },
//   {
//     key: '3',
//     label: 'This is panel header 3',
//     children: <p>{text}</p>,
//   },
// ];
const App = ({ AccordianColumns }) => {
  console.log("accordian clumnc", AccordianColumns);
  const [Components, setComponents] = useState([]);
  if(AccordianColumns==undefined){
    AccordianColumns=[
      {value: 'Column 1'},
      {value: 'Column 2'},
      {value: 'Column 3'}
    ]
  }

  const Cell = () => (
    <div style={{ minHeight: "50px", padding: "5px", border: "1px solid #ccc" }}>
      Drop Here
    </div>
  );

  const items = AccordianColumns.map((column, index) => ({
    key: `${index + 1}`,
    label: column.value,
    children: <DroppableDraggableArea key={`${index+1}`}></DroppableDraggableArea>,
  }));
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Collapse accordion items={items} />
    </DndProvider>
  );
};

export default App;
