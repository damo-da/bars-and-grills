import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Box, makeStyles, Typography, Grid,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import LoginSignup from 'webapp/components/LoginSignup/LoginSignup';
import { LoginFormData } from 'types/login';
import api from 'webapp/utils/api';
import logo from 'assets/images/logo.svg';
import { setCredentials } from 'webapp/utils/auth';
import barBg from 'assets/images/bar-bg.png';
import {decodeJwt} from "../../../utils/jwt";

const useStyles = makeStyles((theme: any) => ({
  logoContainer: {
    height: '10em',
    width: '10em',
    margin: 'auto',
  },
  innerContainer: {
    margin: 'auto',
    paddingTop: 20,
  },
  logo: {
    background: `url(${logo})`,
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    background: `url(${barBg})`,
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
}));

const LoginPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();

  const handleLogin = async ({ username, password }: LoginFormData) => {
    try {
      const { data: { token } } = await api.post('/login', { username, password });

      const payload = decodeJwt(token);
      setCredentials(payload);

      enqueueSnackbar(`Welcome, ${payload.username}!`);

      history.replace('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      enqueueSnackbar('Logging in failed', { variant: 'error' });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleSignup = async ({ username, password }: LoginFormData) => {
    try {
      await api.post('/signup', { username, password });

      handleLogin({ username, password });
    } catch (e) {
      enqueueSnackbar('Signup failed. Please try again.', { variant: 'error' });
    }
  };

  const handleForgetPassword = async () => {
    enqueueSnackbar('Please contact administrator to reset your password.');
  };

  return (
    <Container maxWidth={false} className={styles.container}>
      <Grid xs={8} sm={5} md={3} alignContent="center" alignItems="center" className={styles.innerContainer}>
        <Box className={styles.logoContainer}>
          <div className={styles.logo} />
        </Box>
        <Typography
          variant="h3"
          component="h3"
          className={styles.title}
          gutterBottom
        >
          Bars & Grills
        </Typography>
        <LoginSignup
          onLogin={handleLogin}
          onForgetPasswordClick={handleForgetPassword}
          onSignup={handleSignup}
        />
      </Grid>
    </Container>
  );
};

export default LoginPage;
