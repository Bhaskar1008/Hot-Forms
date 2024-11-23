import React, { useState } from "react";
import { Select, Checkbox, Input, Form } from "antd";
import "./Validation.css";

const Validation = ({ setValidationObj, componentType, values }) => {
  const [validationValues, setValidationValues] = useState({
    required: false,
    minLength: "",
    maxLength: "",
    pattern: "",
    customMessage: "",
    validateOn: "change"
  });

  const handleInputChange = (fieldName, value) => {
    setValidationValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    setValidationObj(prevValues => ({
      ...prevValues,
      validation: {
        ...prevValues.validation,
        [fieldName]: value,
      },
    }));
  };

  const getComponentSpecificValidation = () => {
    switch (componentType) {
      case 'Email':
        return (
          <>
            <Form.Item label="Email Pattern">
              <Input 
                value={validationValues.pattern}
                placeholder="Custom email validation pattern"
                onChange={(e) => handleInputChange('pattern', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Custom Error Message">
              <Input 
                value={validationValues.customMessage}
                placeholder="Enter custom error message"
                onChange={(e) => handleInputChange('customMessage', e.target.value)}
              />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-div">
      <Form layout="vertical">
        <Form.Item>
          <Checkbox
            checked={validationValues.required}
            onChange={(e) => handleInputChange('required', e.target.checked)}
          >
            Required
          </Checkbox>
        </Form.Item>

        <Form.Item label="Validate On">
          <Select
            value={validationValues.validateOn}
            onChange={(value) => handleInputChange('validateOn', value)}
            options={[
              { value: "change", label: "Change" },
              { value: "blur", label: "Blur" },
              { value: "submit", label: "Submit" },
            ]}
          />
        </Form.Item>

        {getComponentSpecificValidation()}
      </Form>
    </div>
  );
};

export default Validation;