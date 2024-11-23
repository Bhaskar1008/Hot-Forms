import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Radio,
  Select,
  Form,
  theme,
} from "antd";
import FileUpload from "../HotFormBuilder/HFBModal/FileUpload/FileUpload";
import Container from "../HotFormBuilder/Container/Container";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useId } from "react";
import Accordian from "../HotFormBuilder/HFBModal/Accordian/Accordian";
import Tabs from "../HotFormBuilder/HFBModal/Tabs/Tabs";
import {
  RightSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./HotFormBuilder.css";
import TextArea from "antd/es/input/TextArea";
import TagInput from "./HFBModal/TagInput/TagInput";
import ReCaptchaComponent from "./HFBModal/Recaptcha/Recaptcha";
import DynamicTable from "./HFBModal/Components/DynamicTable/DynamicTable";
import DropZone from "./DropZone/DropZone";
import { useStructure } from "../../utils/useComponentStructure";
import HotForm from "../HotForm/HotForm";
import ReactJson from "react-json-view";
import { Link } from "react-router-dom";

const AccordionSection = ({ title, isOpen, toggle, components }) => {
  const DraggableButton = ({ type, children }) => {
    const [, drag] = useDrag(() => ({
      type: "BOX",
      item: { type },
    }));

    return (
      <button ref={drag} className="add-text-field">
        <span className="antd-icons">
          <RightSquareOutlined />
        </span>
        <span>{children}</span>
      </button>
    );
  };
  return (
    <div className="sidebar-innerdiv">
      <div className="accordian-1">
        <div className="accordian-1-title">{title}</div>
        <div className="accordian-sign" onClick={toggle}>
          {isOpen ? "-" : "+"}
        </div>
      </div>
      {isOpen && (
        <div className="components-container-outer">
          <div className="components-container">
            {components.map((component, index) => (
              <DraggableButton key={index} type={component.type}>
                {component.label}
              </DraggableButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HotFormBuilder = () => {
  const [accordian1, setAccordian1] = useState(false);
  const [accordian2, setAccordian2] = useState(false);
  const [accordian3, setAccordian3] = useState(false);
  const [accordian4, setAccordian4] = useState(false);
  const [accordian5, setAccordian5] = useState(false);
  const dispatch = useDispatch();

  // Toggle functions
  const toggleAccordian1 = () => setAccordian1(!accordian1);
  const toggleAccordian2 = () => setAccordian2(!accordian2);
  const toggleAccordian3 = () => setAccordian3(!accordian3);
  const toggleAccordian4 = () => setAccordian4(!accordian4);
  const toggleAccordian5 = () => setAccordian5(!accordian5);

  // Config for dynamic components
  const basicComponents = [
    { type: "Text Field", label: "Text Field" },
    { type: "Checkbox", label: "Checkbox" },
    { type: "Button", label: "Button" },
    { type: "Text Area", label: "Text Area" },
    { type: "Number", label: "Number" },
    { type: "Password", label: "Password" },
    { type: "Radio", label: "Radio" },
    { type: "Select Box", label: "Select Box" },
    { type: "Select", label: "Select" },
  ];

  const advancedComponents = [
    { type: "Email", label: "Email" },
    { type: "Url", label: "URL" },
    { type: "Phone", label: "Phone Number" },
    { type: "Tags", label: "Tags" },
    { type: "Address", label: "Address" },
    { type: "Date/Time", label: "Date/Time" },
    { type: "Signature", label: "Signature" },
    { type: "Day", label: "Day" },
    { type: "Time", label: "Time" },
    { type: "Currency", label: "Currency" },
    { type: "OTP", label: "OTP" },
    { type: "Survey", label: "Survey" },
  ];

  const layoutComponents = [
    { type: "HtmlElement", label: "HTML Element" },
    { type: "Tabs", label: "Tabs" },
    { type: "Content", label: "Content" },
    { type: "Column", label: "Column" },
    { type: "FieldSet", label: "Field Set" },
    { type: "Panel", label: "Panel" },
    { type: "Accordion", label: "Accordion" },
    { type: "Table", label: "Table" },
  ];

  const dataComponents = [
    { type: "Hidden", label: "Hidden" },
    { type: "Container", label: "Container" },
    { type: "DataMap", label: "Data Map" },
    { type: "DataGrid", label: "Data Grid" },
    { type: "EditGrid", label: "Edit Grid" },
  ];

  const premiumComponents = [
    { type: "Recaptcha", label: "Recaptcha" },
    { type: "File", label: "File" },
    { type: "NestedForm", label: "Nested Form" },
    { type: "Custom", label: "Custom" },
  ];

  const [SwitchLayout, setSwitchLayout] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [componentType, setComponentType] = useState("");
  const [Open, setOpen] = useState(false);
  const componentId = useId();
  const { structure, addComponentToStructure, formData } = useStructure();
  // const structureJson = {
  //   apiKey: "main_container",
  //   componentType: "Container",
  //   components: [
  //     {
  //       componentType: "Container",
  //       dropZoneID: "",
  //       apiKey: "main_container",
  //       label: "",
  //       components: [],
  //       className: "maine_container",
  //       labelPosition: "",
  //       placeholder: "",
  //       rows: [],
  //       description: "",
  //     },
  //   ],
  // };
  // useEffect(() => {
  //   localStorage.setItem("componentStructure", JSON.stringify(structureJson));
  // }, [structureJson]);
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

  const removeField = (id) => {
    const updatedFields = formFields.filter((field) => field?.id !== id);
    setFormFields(updatedFields);
  };

  const handleClickBtn = (field) => {
    console.log("event field-->", field);
  };

  const Field = ({ field, index }) => {
    const [, drag] = useDrag({
      type: "BOX",
      item: { index, field },
    });

    return (
      <div ref={drag} className="draggable-field">
        <div className="field-actions">
          <div className="icon-container" style={{ float: "right" }}>
            <EditOutlined style={{ fontSize: "18px", marginRight: "4px" }} />
            <DeleteOutlined
              style={{ fontSize: "18px", color: "red" }}
              onClick={() => removeField(field.id)}
            />
          </div>
          <div key={field.key} id={field.key}>
            {/* <p style={{ marginBottom: "10px" }}>{field?.label || field?.componentType}</p> */}
            {field.componentType === "Text Field" ? (
              <>
                {field?.widget === "calendarPicker" ? (
                  <DatePicker style={{ width: "100%" }} />
                ) : (
                  <Input
                    placeholder={field?.placeholder}
                    className={field?.customClass}
                    prefix={field?.prefix}
                    suffix={field?.suffix}
                    disabled={field?.disabled}
                    onChange={(e) => {
                      e.target.value === field.logic.SimpleHas
                        ? eval(field.logic.ActionCustom)
                        : eval();
                    }}
                  />
                )}
              </>
            ) : field.componentType === "Radio" ? (
              <>
                <Radio className={field?.customClass} />
              </>
            ) : field.componentType === "Checkbox" ? (
              <>
                <Checkbox
                  disabled={field?.disabled}
                  className={field?.customClass}
                  style={{ marginLeft: "5px" }}
                />
              </>
            ) : field.componentType === "Button" ? (
              <Button
                className={field?.customClass}
                style={{
                  backgroundColor: field?.theme,
                  color: field?.theme === "" ? "black" : "#fff",
                }}
                disabled={field?.disabled}
                onClick={() => handleClickBtn(field)}
              ></Button>
            ) : field.componentType === "recaptcha" ? (
              <ReCaptchaComponent />
            ) : field.componentType == "accordian" ? (
              <Accordian AccordianColumns={field?.AccordianColumns} />
            ) : field.componentType == "tabs" ? (
              <Tabs
                numberOfTabs={field?.numberOfTabs}
                tabsPosition={field?.tabsPosition}
              />
            ) : field.componentType === "Select" ? (
              <>
                <div>
                  <Select
                    disabled={field?.disabled}
                    style={{ width: "100%" }}
                    className={field?.customClass}
                  >
                    submit
                  </Select>
                </div>
              </>
            ) : field.componentType === "Number" ? (
              <>
                <Input
                  disabled={field?.disabled}
                  type="Number"
                  prefix={field?.prefix}
                  suffix={field?.suffix}
                  className={field?.customClass}
                  placeholder={field?.placeholder}
                />
              </>
            ) : field.componentType == "Table" ? (
              <>
                <DynamicTable
                  numberOfRows={field?.numberOfRows}
                  numberOfColumns={field?.numberOfColumns}
                  tableColumns={field?.tableColumns}
                />
              </>
            ) : field.componentType === "tags" ? (
              <>
                <TagInput />
              </>
            ) : field.componentType === "Phone" ? (
              <>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    field?.validate?.minLength && {
                      min: +field?.validate?.minLength,
                      message: `Minimum ${field?.validate?.minLength} characters required`,
                    },
                    field?.validate?.maxLength && {
                      max: +field?.validate?.maxLength,
                      message: `Maximum ${field?.validate?.maxLength} characters allowed`,
                    },
                  ]}
                >
                  <Input
                    type="tel"
                    autoComplete="tel"
                    addonBefore={field?.addonBefore}
                    addonAfter={field?.addonAfter}
                    disabled={field?.disabled}
                    placeholder={field?.placeholder}
                    className={field?.customClass}
                  />
                </Form.Item>
              </>
            ) : field.componentType === "email" ? (
              <>
                <Form.Item
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
                    disabled={field?.disabled}
                    prefix={field?.prefix}
                    suffix={field?.suffix}
                    type="Email"
                    className={field?.customClass}
                    autoComplete="email"
                    placeholder={field?.placeholder}
                  />
                </Form.Item>
              </>
            ) : field.componentType === "url" ? (
              <>
                <Form.Item
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
                    disabled={field?.disabled}
                    type="Url"
                    prefix={field?.prefix}
                    suffix={field?.suffix}
                    className={field?.customClass}
                    placeholder={field?.placeholder}
                  />
                </Form.Item>
              </>
            ) : field.componentType === "Date/Time" ? (
              <>
                <Form.Item
                  name="datetime"
                  rules={[
                    {
                      required: true,
                      message: "Please select date and time!",
                    },
                  ]}
                >
                  <DatePicker
                    format={field?.format}
                    className={field?.customClass}
                    disabled={field?.disabled}
                    showTime
                    placeholder={field?.placeholder}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </>
            ) : field.componentType === "Password" ? (
              <>
                <Input
                  disabled={field?.disabled}
                  type="Password"
                  prefix={field?.prefix}
                  suffix={field?.suffix}
                  className={field?.customClass}
                  placeholder={field?.placeholder}
                />
              </>
            ) : field.componentType === "upload" ? (
              <>
                <FileUpload />
              </>
            ) : field.componentType === "Container" ? (
              <>
                <Container />
              </>
            ) : field.componentType === "signature" ? (
              <>
                <div
                  style={{
                    backgroundColor: field.signature.bgColor,
                  }}
                >
                  <img src={field?.signature?.imgURL} alt="signature" />
                  <div>{field?.signature?.footerLabel}</div>
                </div>
              </>
            ) : field.componentType === "Select Box" ? (
              <>
                <div>
                  <Checkbox className={field?.customClass}></Checkbox>
                </div>
              </>
            ) : field.componentType === "Day" ? (
              <>
                <div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    {field.fieldDay === "number" ? (
                      <Input
                        type="number"
                        placeholder={field?.fieldDayPlaceholder}
                      />
                    ) : (
                      <Select
                        options={months}
                        placeholder={field?.fieldDayPlaceholder}
                        style={{ width: "100%" }}
                      />
                    )}
                    {field.fieldMonth === "number" ? (
                      <Input
                        type="number"
                        placeholder={field?.fieldMonthPlaceholder}
                      />
                    ) : (
                      <Select
                        options={Array.from({ length: 31 }, (_, i) => ({
                          value: i + 1,
                          label: `${i + 1}`,
                        }))}
                        style={{ width: "100%" }}
                        placeholder={field?.fieldMonthPlaceholder}
                      />
                    )}
                    {field.fieldYear === "number" ? (
                      <Input
                        type="number"
                        placeholder={field?.fieldYearPlaceholder}
                      />
                    ) : (
                      <Select
                        style={{ width: "100%" }}
                        placeholder={field?.fieldYearPlaceholder}
                        options={Array.from({ length: 41 }, (_, i) => ({
                          value: 1990 + i,
                          label: `${1990 + i}`,
                        }))}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <TextArea
                  value={field?.placeholder}
                  disabled={field?.disabled}
                />
              </>
            )}
            <p style={{ marginBottom: "10px" }}>{field?.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          paddingRight: "55px",
        }}
      >
        <Button
          style={{
            backgroundImage:
              "linear-gradient(89.5deg, rgba(131, 204, 255, 1) 0.4%, rgba(66, 144, 251, 1) 100.3%)",
            color: "#fffff",
          }}
        >
          {/* <a
            href="http://localhost:3000/preview"
            target="_blank"
            style={{ color: "#fffff !important" }}
          >
            Preview
          </a> */}
          <Link
            to="/preview"
            style={{
              color: "#fffff",
            }}
          >
            Preview
          </Link>
        </Button>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="form-builder-container" style={{ margin: "15px" }}>
          <div className="sidebar-container">
            <AccordionSection
              title="Basic"
              isOpen={accordian1}
              toggle={toggleAccordian1}
              components={basicComponents}
            />
            <AccordionSection
              title="Advanced"
              isOpen={accordian2}
              toggle={toggleAccordian2}
              components={advancedComponents}
            />
            <AccordionSection
              title="Layout"
              isOpen={accordian3}
              toggle={toggleAccordian3}
              components={layoutComponents}
            />
            <AccordionSection
              title="Data"
              isOpen={accordian4}
              toggle={toggleAccordian4}
              components={dataComponents}
            />
            <AccordionSection
              title="Premium"
              isOpen={accordian5}
              toggle={toggleAccordian5}
              components={premiumComponents}
            />
          </div>

          <DropZone id="main_container" />
        </div>
      </DndProvider>
      <h1 style={{ textAlign: "center" }}>Render</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactJson
          src={structure}
          name="components"
          collapsed
          enableClipboard
          theme="monokai"
          style={{
            width: "50%",
            padding: "20px",
            maxHeight: "50vh",
            overflowY: "scroll",
          }}
        />
      </div>
      ;{console.log("<<structure", structure)}
    </>
  );
};

export default HotFormBuilder;
