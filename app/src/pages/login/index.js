import React from 'react';
import LoginComponent from '../../components/screens/login/LoginComponent';

const LoginPage = (props) => {
  const handleForgotPassword = () => {
    // eslint-disable-next-line no-alert
    alert('Please contact the administrator to reset password.');
  };

  const handleSubmit = (formData) => {
    console.log('form submitted.', formData);
  };

  return <LoginComponent
      onForgotPasswordClick={handleForgotPassword}
      onSubmit={handleSubmit}
  />;
};

export default LoginPage;
