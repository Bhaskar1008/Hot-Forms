import React,{useState,useEffect} from "react";
import { Select, Input, Checkbox } from "antd";

const Day = ({ componentType, setDisplayObj, values }) => {
  console.log("useeffect called for child ",values);
  const renderSelect = (fieldName) => {
    const options = [
      { value: "number", label: "Number" },
      { value: "select", label: "Select" },
    ];
    const handleChange = (val) => {
      setDisplayObj((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          [fieldName]:val
        },
      }));
    };
    return (
      <Select
        style={{ width: "100%" }}
        options={options}
        onChange={(val) => handleChange(val)}
      />
    );
  };
  const renderInput = (fieldName) => {
    const handleInputChange=(val)=>{
      setDisplayObj((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          [fieldName]:val
        },
      }));
    }
    return <Input placeholder="placeholder" onChange={(e)=>handleInputChange(e.target.value)}/>;
  };
  const renderCheckbox = () => {
    return <Checkbox />;
  };
  return (
    <div>
      <div>
        <div>Type</div>
        {renderSelect("fieldDay")}
      </div>
      <div>
        <div>Placeholder</div>
        {renderInput("fieldDayPlaceholder")}
      </div>
      <div style={{ display: "flex", marginTop: "3px" }}>
        {renderCheckbox()}
        <div style={{ marginLeft: "2px" }}>Hidden</div>
      </div>
    </div>
  );
};

export default Day;
