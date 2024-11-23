import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptchaComponent = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const onChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey='6LeQ25UoAAAAAFogLCdHSWpg02e4vWZTuqYFiiSY'
        onChange={onChange}
      />
      {captchaValue && <p>Captcha value is {captchaValue}</p>}
    </div>
  );
};

export default ReCaptchaComponent;
