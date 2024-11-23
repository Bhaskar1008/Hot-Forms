import React, { useState, useEffect } from "react";
import "./Logic.css";
import { Select, Input, Button } from "antd";
import { v4 as uuid } from "uuid";
// import CodeMirror6EditorComponent from "./CodeMirror/CodeMirror";
import { v4 as uuidv4 } from "uuid";
import componentsVal from "../../../../Jsons/displayObj.json";
// import React, { useState,useEffect } from 'react';
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";

const Logic = ({
  componentType,
  setLogicObj,
  logicObj,
  formFields,
  setFormFields,
}) => {
  const [AddLogic, setAddLogic] = useState([]);
  const [Trigger, setTrigger] = useState("");
  const [Actions, setActions] = useState(0);
  const [ACtionTrigger, setActionTrigger] = useState("");
  const [values, setValues] = useState(componentsVal?.Basic?.["Text Field"]);
  const [JsCode, setJsCode] = useState("");
  const [saveAction, setsaveAction] = useState(false);
  const [LastItem, setLastItem] = useState({
    LogicName: "",
    TriggerType: "",
    SimpleShow: "",
    SimpleWhen: "",
    SimpleHas: "",
    ActionName: "",
    ActionType: "",
    ActionCustom: "",
  });
  const [Logic, setLogic] = useState([]);

  const CodeMirror6EditorComponent = () => {
    const [value, setValue] = useState("// Type your code here");
    // console.log("logicobj--->", logicObj.logic.actionCustom);

    // const { setContainer } = useCodeMirror({
    //   value: value,
    //   extensions: [javascript(), oneDark],
    //   onChange: (value) => {
    //     setValue(value);
    //   },
    // });

    return (
      <textarea
        value={logicObj.logic.ActionCustom}
        onChange={(e) => {
          setLastItem({...LastItem,ActionCustom:e.target.value});
          setLogicObj((prevValues) => ({
            ...prevValues,
            logic: {
              ...prevValues.logic,
              ActionCustom: e.target.value,
            },
          }));
        }}
        placeholder="Enter JavaScript code to execute"
        style={{ width: "100%", minHeight: "20px" }}
      />
    );
  };

  const handleSelect = (e, setTrigger, label, fieldName) => {
    // if(label!=="trigger"){
    setTrigger(e);
    // }
    setLastItem({...LastItem,[fieldName]:e});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.trigger,
        [fieldName]: e,
      },
    }));
  };
  const renderSelect = (items, setTrigger, label, fieldName) => {
    console.log("formlogic", formFields);
    return (
      <Select
        style={{ width: "100%" }}
        options={items}
        onChange={(val) => handleSelect(val, setTrigger, label, fieldName)}
      />
    );
  };
  const handleInputChange = (e, fieldName, setValues) => {
    setLastItem({...LastItem,LogicName:e});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        LogicName: e,
      },
    }));
    console.log("values-->", values);
  };
  const renderInput = (fieldName, label) => {
    return (
      <Input
        onChange={(e) => handleInputChange(e.target.value, label, setValues)}
      />
    );
  };

  const items = [
    { value: "simple", label: "Simple" },
    { value: "javascript", label: "Javascript" },
    { value: "event", label: "Event" },
  ];
  const actions_items = [
    { value: "property", label: "Property" },
    { value: "value", label: "Value" },
    { value: "customaction", label: "Custom Action" },
  ];
  const Action_Properties = [
    { value: "hidden", label: "Hidden" },
    { value: "required", label: "Required" },
    { value: "disabled", label: "Disabled" },
    { value: "label", label: "Label" },
    { value: "prefix", label: "Prefix" },
    { value: "suffix", label: "Suffix" },
    { value: "title", label: "Title" },
    { value: "tooltip", label: "Tooltip" },
    { value: "description", label: "Description" },
    { value: "placeholder", label: "Placeholder" },
    { value: "cssclass", label: "CSS Class" },
    { value: "containercustomclass", label: "Container Custom Class" },
  ];

  const handleClick = () => {
    const newUuid = Date.now().toString();
    console.log("id-->", Date.now().toString());
    let obj = {
      id: newUuid,
      logicName: "",
      eventName: "",
      action: [],
    };
    setAddLogic([...AddLogic, obj]);
  };
  const addAction = (id) => {
    console.log("action id---->", id);
    const uuid = Date.now().toString();
    const logic = AddLogic.find((item) => item.id == id);
    // setAddLogic(prevData => ({
    //   ...prevData,
    //   action: [...obj.action, id],
    // }));
  };
  const handleSaveLogic = () => {
    const key=LastItem.SimpleWhen;
   const updatedItems=formFields.map((item)=>{
    return item.key==key?{...item,logic:LastItem}:item
    })
    setFormFields(updatedItems);
  };
  const deleteItem = (id) => {
    console.log("delete id----->", id);
    const newItems = AddLogic.filter((item) => item.id !== id);
    setAddLogic(newItems);
  };
  // useEffect(() => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     logic: {
  //       ...prevValues.logic,
  //       actionCustom: JsCode,
  //     },
  //   }));
  // }, [JsCode]);
  const handleWhen = (val) => {
    setLastItem({...LastItem,SimpleWhen:val});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        SimpleWhen: val,
      },
    }));
  };
  const handleHasValue = (val) => {
    setLastItem({...LastItem,SimpleHas:val});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        SimpleHas: val,
      },
    }));
  };
  const handleEventValue = (val) => {
    setLastItem({...LastItem,SimpleHas:val});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        EventName: val,
      },
    }));
  };
  const handleActionType = (e) => {
    setLastItem({...LastItem,ActionType:e});
    setActionTrigger(e);
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        ActionType: e,
      },
    }));
  };
  const handleLogicName = (e) => {
    // setActionTrigger(e);
    setLastItem({...LastItem,LogicName:e});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        LogicName: e,
      },
    }));
  };
  const handleActionName = (e) => {
    setLastItem({...LastItem,ActionName:e});
    setLogicObj((prevValues) => ({
      ...prevValues,
      logic: {
        ...prevValues.logic,
        ActionName: e,
      },
    }));
  };
  return (
    <div>
      <div>Advanced Logic</div>
      {AddLogic.map((item) => (
        <div className="parent-div" key={item.id}>
          <div className="parent-header">0 advanced logic configured</div>
          <div className="parent-logic">
            <div>Logic Name</div>
            <Input onChange={(e) => handleLogicName(e.target.value)} />
            <div className="trigger">
              <div className="parent-header">Trigger</div>
              <div className="trigger-child">
                {renderSelect(items, setTrigger, "trigger", "type")}
                {Trigger == "javascript" ? (
                  <div className="javascript">
                    <CodeMirror6EditorComponent setJsCode={setJsCode} />
                  </div>
                ) : Trigger == "simple" ? (
                  <div>
                    {/* <div>Type</div>
                    {renderSelect(items)} */}
                    <div>when the form component:</div>
                    {/* {renderSelect(items,)} */}
                    <Select
                      style={{ width: "100%" }}
                      options={formFields.map((item) => {
                        return {
                          label: item.key,
                          value: item.key,
                        };
                      })}
                      onChange={(val) => handleWhen(val)}
                    />
                    <div>Has the Value:</div>
                    <Input onChange={(e) => handleHasValue(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <div>Event Name</div>
                    <Input onChange={(e) => handleEventValue(e.target.value)}/>
                  </>
                )}
              </div>
            </div>
            <div>
              <div>Actions</div>
              {/* {item.action.map((item)=> */}
              {!saveAction ? (
                <div className="parent-action">
                  <div className="num-actions">{Actions} actions</div>
                  <div className="action-hier">
                    <div className="parent-header">Action</div>
                    <div>
                      Action Name<span style={{ color: "red" }}>*</span>
                    </div>
                    <Input
                      onChange={(e) => {
                        handleActionName(e.target.value);
                      }}
                    />
                    <div>Type</div>
                    <Select
                      style={{ width: "100%" }}
                      options={actions_items}
                      onChange={(e) => {
                        handleActionType(e);
                      }}
                    />
                    {ACtionTrigger == "property" && (
                      <>
                        <div style={{ marginTop: "3px" }}></div>
                        {renderSelect(Action_Properties, setTrigger)}
                      </>
                    )}
                    {ACtionTrigger == "value" && (
                      <>
                        <div>Value (Javascript)</div>
                        <CodeMirror6EditorComponent setJsCode={setJsCode} />
                      </>
                    )}
                    {ACtionTrigger == "customaction" && (
                      <>
                        <div>Custom Action (Javascript)</div>
                        <CodeMirror6EditorComponent setJsCode={setJsCode} />
                      </>
                    )}
                    <div className="action-btn">
                      <Button
                        type="primary"
                        onClick={() => setsaveAction(true)}
                      >
                        Save Action
                      </Button>
                      <Button type="danger" style={{ marginLeft: "2px" }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="parent-action"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{values.logic.actionsName}</div>
                  <div>
                    <Button theme="danger">Delete</Button>
                  </div>
                </div>
              )}
              {/* // )} */}
              <Button type="primary" onClick={() => addAction(item.id)}>
                +Add Action
              </Button>
              <div style={{ marginTop: "2px" }}>
                <Button type="primary" onClick={handleSaveLogic}>
                  Save Logic
                </Button>
                <Button
                  type="danger"
                  style={{ marginLeft: "2px" }}
                  onClick={() => deleteItem(item.id)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div>
        <Button type="primary" onClick={handleClick}>
          +Add Logic
        </Button>
      </div>
    </div>
  );
};

export default Logic;
