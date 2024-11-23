import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
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
import TextArea from "antd/es/input/TextArea";
import TagInput from "antd-tag-input";
import componentsVal from "../../../Jsons/displayObj.json";
import Container from "../Container/Container";
import HFBModal from "../HFBModal/HFBModal";
import GridContainer from "../HFBModal/Components/GridContainer/GridContainer";
import DynamicTable from "../HFBModal/Components/DynamicTable/DynamicTable";
import FileUplaod from "../HFBModal/FileUpload/FileUpload";
import { useStructure } from "../../../utils/useComponentStructure";

const DropZone = ({ setDisplayObj, label, id }) => {
  const [values, setValues] = useState(componentsVal?.Basic);
  const [open, setOpen] = useState(false);
  const [itemType, setItemType] = useState("");
  const [dropZoneId, setDropZoneId] = useState("");
  const [Components, setComponents] = useState([]);
  const { structure, addComponentToStructure } = useStructure();
  const [{ isDragging }, drag] = useDrag({
    type: "BOX",
    item: [],
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "BOX",
    drop: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      item.label = label;
      item.dropZoneId = id;
      setDropZoneId(id);
      setItemType(item?.type);
      setOpen(true);
    },
  });

  const addField = (field, componentType) => {
    const { display, logic } = field;
    const rows = Array.from({ length: display?.numberOfRows || 0 }, () =>
      Array.from({ length: display?.numberOfColumns || 0 }, () => ({
        components: [],
      }))
    );
    const newField = {
      componentType: componentType,
      dropZoneId: dropZoneId,
      apiKey: display?.apiKey,
      tabsData: display?.tabsData,
      componentType: componentType,
      label: display?.label,
      className: display?.customClass,
      components: [],
      numberOfGrid: display?.numberOfGrid,
      tableColumns: display?.tableColumns,
      numberOfColumns: display?.numberOfColumns,
      numberOfRows: display?.numberOfRows,
      labelPosition: display?.labelPosition,
      placeholder: display?.placeholder,
      rows: rows,
      description: display?.description,
    };
    addComponentToStructure(newField);
    const updatedComponents = [...Components, newField];

    // Update state based on dropZoneId
    if (dropZoneId === "container") {
      setComponents((prevComponents) => {
        return prevComponents.map((component) => {
          if (component.componentType === " ") {
            return {
              ...component,
              components: [...component.components, newField],
            };
          }
          return component;
        });
      });
    } else {
      setComponents(updatedComponents);
    }

    setOpen(false);
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
    <>
      <div
        ref={(node) => drag(drop(node))}
        style={{
          minHeight: "50px",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          border: "1px dotted",
          width: "100%",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {Components.map((item, index) => (
          <div key={index}>
            {/* Top-level components */}
            {item.componentType === "Text Field" ? (
              <>
                {item.widget === "calendarPicker" ? (
                  <DatePicker style={{ width: "100%" }} />
                ) : (
                  <>
                    <label htmlFor="">{item?.label}</label>
                    <Input
                      placeholder={item.placeholder}
                      className={item.customClass}
                      defaultValue={item?.defaultValue}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      disabled={item.disabled}
                      onChange={(e) => {
                        e.target.value === item?.logic?.SimpleHas
                          ? eval(item.logic.ActionCustom)
                          : eval();
                      }}
                    />
                  </>
                )}
              </>
            ) : item.componentType === "Radio" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <Radio className={item.customClass} />
              </>
            ) : item.componentType === "Data Grid" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <GridContainer
                  numberOfGrid={item?.numberOfGrid}
                  customClass={item?.customClass}
                />
              </>
            ) : item.componentType === "Checkbox" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <Checkbox
                  disabled={item.disabled}
                  className={item.customClass}
                  style={{ marginLeft: "5px" }}
                />
              </>
            ) : item.componentType === "Button" ? (
              <Button
                className={item.customClass}
                style={{
                  backgroundColor: item.theme,
                  color: item.theme === "" ? "#fff" : "black",
                }}
                disabled={item.disabled}
              >
                {item.hideLabel ? "Button" : item.label}
              </Button>
            ) : item.componentType === "Select" ? (
              <>
                <label htmlFor="">{item?.label}</label>

                <Select
                  disabled={item.disabled}
                  style={{ width: "100%" }}
                  className={item.customClass}
                >
                  {item.label}
                </Select>
              </>
            ) : item.componentType === "Number" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <Input
                  disabled={item.disabled}
                  type="Number"
                  prefix={item.prefix}
                  suffix={item.suffix}
                  className={item.customClass}
                  placeholder={item.placeholder}
                />
              </>
            ) : item.componentType === "Table" ? (
              <DynamicTable
                numberOfRows={item.numberOfRows}
                numberOfColumns={item.numberOfColumns}
                tableColumns={item.tableColumns}
                label={item.label}
                apiKey={item.apiKey}
              />
            ) : item.componentType === "tags" ? (
              <TagInput />
            ) : item.componentType === "Phone" ? (
              <>
                {" "}
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    item.validate?.minLength && {
                      min: +item.validate.minLength,
                      message: `Minimum ${item.validate.minLength} characters required`,
                    },
                    item.validate?.maxLength && {
                      max: +item.validate.maxLength,
                      message: `Maximum ${item.validate.maxLength} characters allowed`,
                    },
                  ]}
                >
                  <label htmlFor="">{item?.label}</label>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    addonBefore={item.addonBefore}
                    addonAfter={item.addonAfter}
                    disabled={item.disabled}
                    placeholder={item.placeholder}
                    className={item.customClass}
                  />
                </Form.Item>
              </>
            ) : item.componentType === "email" ? (
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
                <label htmlFor="">{item?.label}</label>
                <Input
                  disabled={item.disabled}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  type="Email"
                  className={item.customClass}
                  autoComplete="email"
                  placeholder={item.placeholder}
                />
              </Form.Item>
            ) : item.componentType === "url" ? (
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
                <label htmlFor="">{item?.label}</label>

                <Input
                  disabled={item.disabled}
                  type="Url"
                  prefix={item.prefix}
                  suffix={item.suffix}
                  className={item.customClass}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            ) : item.componentType === "Date/Time" ? (
              <Form.Item
                name="datetime"
                rules={[
                  {
                    required: true,
                    message: "Please select date and time!",
                  },
                ]}
              >
                <label htmlFor="">{item?.label}</label>

                <DatePicker
                  format={item.format}
                  className={item.customClass}
                  disabled={item.disabled}
                  showTime
                  placeholder={item.placeholder}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            ) : item.componentType === "Password" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <Input
                  disabled={item.disabled}
                  type="Password"
                  prefix={item.prefix}
                  suffix={item.suffix}
                  className={item.customClass}
                  placeholder={item.placeholder}
                />
              </>
            ) : item.componentType === "upload" ? (
              <FileUplaod />
            ) : item.componentType === "Container" ? (
              <>
                <label htmlFor="">{item?.label}</label>
                <Container id={item?.apiKey} />
              </>
            ) : item.componentType === "signature" ? (
              <div style={{ backgroundColor: item.signature.bgColor }}>
                <img src={item.signature.imgURL} alt="signature" />
                <div>{item.signature.footerLabel}</div>
              </div>
            ) : item.componentType === "Select Box" ? (
              <div>
                <Checkbox className={item.customClass}></Checkbox>
              </div>
            ) : item.componentType === "Day" ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {item.fieldDay === "number" ? (
                  <Input type="number" placeholder={item.fieldDayPlaceholder} />
                ) : (
                  <Select
                    options={months}
                    placeholder={item.fieldDayPlaceholder}
                    style={{ width: "100%" }}
                  />
                )}
                {item.fieldMonth === "number" ? (
                  <Input
                    type="number"
                    placeholder={item.fieldMonthPlaceholder}
                  />
                ) : (
                  <Select
                    options={Array.from({ length: 31 }, (_, i) => ({
                      value: i + 1,
                      label: `${i + 1}`,
                    }))}
                    style={{ width: "100%" }}
                    placeholder={item.fieldMonthPlaceholder}
                  />
                )}
                {item.fieldYear === "number" ? (
                  <Input
                    type="number"
                    placeholder={item.fieldYearPlaceholder}
                  />
                ) : (
                  <Select
                    style={{ width: "100%" }}
                    placeholder={item.fieldYearPlaceholder}
                    options={Array.from({ length: 41 }, (_, i) => ({
                      value: 1990 + i,
                      label: `${1990 + i}`,
                    }))}
                  />
                )}
              </div>
            ) : (
              <>
                <label htmlFor="">{item?.label}</label>
                <TextArea value={item.placeholder} disabled={item.disabled} />
              </>
            )}
          </div>
        ))}
        {/* <Button type="primary" style={{width:'10%'}}>Submit</Button> */}
        <HFBModal
          addField={addField}
          Open={open}
          componentType={itemType}
          formFields={Components}
          setOpen={setOpen}
          setFormFields={setComponents}
        />
      </div>
    </>
  );
};

export default DropZone;
