import React, { useState } from "react";
import { Checkbox, Table, Input, Button, Space, Select, Radio } from "antd";
import { v4 as uuidv4 } from "uuid";
import componentJson from "../../../../Jsons/displayJson.json";
import "./DataComp.css";

const DataComp = ({ setDataObj, componentType }) => {
  const [value, setValue] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e, fieldName) => {
    setDataObj((prevValues) => ({
      ...prevValues,
      data: {
        ...prevValues.data,
        [fieldName]: e.target.value,
      },
    }));
  };

  const onChanges = (e) => {
    setValue(e.target.value);
    handleInputChange(e, "case");
  };

  const handleChange = (value) => {
    console.log("Selected value:", value);
  };

  const handleMultipleField = () => {
    setIsChecked(!isChecked);
    handleInputChange({ target: { value: !isChecked } }, "multiple");
  };

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, record) => (
        <Input
          value={record.label}
          onChange={(e) =>
            handleDataSourceInputChange(e.target.value, record.key, "label")
          }
          placeholder="Enter label"
        />
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (_, record) => (
        <Input
          value={record.value}
          onChange={(e) =>
            handleDataSourceInputChange(e.target.value, record.key, "value")
          }
          placeholder="Enter value"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleRemove(record.key)}>Remove</Button>
      ),
    },
  ];

  const handleDataSourceInputChange = (value, key, field) => {
    const updatedData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setDataObj((prevValues) => ({
      ...prevValues,
      data: {
        ...prevValues.data,
        ["dataSrcValues"]: updatedData,
      },
    }));
    setDataSource(updatedData);
  };

  const handleAdd = () => {
    const newData = {
      key: uuidv4(),
      label: "",
      value: "",
    };
    setDataSource([...dataSource, newData]);
  };

  const handleRemove = (key) => {
    const updatedData = dataSource.filter((item) => item.key !== key);
    setDataSource(updatedData);
  };

  const renderInput = (fieldName, placeholder) =>
    componentJson?.Basic?.[componentType]?.data?.[fieldName] && (
      <Input
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e, fieldName)}
      />
    );

  const renderSelect = (fieldName, options) =>
    componentJson?.Basic?.[componentType]?.data?.[fieldName] && (
      <>
        <Select
          style={{ width: "100%" }}
          options={options}
          onChange={(value) =>
            handleInputChange({ target: { value } }, fieldName)
          }
        />
      </>
    );

  const renderCheckbox = (fieldName, label) =>
    componentJson?.Basic?.[componentType]?.data?.[fieldName] && (
      <Checkbox onChange={handleMultipleField}>{label}</Checkbox>
    );

  const renderRadioGroup = (fieldName, options) =>
    componentJson?.Basic?.[componentType]?.data?.[fieldName] && (
      <Radio.Group
        onChange={onChanges}
        value={value}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    );

  return (
    <div>
      {renderCheckbox("multiple", "Multiple Values")}

      <div>{renderInput("defaultValue", "Default Value")}</div>
      {componentJson?.Basic?.[componentType]?.data?.["dataSrc"] &&
      <>
      <span>Data Source Type</span>
       { renderSelect("dataSrc", [
          { label: "values", value: "values" },
          { label: "URL", value: "url" },
        ])}
        </>
        }
      {componentJson?.Basic?.[componentType]?.data?.["dataSrc"] &&
      <>
      <span>Default Values</span><br></br>
      <Radio/>
      </>

      }

      <div className="data-select">
        {renderSelect("dataSourceType", [{ value: "value", label: "Values" }])}
      </div>
      {componentJson?.Basic?.[componentType]?.data?.["dataSrc"] && (
        <>
          <span>Data Source Values</span>
          <br></br>
          <div style={{ border: "1px solid black" }}>
            <Space direction="vertical" style={{ marginBottom: 16 }}>
              
            </Space>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.key}
            />
            <Button onClick={handleAdd} type="primary">
                Add Row
              </Button>
          </div>
        </>
      )}
      <div className="radio">
        {renderRadioGroup("case", [
          { value: "mixed", label: "Mixed (Allow uppercase and lowercase)" },
          { value: "upperCase", label: "Uppercase" },
          { value: "lowerCase", label: "Lowercase" },
        ])}
      </div>
      <div className="data-select">
        {renderSelect("redrawOn", [
          { value: "Any Change", label: "Any Change" },
        ])}
      </div>

      <div className="data-select">
        {/* <Checkbox onChange={onChange}>Clear Values when hidden</Checkbox> */}
      </div>
    </div>
  );
};

export default DataComp;
