import React, { useState } from "react";
import { Radio, Space, Tabs } from "antd";
import DroppableDraggableArea from "../Accordian/DroppableCell";
const App = ({ numberOfTabs, tabsPosition, setDisplayObj }) => {
  console.log("number of props in tabs ", setDisplayObj);
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
      {/* <Space
        style={{
          marginBottom: 24,
        }}
      >
        Tab position:
        <Radio.Group value={\} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space> */}
      <Tabs
        tabPosition={tabPosition == "" ? "Top" : tabsPosition}
        items={numberOfTabs?.map((item, index) => {
          // console.log("droppable item---->", setDisplayObj);
          return {
            label: item.value,
            key: `${index + 1}`,
            children: (
              <DroppableDraggableArea
                label={item.value}
                key={`${index + 1}`}
                setDisplayObj={setDisplayObj}
              />
            ),
          };
        })}
      />
    </>
  );
};
export default App;
