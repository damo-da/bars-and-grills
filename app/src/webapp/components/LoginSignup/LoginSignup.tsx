import React from 'react';
import {
  Paper, makeStyles, Grid, TextField, Button,
} from '@material-ui/core';
import type { LoginSignupProps } from 'types/login';

const useStyles = makeStyles((theme: any) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));

const LoginSignupComponent = ({
  onForgetPasswordClick,
  onLogin,
  onSignup,
}: LoginSignupProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const classes = useStyles();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogin) onLogin({ username, password });
  };

  const handleSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSignup) onSignup({ username, password });
  };

  const handleForgetPassword = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onForgetPasswordClick) onForgetPasswordClick();
  };

  return (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md sm xs>
            <TextField
              label="Username"
              type="text"
              inputProps={{ 'aria-label': 'username_input' }}
              fullWidth
              autoFocus
              required
              defaultValue={username}
              onKeyUp={(e: any) => setUsername(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md sm xs>
            <TextField
              label="Password"
              type="password"
              inputProps={{ 'aria-label': 'password_input' }}
              fullWidth
              required
              defaultValue={password}
              onKeyUp={(e: any) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Button
              variant="text"
              color="primary"
              aria-label="on_forget_button"
              disableFocusRipple
              disableRipple
              style={{ textTransform: 'none' }}
              onClick={handleForgetPassword}
            >
              Forgot password ?
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            variant="outlined"
            color="primary"
            aria-label="login_button"
            style={{ textTransform: 'none', marginRight: '1rem' }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            aria-label="signup_button"
            style={{ textTransform: 'none' }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};

export default LoginSignupComponent;
