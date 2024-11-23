import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, InputNumber, Radio, Select, Table, Row, Col } from 'antd';
import { useStructure } from '../../utils/useComponentStructure';

// Container Component
const ContainerComponent = ({ children, className, ...props }) => (
    <Row className={className} {...props} gutter={[16, 16]}>
        {children.map((child, index) => (
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

// TextArea Component
const TextAreaComponent = ({ label, placeholder, className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        updateFormData(apiKey, value);
    };

    return (
        <Form.Item label={label} {...props}>
            <Input.TextArea
                value={inputValue}
                placeholder={placeholder}
                className={className}
                onChange={handleInputChange}
            />
        </Form.Item>
    );
};

// Number Input Component
const NumberFieldComponent = ({ label, placeholder, className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();

    const handleInputChange = (value) => {
        updateFormData(apiKey, value);
    };

    return (
        <Form.Item label={label} {...props}>
            <InputNumber
                placeholder={placeholder}
                className={className}
                style={{ width: '100%' }}
                onChange={handleInputChange}
            />
        </Form.Item>
    );
};

// Password Component
const PasswordComponent = ({ label, placeholder, className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        updateFormData(apiKey, value);
    };

    return (
        <Form.Item label={label} {...props}>
            <Input.Password
                value={inputValue}
                placeholder={placeholder}
                className={className}
                onChange={handleInputChange}
            />
        </Form.Item>
    );
};

// Checkbox Component
const CheckboxComponent = ({ label, className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();

    const handleInputChange = (e) => {
        updateFormData(apiKey, e.target.checked);
    };

    return (
        <Form.Item {...props} valuePropName="checked">
            <Checkbox className={className} onChange={handleInputChange}>
                {label}
            </Checkbox>
        </Form.Item>
    );
};

// Radio Component
const RadioComponent = ({ label, options = [], className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();
    const [selectedValue, setSelectedValue] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        updateFormData(apiKey, value);
    };

    return (
        <Form.Item label={label} {...props}>
            <Radio.Group className={className} value={selectedValue} onChange={handleInputChange}>
                {options.map((option, index) => (
                    <Radio key={index} value={option.value}>
                        {option.label}
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

// Select Box Component
const SelectBoxComponent = ({ label, options = [], className, apiKey, ...props }) => {
    const { updateFormData } = useStructure();

    const handleInputChange = (value) => {
        updateFormData(apiKey, value);
    };

    return (
        <Form.Item label={label} {...props}>
            <Select className={className} onChange={handleInputChange}>
                {options.map((option, index) => (
                    <Select.Option key={index} value={option.value}>
                        {option.label}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

// Button Component
const ButtonComponent = ({ label, className, ...props }) => (
    <Form.Item {...props}>
        <Button className={className}>{label}</Button>
    </Form.Item>
);

// Table Component
const TableComponent = ({ tableColumns, rows, className, ...props }) => (
    <Table
        className={className}
        columns={tableColumns.map((col) => ({ title: col.value, dataIndex: col.value }))}
        dataSource={rows.map((row, rowIndex) => ({
            key: rowIndex,
            ...row.reduce((acc, cell, colIndex) => {
                acc[`Column ${colIndex + 1}`] = (
                    <div>{cell.components.map(renderComponent)}</div>
                );
                return acc;
            }, {}),
        }))}
        pagination={false}
        {...props}
    />
);

// Mapping component types to actual React components
const componentMap = {
    'Container': ContainerComponent,
    'Text Field': TextFieldComponent,
    'Phone': TextFieldComponent,
    'email': TextFieldComponent,
    'Table': TableComponent,
    'Text Area': TextAreaComponent,
    'Number': NumberFieldComponent,
    'Password': PasswordComponent,
    'Checkbox': CheckboxComponent,
    'Radio': RadioComponent,
    'Select Box': SelectBoxComponent,
    'Select': SelectBoxComponent,
    'Button': ButtonComponent,
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
