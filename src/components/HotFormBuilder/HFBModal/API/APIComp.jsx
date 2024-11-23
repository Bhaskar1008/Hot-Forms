import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";
import "./APIComp.css";

const APIComp = ({ values, componentType, setDataObj }) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (values?.display?.label) {
      const generatedKey = toCamelCase(values.display.label);
      setApiKey(generatedKey);
      handleApiKeyChange(generatedKey);
    }
  }, [values?.display?.label]);

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  const handleApiKeyChange = (value) => {
    setApiKey(value);
    setDataObj(prev => ({
      ...prev,
      api: {
        ...prev.api,
        apiKey: value
      },
      display: {
        ...prev.display,
        apiKey: value
      }
    }));
  };

  return (
    <div className="main-div">
      <Form layout="vertical">
        <Form.Item 
          label="Property Name"
          required
          tooltip="This will be used as the field identifier in form data"
        >
          <Input
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="Enter property name"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default APIComp;