import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Tabs, message } from "antd";
import Display from "./Display/Display";
import Preview from "./Preview/Preview";
import DataComp from "./Data/DataComp";
import Validation from "./Validation/Validation";
import APIComp from "./API/APIComp";
import Logic from "./Logic/Logic";
import { useStructure } from "../../../utils/useComponentStructure";

const defaultComponentValues = {
  display: {
    label: "",
    apiKey: "",
    placeholder: "",
    description: "",
    customClass: "",
    prefix: "",
    suffix: "",
    disabled: false,
    hideLabel: false,
    labelPosition: "top",
    theme: "",
    required: false
  },
  data: {
    defaultValue: "",
    multiple: false,
    dataSrc: "values",
    dataSrcValues: [],
    case: "mixed",
  },
  validation: {
    required: false,
    minLength: "",
    maxLength: "",
    pattern: "",
    customMessage: "",
  },
  api: {
    apiKey: "",
  },
  logic: {
    LogicName: "",
    TriggerType: "",
    SimpleShow: "",
    SimpleWhen: "",
    SimpleHas: "",
    ActionName: "",
    ActionType: "",
    ActionCustom: "",
  }
};

const HFBModal = ({
  Open,
  setOpen,
  componentType,
  addField,
  formFields,
  setFormFields,
}) => {
  const [values, setValues] = useState(defaultComponentValues);
  const { updateFormData } = useStructure();

  useEffect(() => {
    setValues(defaultComponentValues);
  }, [componentType]);

  const handleSave = () => {
    if (!values.display?.label) {
      message.error('Please add label');
      return;
    }
    
    if (!values.display?.apiKey && !values.api?.apiKey) {
      message.error('Please add API key');
      return;
    }

    // Use API key from either display or api section
    const apiKey = values.display?.apiKey || values.api?.apiKey;
    
    const finalValues = {
      ...values,
      display: {
        ...values.display,
        apiKey: apiKey
      }
    };

    updateFormData(apiKey, '');
    addField(finalValues, componentType);
    setOpen(false);
    setValues(defaultComponentValues);
    message.success('Field saved successfully!');
  };

  const handleCancel = () => {
    setOpen(false);
    setValues(defaultComponentValues);
  };

  return (
    <Modal
      title={`${componentType} Component Configuration`}
      open={Open}
      onOk={handleSave}
      okText="Save"
      onCancel={handleCancel}
      className="builder-modal"
      width={800}
    >
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ borderRight: "1px solid gray", paddingRight: "20px" }}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane key="1" tab="DISPLAY">
                <Display 
                  componentType={componentType} 
                  setDisplayObj={setValues} 
                  values={values} 
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab="DATA">
                <DataComp 
                  componentType={componentType} 
                  setDataObj={setValues} 
                  values={values}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab="VALIDATION">
                <Validation 
                  componentType={componentType} 
                  setValidationObj={setValues} 
                  values={values}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="4" tab="API">
                <APIComp 
                  componentType={componentType} 
                  setDataObj={setValues} 
                  values={values} 
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="5" tab="LOGIC">
                <Logic
                  componentType={componentType}
                  setLogicObj={setValues}
                  logicObj={values}
                  formFields={formFields}
                  setFormFields={setFormFields}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
        <Col span={12}>
          <Preview 
            values={values} 
            componentType={componentType} 
            setDisplayObj={setValues} 
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default HFBModal;