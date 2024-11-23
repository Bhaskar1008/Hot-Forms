import React from "react";
import { useStructure } from "../../../utils/useComponentStructure";
import HotForm from "../../HotForm/HotForm";
import ReactJson from "react-json-view";
import { useLocation } from "react-router-dom";
const PreviewHotforms = () => {
  const { structure, addComponentToStructure, formData} = useStructure();
  let { state } = useLocation();

  return (
    <div>
      <h1 style={{textAlign:'center'}}>HotForm Demo</h1>
      <div style={{padding:'20px 100px'}}>
      <HotForm json={structure} />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      {/* <ReactJson src={structure} collapsed enableClipboard theme="monokai" style={{width:'50%', padding: '20px', maxHeight:'50vh', overflowY:'scroll'}}/> */}
      <ReactJson src={formData} name="formData" collapsed enableClipboard theme="monokai" style={{width:'50%', padding: '20px', maxHeight:'50vh', overflowY:'scroll'}}/>
      {console.log('state====', state)
      }

      </div>
      </div>
    </div>
  );
};

export default PreviewHotforms;
