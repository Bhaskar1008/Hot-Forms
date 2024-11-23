import React from "react";
import { Form, Input, Button, Checkbox, Radio, Select, DatePicker } from "antd";
import { useStructure } from "../../../../utils/useComponentStructure";

const Preview = ({ values, componentType, setDisplayObj }) => {
  const { display = {}, validation = {} } = values;
  const { updateFormData } = useStructure();

  const renderEmailPreview = () => {
    const {
      label,
      placeholder,
      prefix,
      suffix,
      required,
      disabled,
      customClass,
      description
    } = display;

    return (
      <div>
        {label && <label>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>}
        <Form.Item
          validateStatus={validation?.customMessage ? "error" : ""}
          help={validation?.customMessage}
        >
          <Input
            type="email"
            placeholder={placeholder || "Enter email"}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            className={customClass}
            onChange={(e) => updateFormData(display.apiKey, e.target.value)}
          />
        </Form.Item>
        {description && <p className="description">{description}</p>}
      </div>
    );
  };

  const renderPreview = () => {
    switch (componentType) {
      case 'Email':
        return renderEmailPreview();
      // Add other component previews here
      default:
        return <div>Preview not available</div>;
    }
  };

  return (
    <div>
      <h2 style={{
        borderBottom: "1px solid #80808033",
        paddingBottom: "12px",
        margin: "0px 0px 20px 0px"
      }}>
        Preview
      </h2>
      {renderPreview()}
    </div>
  );
};

export default Preview;