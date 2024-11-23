import React from "react";
import { Select, Input, Checkbox } from "antd";

const Month = ({ componentType, setDisplayObj }) => {
  const renderSelect = (fieldName) => {
    const options = [
      { label: "Number", value: "number" },
      { label: "Select", value: "select" },
    ];
    const handleChange = (val) => {
      setDisplayObj((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          [fieldName]: val,
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
    const handleInputChange = (val) => {
      setDisplayObj((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          [fieldName]: val,
        },
      }));
    };
    return (
      <Input
        placeholder="placeholder"
        onChange={(e) => handleInputChange(e.target.value)}
      />
    );
  };
  const renderCheckbox = () => {
    return <Checkbox />;
  };
  return (
    <div>
      <div>
        <div>Type</div>
        {renderSelect("fieldMonth")}
      </div>
      <div>
        <div>Placeholder</div>
        {renderInput("fieldMonthPlaceholder")}
      </div>
      <div style={{ display: "flex", marginTop: "3px" }}>
        {renderCheckbox()}
        <div style={{ marginLeft: "2px" }}>Hidden</div>
      </div>
    </div>
  );
};

export default Month;
