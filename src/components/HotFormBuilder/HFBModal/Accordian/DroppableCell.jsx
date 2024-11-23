import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input, Checkbox, Radio, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import TagInput from "antd-tag-input";
import Day from "../Day/Day";
import Accordian from './Accordian'
import DynamicTable from "../Components/DynamicTable/DynamicTable";
import componentsVal from '../../../../Jsons/displayObj.json'
const DroppableDraggableArea = ({setDisplayObj,label}) => {
  const [values, setValues] = useState(componentsVal?.Basic?.tabs);
  const [Components, setComponents] = useState([]);
  const [{ isDragging }, drag] = useDrag({
    type: "BOX",
    item: [],
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
console.log('props===> ', setDisplayObj);
  const [{ isOver }, drop] = useDrop({
    accept: "BOX",
    drop: (item) => {
      item.label=label;
      console.log(item);
      let components=Components;
      components=[...Components,item];
      setComponents([...Components, item]);
      setValues((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          tabsData:components
        },
      }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        minHeight: "50px",
        padding: "5px",
        // border: "1px solid #ccc",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {Components.map((item) => {
        return item.type == "Text Field" ? (
          <Input />
        ) : item.type == "Checkbox" ? (
          <Checkbox />
        ) : item.type == "Radio" ? (
          <Radio />
        ) : item.type == "Button" ? (
          <Button>Button</Button>
        ) : item.type == "Text Area" ? (
          <TextArea />
        ) : item.type == "Number" ? (
          <Input type="Number" />
        ) : item.type == "Password" ? (
          <Input type="Password" />
        ) : item.type == "Number" ? (
          <Input type="Number" />
        ) : item.type == "Select Box" ? (
          <Checkbox />
        ) : item.type == "Select" ? (
          <Select style={{width:'100%'}}/>
        ) : item.type == "Email" ? (
          <Input type="Email" />
        ) :item.type == "url" ? (
          <Input type="url" />
        ) :item.type == "Phone" ? (
          <Input type="Phone" />
        ):item.type == "tags" ? (
          <TagInput/>
        ):item.type == "Day" ? (
          <Day/>
        ):item.type == "accordian" ? (
          <Accordian/>
        ):item.type == "Table" ? (
          <DynamicTable/>
        ): (
          <Radio />
        );
      })}
    </div>
  );
};

export default DroppableDraggableArea;
