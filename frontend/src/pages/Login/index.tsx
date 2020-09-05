import React from 'react';
import { useHistory } from 'react-router-dom';

import LoginSignup from 'components/LoginSignup/LoginSignup';
import { LoginFormData } from 'types/login';

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = ({ username, password }: LoginFormData) => {
    history.push('/dash');
  };

  const handleSignup = ({ username, password }: LoginFormData) => {
    history.push('/admin');
  };

  const handleForgetPassword = () => {
    alert('Please contact administrator to reset your password.');
  };

  return (
    <>
      <LoginSignup
        onLogin={handleLogin}
        onForgetPasswordClick={handleForgetPassword}
        onSignup={handleSignup}
      />
    </>
  );
};

export default LoginPage;
