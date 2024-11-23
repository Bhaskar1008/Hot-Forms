import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox, Row } from "antd";

import componentJson from "../../../../Jsons/displayJson.json";
// import './Display.css';

const Display = ({ componentType, setDisplayObj, values }) => {
  useEffect(() => {
    if (values) {
      setValues(values.display || {});
    }
  }, [values]);

  const [Values, setValues] = useState({
    label: "",
    labelPosition: "",
    placeholder: "",
    description: "",
    tooltip: "",
    prefix: "",
    suffix: "",
    customClass: "",
    theme: "",
    disabled: "",
  });

  const [columns, setColumns] = useState([]);
  const [Rows, setRows] = useState([]);
  const [Tabs, setTabs] = useState([]);


  const initializeColumns = (numberOfColumns) => {
    const initialColumns = Array.from({ length: numberOfColumns }, (_, i) => ({
      value: `Column ${i + 1}`,
    }));
    setColumns(initialColumns);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        tableColumns: initialColumns,
      },
    }));
  };
  const initializeRow = (numberOfRow) => {
    const initialRow = Array.from({ length: numberOfRow }, (_, i) => ({
      value: `Column ${i + 1}`,
    }));
    setRows(initialRow);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        AccordianColumns: initialRow,
      },
    }));
  };
  const initializeTabs = (numberOfRow) => {
    const initialRow = Array.from({ length: numberOfRow }, (_, i) => ({
      value: `Tab ${i + 1}`,
    }));
    setTabs(initialRow);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        numberOfTabs: initialRow,
      },
    }));
  };
  const handleColumnChange = (index, e) => {
    const newColumns = [...columns];
    newColumns[index].value = e.target.value;
    setColumns(newColumns);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        tableColumns: newColumns,
      },
    }));
  };
  const handleAccordianColumnChange = (index, e) => {
    const newColumns = [...Rows];
    newColumns[index].value = e.target.value;
    setRows(newColumns);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        AccordianColumns: newColumns,
      },
    }));
  };
  const handleTabs = (index, e) => {
    const newColumns = [...Tabs];
    newColumns[index].value = e.target.value;
    setTabs(newColumns);
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        numberOfTabs: newColumns,
      },
    }));
  };

  const handleInputChange = (e, fieldName) => {
    if (fieldName === "numberOfColumns") {
      const numberOfColumns = parseInt(e.target.value, 10);
      if (!isNaN(numberOfColumns)) {
        initializeColumns(numberOfColumns);
      }
    }
    if (fieldName === "numberOfAccordianColumn") {
      const numberOfRows = parseInt(e.target.value, 10);
      if (!isNaN(numberOfRows)) {
        initializeRow(numberOfRows);
      }
    }
    if (fieldName === "numberOfTabs") {
      const numberOfRows = parseInt(e.target.value, 10);
      if (!isNaN(numberOfRows)) {
        initializeTabs(numberOfRows);
      }
    }else{
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: e.target.value,
    }));
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        [fieldName]: e.target.value,
      },
    }));
  }
  };

  const renderField = (fieldName, label) => {
    const shouldDisplay =
      componentJson?.Basic?.[componentType]?.display?.[fieldName] === true;
    return shouldDisplay ? (
      <div key={fieldName}>
        <span>{label}</span>
        <Input
          placeholder={label}
          value={Values?.[fieldName]}
          className="display-input"
          onChange={(e) => handleInputChange(e, fieldName)}
        />
      </div>
    ) : null;
  };

  const handleChangeCheckbox = (e, fieldName) => {
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        [fieldName]: e.target.checked,
      },
    }));
  };

  const renderCheckbox = (value, label) => {
    const shouldDisplay =
      componentJson?.Basic?.[componentType]?.display?.[value] === true;
    return shouldDisplay ? (
      <Checkbox
        key={value}
        className="display-input display-checkbox"
        value={value}
        onChange={(e) => handleChangeCheckbox(e, value)}
      >
        {label}
      </Checkbox>
    ) : null;
  };

  const RenderSelect = (fieldName, label, options) => {
    const [SelectBtn, setSelectBtn] = useState(false);
    const shouldDisplay =
      componentJson?.Basic[componentType]?.display?.[fieldName] === true;
    const handleChange = (val) => {
      val === 'eventbtn' ? setSelectBtn(true) : setSelectBtn(false);
      setDisplayObj((prevValues) => ({
        ...prevValues,
        display: {
          ...prevValues.display,
          [fieldName]: label === "Theme" ? val : val,
        },
      }));
    };
    return shouldDisplay ? (
      <>
        <span>{label}</span>
        <Select
          showSearch
          className="display-input"
          placeholder={label}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
          onChange={handleChange}
        />
      </>
    ) : null;
  };

  const items = [
    { value: "top", label: "Top" },
    { value: "leftAligned", label: "Left (Left-aligned)" },
    { value: "rightAligned", label: "Left (Right-aligned)" },
    { value: "bottom", label: "Bottom" },
  ];
  const tabs_position = [
    { value: "top", label: "Top" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "bottom", label: "Bottom" },
  ];


  const button_theme = [
    { value: "blue", label: "primary" },
    { value: "green", label: "Success" },
    { value: "red", label: "Danger" },
    { value: "yellow", label: "Warning" },
    { value: "grey", label: "Secondary" },
  ];

  const button_events = [
    { value: "submit", label: "Submit" },
    { value: "eventbtn", label: "Event" },
  ];

  return (
    <div className="display-container">
      {renderField("label", "Label")} 
      {renderField("apiKey", "Property Name")} 
      {renderField("numberOfGrid", "Number Of Grid")} 
      {renderField("numberOfColumns", "Number Of Columns")}
      {renderField("numberOfTabs", "Number Of Tabs")}
      {Tabs && Tabs.map((column, index) => (
        <div key={index}>
          <span>Tab {index + 1}</span>
          <Input
            placeholder={`Tab ${index + 1}`}
            className="display-input"
            value={column.value}
            onChange={(e) => handleTabs(index, e)}
          />
        </div>
      ))}
      {columns && componentJson?.Basic?.["Table"]?.display?.["numberOfColumns"] && columns.map((column, index) => (
        <div key={index}>
          <span>Column {index + 1}</span>
          <Input
            placeholder={`Column ${index + 1}`}
            className="display-input"
            value={column.value}
            onChange={(e) => handleColumnChange(index, e)}
          />
        </div>
      ))}
      {renderField("numberOfRows", "Number Of Rows")}
      {renderField("OTPLength", "OTP Length")}
      {renderField("numberOfAccordianColumn", "Number Of Accordian Column")}
      {Rows && Rows.map((column, index) => (
        <div key={index}>
          <span>Column {index + 1}</span>
          <Input
            placeholder={`Row ${index + 1}`}
            className="display-input"
            value={column.value}
            onChange={(e) => handleAccordianColumnChange(index, e)}
          />
        </div>
      ))}
      {renderField("footerLabel", "Footer Label")}
      {RenderSelect("tabsPosition", "Tabs Position",tabs_position)}

      {RenderSelect("labelPosition", "Label Position", items)}
      {renderField("bgColor", "BackGround Color")}
      {renderField("markerColor", "Pen Color")}
      {RenderSelect("action", "Action", button_events)}
      {Values.action === 'eventbtn' && renderField("eventName", "Event Name")}
      {renderField("placeholder", "Placeholder")}
      {renderField("description", "Description")}
      {renderField("format", "Format")}
      {renderField("tooltip", "Tooltip")}
      {renderField("prefix", "Prefix")}
      {renderField("suffix", "Suffix")}
      {RenderSelect("widget", "Widget", [
        { value: "inputField", label: "Input Field" },
        { value: "calendarPicker", label: "Calendar Picker" },
      ])}
      {renderField("inputMask", "Input Mask")}
      {RenderSelect("displayMask", "Display Mask")}
      {RenderSelect("applyMaskOn", "Apply Mask On", [
        { value: "onChange", label: "Change" },
        { value: "blur", label: "Blur" },
      ])}
      {renderCheckbox("allowMultipleMasks", "Allow Multiple Masks")}
      {renderField("customClass", "Custom CSS Class")}
      {RenderSelect("theme", "Theme", button_theme)}
      {renderField("tabIndex", "Tab Index")}
      {renderField("autocomplete", "Autocomplete")}
      {renderCheckbox("hidden", "Hidden")}
      {renderCheckbox("hideLabel", "Hide Label")}
      {renderCheckbox("showWordCounter", "Show Word Counter")}
      {renderCheckbox("showCharacterCounter", "Show Character Counter")}
      {renderCheckbox("hideInput", "Hide Input")}
      {renderCheckbox("initialFocus", "Initial Focus")}
      {renderCheckbox("disabled", "Disabled")}
      {renderCheckbox("tableView", "Table View")}
      {renderCheckbox("modalEdit", "Modal Edit")}
    </div>
  );
};

export default Display;
