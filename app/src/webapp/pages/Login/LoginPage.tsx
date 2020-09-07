import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box, makeStyles } from '@material-ui/core';

import LoginSignup from 'webapp/components/LoginSignup/LoginSignup';
import { LoginFormData } from 'types/login';
import api from 'webapp/utils/api';
import logo from 'assets/images/logo.svg';
import { setCredentials } from 'webapp/utils/auth';

const useStyles = makeStyles({
  logoContainer: {
    background: `url(${logo})`,
    height: '10em',
    width: '10em',
  },
});

const LoginPage = () => {
  const history = useHistory();
  const styles = useStyles();

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
    <Container maxWidth={false}>
      <Box>
        <div className={styles.logoContainer} />
      </Box>
      <LoginSignup
        onLogin={handleLogin}
        onForgetPasswordClick={handleForgetPassword}
        onSignup={handleSignup}
      />
    </Container>
  );
};

export default LoginPage;
