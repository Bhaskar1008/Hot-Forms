import React from 'react';
import { Flex, Input, Typography } from 'antd';
const { Title } = Typography;
const OTPComponent = ({OTPLength}) => {
  const onChange = (text) => {
    console.log('onChange:', text);
  };
  const sharedProps = {
    onChange,
  };
  return (
    <Flex gap="middle" align="flex-start" vertical>
      <Input.OTP  length={OTPLength ? +OTPLength : 2 } {...sharedProps} variant='outlined' size='large'/>
    </Flex>
  );
};
export default OTPComponent;
