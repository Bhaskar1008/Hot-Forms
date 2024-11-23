import React, { useEffect, useState, useRef } from "react";
import { Input, Button, Form, Radio, Checkbox, Select, DatePicker } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Container from "../../Container/Container";
import SignatureCanvas from "react-signature-canvas";
import FileUpload from "../FileUpload/FileUpload";
import TagInput from "../TagInput/TagInput";
import ReCaptchaComponent from "../Recaptcha/Recaptcha";
import DynamicTable from "../Components/DynamicTable/DynamicTable";
import OTPComponent from "../Components/OTPComponent/OTPComponent";
import Accordian from "../Accordian/Accordian";
import Tabs from "../Tabs/Tabs";
import GridContainer from "../Components/GridContainer/GridContainer";
const Preview = ({ values, componentType, setDisplayObj }) => {
  const { display = {}, data = {}, validation = {} } = values;
  const [Fields, setField] = useState("");
  const [Day, setDay] = useState([]);
  const [Year, setYear] = useState([]);
  const {
    label,
    prefix,
    suffix,
    theme,
    placeholder,
    customClass,
    description,
    disabled,
    hideLabel,
    labelPosition,
    widget,
    markerColor,
    bgColor,
    footerLabel,
    autocomplete,
    numberOfRows,
    numberOfColumns,
    tableColumns,
    OTPLength,
    AccordianColumns,
    numberOfTabs,
    tabsPosition,
    numberOfGrid,
  } = display;
  
  useEffect(() => {
    const day_options = [];
    const year_options = [];
    for (let i = 1; i <= 31; i++) {
      day_options.push({
        label: i,
        value: i,
      });
    }
    setDay([day_options]);
    for (let i = 1992; i <= 2030; i++) {
      year_options.push({
        label: i,
        value: i,
      });
    }
    setYear([year_options]);
  }, []);
  // if(componentType=="Day"){
  //   setField(display.fields);
  // }
  const { defaultValue, case: testCase, multiple } = data;
  const { required, minLength, maxLength } = validation;
  const inputValue =
    testCase === "upperCase"
      ? defaultValue.toUpperCase()
      : testCase === "lowerCase"
      ? defaultValue.toLowerCase()
      : defaultValue;

  const [fields, setFields] = useState([""]);
  const [ImgURL, setImgURL] = useState("");

  const sigCanvas = useRef({});

  useEffect(() => {
    if (!multiple) {
      setFields([""]);
    }
  }, [multiple]);
  const conditionalStyles = {
    display: "flex",
    flexDirection: labelPosition == "bottom" ? "column" : "row",
    justifyContent: labelPosition == "rightAligned" ? "space-between" : "",
  };


  const handleAddField = () => {
    setFields((prevFields) => [...prevFields, ""]);
  };

  const handleDeleteField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setImgURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    setDisplayObj((prevValues) => ({
      ...prevValues,
      display: {
        ...prevValues.display,
        imgURL: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
      },
    }));
  };

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];
  return (
    <div>
      <h2
        style={{
          borderBottom: "1px solid #80808033",
          paddingBottom: "12px",
          margin: "0px 0px 20px 0px",
        }}
      >
        Preview
      </h2>
      {componentType == "Button" ? (
        <label></label>
      ) : (
        <label style={{ margin: "20px 5px 20px 0" }}>
          {(!hideLabel && label) || componentType}
        </label>
      )}
      {required && <span style={{ color: "red" }}>*</span>}
      <Form>
        {fields.map((_, index) => (
          <div key={index} style={{ display: "flex" }}>
            <Form.Item
              name={`field-${index}`}
              rules={[
                // {
                //   required: required,
                //   message: `Please enter a value for field ${index + 1}`,
                // },
                minLength && {
                  min: +minLength,
                  message: `Minimum ${minLength} characters required`,
                },
                maxLength && {
                  max: +maxLength,
                  message: `Maximum ${maxLength} characters allowed`,
                },
              ].filter(Boolean)}
              style={{ flex: 1, marginRight: "10px" }}
            >
              {componentType == "Text Field" ? (
                widget == "calendarPicker" ? (
                  <>
                    <label style={{ textTransform: "capitalize" }}>
                      Calender Pick
                    </label>
                    <DatePicker style={{ width: "100%" }} />
                  </>
                ) : (
                  <>
                    
                    <Input
                      addonBefore={prefix}
                      addonAfter={suffix}
                      value={inputValue}
                      defaultValue={inputValue}
                      type={
                        componentType === "Text Field"
                          ? "text"
                          : componentType.toLowerCase()
                      }
                      placeholder={inputValue || placeholder || "Placeholder"}
                      className={customClass}
                      disabled={disabled}
                    />
                  </>
                )
              ) : componentType == "Button" ? (
                <>
              
                  <Button
                    className={customClass}
                    disabled={disabled}
                    style={{
                      backgroundColor: theme,
                      color: theme == "" ? "black" : "#fff",
                    }}
                  >
                    {hideLabel ? "Button" : label}
                  </Button>
                </>
              ) : componentType == "tabs" ? (
                <>
                  <Tabs
                    numberOfTabs={numberOfTabs}
                    tabsPosition={tabsPosition}
                    setDisplayObj={setDisplayObj}
                  />
                </>
              ) : componentType == "Container" ? (
                <>
                  <div>
                    <div style={{ textTransform: "capitalize" }}>
                      {" "}
                      {componentType}
                    </div>
                    <Container />
                  </div>
                </>
              ) : componentType == "Table" ? (
                <>
                  <DynamicTable
                    numberOfRows={numberOfRows}
                    numberOfColumns={numberOfColumns}
                    tableColumns={tableColumns}
                  />
                </>
              ) : componentType == "signature" ? (
                <>
                  <div>
                    <label style={{ textTransform: "capitalize" }}>
                      {componentType}
                    </label>
                    <div
                      style={{
                        backgroundColor: bgColor == true ? "#F3F7EC" : bgColor,
                      }}
                    >
                      <SignatureCanvas
                        penColor={markerColor}
                        // disabled={disabled}
                        ref={sigCanvas}
                        canvasProps={{
                          width: 500,
                          height: 200,
                          className: "sigCanvas",
                        }}
                      />
                    </div>
                    <div> {footerLabel}</div>
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                </>
              ) : componentType == "Text Area" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <TextArea
                    placeholder={inputValue || placeholder || "Placeholder"}
                    disabled={disabled}
                  />
                </>
              ) : componentType == "accordian" ? (
                <>
                  <Accordian AccordianColumns={AccordianColumns}/>
                </>
              ) : componentType == "tags" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <TagInput />
                </>
              ) : componentType == "Checkbox" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Checkbox className={customClass} disabled={disabled}>
                    {componentType}
                  </Checkbox>
                </>
              ) : componentType == "Data Grid" ? (
                <>
                 <GridContainer numberOfGrid={numberOfGrid} customClass={customClass}/>
                </>
              ): componentType == "recaptcha" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <ReCaptchaComponent />
                </>
              ) : componentType == "upload" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <FileUpload />
                </>
              ) : componentType == "Select Box" ? (
                <div>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Checkbox
                    className={customClass}
                    disabled={disabled}
                    style={{ marginRight: "5px" }}
                  />
                  <div>{!hideLabel && (label || componentType)}</div>
                </div>
              ) : componentType == "Select" ? (
                <div>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Select className={customClass} disabled={disabled}></Select>
                </div>
              ) : componentType == "Number" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Input
                    // style={labelPosition}
                    addonBefore={prefix}
                    addonAfter={suffix}
                    value={inputValue}
                    type="Number"
                    disabled={disabled}
                    placeholder={inputValue || placeholder || "Placeholder"}
                  />
                </>
              ) : componentType == "Password" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Input
                    // style={labelPosition}
                    type="Password"
                    addonBefore={prefix}
                    addonAfter={suffix}
                    value={inputValue}
                    disabled={disabled}
                    placeholder={inputValue || placeholder || "Placeholder"}
                    customClass={customClass}
                  />
                </>
              ) : componentType == "OTP" ? (
                <>
                  {/* <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label> */}
                  <OTPComponent OTPLength={OTPLength} />
                </>
              ) : componentType == "Phone" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Form.Item
                    // label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                      minLength && {
                        min: +minLength,
                        message: `Minimum ${minLength} characters required`,
                      },
                      maxLength && {
                        max: +maxLength,
                        message: `Maximum ${maxLength} characters allowed`,
                      },
                    ]}
                  >
                    <Input
                      type="tel"
                      autoComplete="tel"
                      // placeholder="Enter your phone number"
                      addonBefore={prefix}
                      addonAfter={suffix}
                      value={inputValue}
                      disabled={disabled}
                      placeholder={placeholder}
                      className={customClass}
                    />
                  </Form.Item>
                </>
              ) : componentType == "Date/Time" ? (
                <>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  <Form.Item
                    // label="Date and Time"
                    name="datetime"
                    rules={[
                      {
                        required: true,
                        message: "Please select date and time!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={display?.format}
                      className={customClass}
                      disabled={disabled}
                      showTime
                      placeholder={placeholder}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </>
              ) : componentType == "Day" ? (
                <>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label>Month</label>
                      {display.fieldMonth == "select" ? (
                        <Select
                          options={months}
                          style={{ width: "180px" }}
                          placeholder={display?.fieldMonthPlaceholder}
                        />
                      ) : (
                        <Input
                          type="number"
                          placeholder={display?.fieldMonthPlaceholder}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        paddingLeft: "4px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label>Day</label>
                      {display.fieldDay == "number" ? (
                        <Input
                          type="number"
                          placeholder={display?.fieldDayPlaceholder}
                        />
                      ) : (
                        <Select
                          style={{ width: "180px" }}
                          options={Array.from({ length: 31 }, (_, i) => ({
                            value: i + 1,
                            label: `${i + 1}`,
                          }))}
                          placeholder={display?.fieldDayPlaceholder}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        marginLeft: "4px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label>Year</label>
                      {display.fieldYear == "number" ? (
                        <Input
                          type="number"
                          placeholder={display?.fieldYearPlaceholder}
                        />
                      ) : (
                        <Select
                          style={{ width: "180px" }}
                          options={Array.from({ length: 41 }, (_, i) => ({
                            value: 1990 + i,
                            label: `${1990 + i}`,
                          }))}
                          placeholder={display?.fieldYearPlaceholder}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : componentType == "url" ? (
                <div>
                  <label style={{ textTransform: "capitalize" }}>
                    {componentType}
                  </label>
                  {/* <Input
                    addonBefore={prefix}
                    addonAfter={suffix}
                    // value={inputValue}
                    defaultValue={inputValue}
                    type={componentType.toLowerCase()}
                    placeholder={inputValue || placeholder || "Placeholder"}
                    className={customClass}
                    disabled={disabled}
                  /> */}
                  <Form.Item
                    // label="Website URL"
                    name="url"
                    rules={[
                      {
                        type: "url",
                        message: "The input is not valid URL!",
                      },
                      {
                        required: true,
                        message: "Please input your website URL!",
                      },
                    ]}
                  >
                    <Input
                      type="url"
                      autoComplete="url"
                      placeholder={placeholder}
                      addonBefore={prefix}
                      addonAfter={suffix}
                      className={customClass}
                      disabled={disabled}
                    />
                  </Form.Item>
                </div>
              ) : componentType == "email" ? (
                <>
                  <div>
                    <label style={{ textTransform: "capitalize" }}>
                      {componentType}
                    </label>
                    <Form.Item
                      // label="Email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        autoComplete="email"
                        addonBefore={prefix}
                        addonAfter={suffix}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={customClass}
                      />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <Radio className={customClass} disabled={disabled}>
                  {!hideLabel && (label || componentType)}
                </Radio>
              )}
            </Form.Item>
            {multiple && (
              <DeleteOutlined
                onClick={() => handleDeleteField(index)}
                style={{ fontSize: "20px" }}
              />
            )}
          </div>
        ))}
      </Form>
      {multiple && (
        <Button type="primary" onClick={handleAddField}>
          Add Field
        </Button>
      )}
      <p style={{ marginBottom: "10px" }}>{description}</p>
    </div>
  );
};

export default Preview;
