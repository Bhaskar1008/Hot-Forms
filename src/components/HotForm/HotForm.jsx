import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, InputNumber, Radio, Select, Table, Row, Col, Space, message, Tabs } from 'antd';
import { useStructure } from '../../utils/useComponentStructure';
import { InboxOutlined } from '@ant-design/icons';
import SignatureCanvas from 'react-signature-canvas';
import ReCAPTCHA from 'react-google-recaptcha';
import InputMask from 'react-input-mask';
import { useRef } from 'react';
import Upload from 'antd/es/upload';

const { Dragger } = Upload;

// Container Component
const ContainerComponent = ({ children, className, ...props }) => (
  <Row className={className} {...props} gutter={[16, 16]}>
    {children?.map((child, index) => (
      <Col span={24} key={index}>
        {child}
      </Col>
    ))}
  </Row>
);

// Text Field Component
const TextFieldComponent = ({ label, placeholder, className, apiKey, ...props }) => {
  const { updateFormData } = useStructure();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    updateFormData(apiKey, value);
  };

  return (
    <Form.Item label={label} {...props}>
      <Input
        value={inputValue}
        placeholder={placeholder}
        className={className}
        onChange={handleInputChange}
      />
    </Form.Item>
  );
};

// Email Component
const EmailComponent = ({ label, placeholder, className, apiKey, prefix, suffix, required, ...props }) => {
  const { updateFormData } = useStructure();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value && !validateEmail(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
    
    updateFormData(apiKey, value);
  };

  return (
    <Form.Item 
      label={label}
      validateStatus={error ? "error" : ""}
      help={error}
      required={required}
      {...props}
    >
      <Input
        type="email"
        value={inputValue}
        placeholder={placeholder}
        className={className}
        prefix={prefix}
        suffix={suffix}
        onChange={handleInputChange}
      />
    </Form.Item>
  );
};

// Component mapping
const componentMap = {
  'Container': ContainerComponent,
  'Text Field': TextFieldComponent,
  'Email': EmailComponent,
};

// Recursive render function
const renderComponent = (component) => {
  const { componentType, components, className, ...props } = component;
  const ComponentToRender = componentMap[componentType];

  if (!ComponentToRender) return null;

  return (
    <ComponentToRender key={props.apiKey || Math.random()} className={className} {...props}>
      {components && components.map(renderComponent)}
    </ComponentToRender>
  );
};

// HotForm component that takes JSON structure as a prop
const HotForm = ({ json }) => {
  return (
    <Form layout="vertical" className="main-container">
      {renderComponent(json)}
    </Form>
  );
};

export default HotForm;