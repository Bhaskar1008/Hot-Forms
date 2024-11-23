import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "./APIComp.css";

const APIComp = ({ values, componentType, setDisplayObj }) => {
  const [PropValue, setPropValue] = useState("");

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    if (values?.display?.label) {
      setPropValue(toCamelCase(values.display.label));
    } else {
      setPropValue(`${toCamelCase(componentType)}${randomNum}`);
    }
  }, [componentType, values?.display?.label]);

  const handleChange = (e) => {
    const val = e.target.value;
    setPropValue(val);
    if (typeof setDisplayObj === "function") {
      setDisplayObj((prevValues) => ({
        ...prevValues,
        api: {
          ...prevValues.api,
          apiKey: val,
        },
      }));
    }
  };

  return (
    <div className="main-div">
      <div>
        <div className="property">Property Name</div>
        <Input value={PropValue} onChange={handleChange} />
      </div>
    </div>
  );
};

export default APIComp;
