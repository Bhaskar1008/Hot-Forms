import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox, Row, Col, Form } from "antd";

const Display = ({ componentType, setDisplayObj, values }) => {
  const [displayValues, setDisplayValues] = useState({
    label: "",
    apiKey: "",
    placeholder: "",
    description: "",
    customClass: "",
    prefix: "",
    suffix: "",
    disabled: false,
    hideLabel: false,
    labelPosition: "top",
    theme: "",
    required: false
  });

  useEffect(() => {
    if (values?.display) {
      setDisplayValues(values.display);
    }
  }, [values]);

  const handleInputChange = (fieldName, value) => {
    setDisplayValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    setDisplayObj(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [fieldName]: value
      }
    }));
  };

  const renderField = (fieldName, label, type = "text") => (
    <Form.Item label={label}>
      <Input
        type={type}
        value={displayValues[fieldName]}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </Form.Item>
  );

  const renderSelect = (fieldName, label, options) => (
    <Form.Item label={label}>
      <Select
        value={displayValues[fieldName]}
        onChange={(value) => handleInputChange(fieldName, value)}
        options={options}
      />
    </Form.Item>
  );

  const renderCheckbox = (fieldName, label) => (
    <Form.Item>
      <Checkbox
        checked={displayValues[fieldName]}
        onChange={(e) => handleInputChange(fieldName, e.target.checked)}
      >
        {label}
      </Checkbox>
    </Form.Item>
  );

  const getComponentSpecificFields = () => {
    switch (componentType) {
      case 'Email':
        return (
          <>
            {renderField("placeholder", "Placeholder", "text")}
            {renderField("prefix", "Prefix Icon/Text")}
            {renderField("suffix", "Suffix Icon/Text")}
            {renderCheckbox("required", "Required Field")}
            {renderField("customErrorMessage", "Custom Error Message")}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          {renderField("label", "Label")}
          {renderField("apiKey", "Property Name")}
          {getComponentSpecificFields()}
          {renderField("description", "Description")}
          {renderField("customClass", "Custom CSS Class")}
          
          {renderSelect("labelPosition", "Label Position", [
            { value: "top", label: "Top" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
            { value: "bottom", label: "Bottom" },
          ])}

          {componentType === "Button" && renderSelect("theme", "Theme", [
            { value: "primary", label: "Primary" },
            { value: "default", label: "Default" },
            { value: "dashed", label: "Dashed" },
            { value: "link", label: "Link" },
          ])}

          {renderCheckbox("disabled", "Disabled")}
          {renderCheckbox("hideLabel", "Hide Label")}
        </Col>
      </Row>
    </Form>
  );
};

export default Display;