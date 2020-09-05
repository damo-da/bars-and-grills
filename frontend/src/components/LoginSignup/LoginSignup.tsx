import React from 'react';
import {
  Paper, withStyles, Grid, TextField, Button, Container, Box,
} from '@material-ui/core';
import barBg from 'assets/images/bar-bg.png';
import { LoginFormData } from 'types/login';

const styles = (theme: any) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  container: {
    background: `url(${barBg})`,
  }
});

type LoginCallback = (params: LoginFormData) => void;

type LoginSignupProps = {
  classes: any,
  onForgetPasswordClick?: () => void,
  onLogin: LoginCallback,
  onSignup: LoginCallback,
}

const LoginSignup = ({
  classes,
  onForgetPasswordClick,
  onLogin,
  onSignup,
}: LoginSignupProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Box width="100vw" height="100vh">
      <Container className={classes.container}>
        <Paper className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item md sm xs>
                <TextField
                  label="Username"
                  type="text"
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
                  disableFocusRipple
                  disableRipple
                  style={{ textTransform: 'none' }}
                  variant="text"
                  color="primary"
                  onClick={onForgetPasswordClick}
                >
                  Forgot password ?
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: 'none' }}
                onClick={() => onLogin({ username, password })}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ textTransform: 'none' }}
                onClick={() => onSignup({ username, password })}
              >
                Sign Up
              </Button>
            </Grid>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}

LoginSignup.defaultProps = {
  onForgetPasswordClick: () => null,
};

export default withStyles(styles)(LoginSignup);
