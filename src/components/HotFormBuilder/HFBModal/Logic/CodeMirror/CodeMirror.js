// CodeMirror6EditorComponent.js
import React, { useState,useEffect } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeMirror6EditorComponent = ({setJsCode}) => {
  const [value, setValue] = useState('// Type your code here');
  // useEffect(() => {
  //   console.log('valuueess-->',value)
  //  setJsCode(value)
  // }, [value])
  
  const { setContainer } = useCodeMirror({
    value: value,
    extensions: [javascript(), oneDark],
    onChange: (value) => {
      setValue(value);
    },
  });

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px' }} ref={setContainer}></div>
  );
};

export default CodeMirror6EditorComponent;
