import React from 'react';
import { useHistory } from 'react-router-dom';

import LoginSignup from 'components/LoginSignup/LoginSignup';
import { LoginFormData } from 'types/login';
import api from 'utils/api';
import { setCredentials } from 'utils/auth';

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = async ({ username, password }: LoginFormData) => {
    try {
      const { data: { token } } = await api.post('/login', { username, password });
      setCredentials({ jwt: token });

      history.replace('/');
    } catch (e) {
      console.error('Logging in failed!.', e);
    }
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
