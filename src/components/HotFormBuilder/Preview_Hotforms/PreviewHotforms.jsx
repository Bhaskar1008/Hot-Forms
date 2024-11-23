import React from "react";
import { useStructure } from "../../../utils/useComponentStructure";
import HotForm from "../../HotForm/HotForm";
import ReactJson from "react-json-view";
import { Card, Typography } from 'antd';

const { Title } = Typography;

const PreviewHotforms = () => {
  const { structure, formData } = useStructure();

  return (
    <div>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        HotForm Preview
      </Title>
      
      <div style={{ padding: '20px 100px' }}>
        <Card>
          <HotForm json={structure} />
        </Card>

        <div style={{ marginTop: '2rem' }}>
          <Title level={3}>Form Data</Title>
          <ReactJson 
            src={formData} 
            name="formData" 
            collapsed={1}
            enableClipboard
            theme="monokai"
            style={{
              padding: '20px',
              borderRadius: '8px',
              maxHeight: '50vh',
              overflowY: 'auto'
            }}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Title level={3}>Form Structure</Title>
          <ReactJson 
            src={structure} 
            name="structure" 
            collapsed={1}
            enableClipboard
            theme="monokai"
            style={{
              padding: '20px',
              borderRadius: '8px',
              maxHeight: '50vh',
              overflowY: 'auto'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewHotforms;