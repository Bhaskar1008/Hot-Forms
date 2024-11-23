import React, { useState } from "react";
import { Select, Checkbox, Input } from "antd";
import componentJson from "../../../../Jsons/displayJson.json"
import "./Validation.css";

const Validation = ({ setValidationObj, componentType }) => {
  const [isRequired, setIsRequired] = useState(false);

  const handleChange = (value) => {
    console.log(`Selected ${value}`);
  };

  const handleInputChange = (e, fieldName) => {
    setValidationObj((prevValues) => ({
      ...prevValues,
      validation: {
        ...prevValues.validation,
        [fieldName]: e.target.value,
      },
    }));
  };

  const handleRequired = () => {
    setIsRequired((prevIsRequired) => !prevIsRequired);
    handleInputChange({ target: { value: !isRequired } }, "required");
  };

  const renderInput = (fieldName, placeholder) =>
    componentJson?.Basic?.[componentType]?.validation?.[fieldName] && (
      <div className="default">
        <span>{placeholder}</span>
        <Input
          type={fieldName === "minLength" ? "number" : "text"}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e, fieldName)}
        />
      </div>
    );

  const renderSelect = (fieldName, placeholder, options) =>
    componentJson?.Basic?.[componentType]?.validation?.[fieldName] && (
      <div className="data-select">
        <span>{placeholder}</span>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          onChange={handleChange}
          options={options}
        />
      </div>
    );

  const renderCheckbox = (fieldName, label) =>
    componentJson?.Basic?.[componentType]?.validation?.[fieldName] && (
      <Checkbox onChange={handleRequired}>{label}</Checkbox>
    );

  return (
    <div className="main-div">
      {renderSelect(
        "validateOn",
        "Validate On",
        [
          { value: "Change", label: "Change" },
          { value: "Blur", label: "Blur" },
        ]
      )}
      <div className="required">
        {renderCheckbox("required", "Required")}
        {/* <Checkbox>Unique</Checkbox> */}
        {renderCheckbox('onlyAvailableItems',"Allow only available values")}
      </div>
      {renderInput("minLength", "Minimum Length")}
      {renderInput("maxLength", "Maximum Length")}
      {renderInput("minWordLength", "Minimum Word Length")}
      {renderInput("maxWordLength", "Maximum Word Length")}
      {/* <div className="default">
        <span>Regular expression pattern</span>
        <Input placeholder="Regular expression pattern" />
      </div> */}
      <div className="default">
        <span>Error Label</span>
        <Input placeholder="Error Label" />
      </div>
      {renderInput('customMessage','Custom Error Message')}
    </div>
  );
};

export default Validation;
