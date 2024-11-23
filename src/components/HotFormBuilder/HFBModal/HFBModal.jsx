import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Tabs, message  } from "antd";
import componentsVal from "../../../Jsons/displayObj.json";
import Display from "./Display/Display";
import Preview from "./Preview/Preview";
import DataComp from "./Data/DataComp";
import Validation from "./Validation/Validation";
import APIComp from "./API/APIComp";
import Logic from "./Logic/Logic";
import { useStructure } from "../../../utils/useComponentStructure";

const HFBModal = ({
  Open,
  setOpen,
  componentType,
  addField,
  formFields,
  setFormFields,
}) => {
  const [values, setValues] = useState(componentsVal?.Basic?.[componentType]);
  const { updateFormData } = useStructure();

  useEffect(() => {
    setValues(componentsVal?.Basic?.[componentType]);
  }, [componentType]);


  const handleSave = () => {
    if (!values.display?.label && !values.display?.apiKey) {
      message.error('Please add label and API key');
    } else if (!values.display?.label) {
      message.error('Please add label');
    } else if (!values.display?.apiKey) {
      message.error('Please add API key');
    } else {
      updateFormData(values.display?.apiKey, '')
      addField(values, componentType);
      setOpen(false);
      setValues({});
      message.success('Field saved successfully!'); // Success notification
    }
  };
  

  const handleCancel = () => {
    setOpen(false);
    setValues({});  
  };

  return (
    <Modal
      title={`${componentType} component`}
      visible={Open}
      onOk={handleSave}
      okText="Save"
      onCancel={handleCancel}
      className="builder-modal"
    >
      {values !== undefined ? (
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ borderRight: "1px solid gray", paddingRight: "20px" }}>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane key="1" tab="DISPLAY">
                  <Display componentType={componentType} setDisplayObj={setValues} values={values} />
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="DATA">
                  <DataComp componentType={componentType} setDataObj={setValues} />
                </Tabs.TabPane>
                <Tabs.TabPane key="3" tab="VALIDATION">
                  <Validation componentType={componentType} setValidationObj={setValues} />
                </Tabs.TabPane>
                <Tabs.TabPane key="4" tab="API">
                  <APIComp componentType={componentType} setDataObj={setValues} values={values} />
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
            <Preview values={values} componentType={componentType} setDisplayObj={setValues} />
          </Col>
        </Row>
      ) : (
        <div>Development is In Progress</div>
      )}
    </Modal>
  );
};

export default HFBModal;
