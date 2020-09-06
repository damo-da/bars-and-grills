import React from 'react';
import {
  Paper, withStyles, Grid, TextField, Button, Container, Box,
} from '@material-ui/core';

const styles = (theme: any) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  container: {
  },
});

type LoginSignupProps = {
  classes: any,
  userLogin: ({ username, password} : {username: string, password: string }) => null,
}

const LoginComponent = ({
                       classes, userLogin
                     }: LoginSignupProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    userLogin({ username, password });
  }
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
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: 'none' }}
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </Grid>
          </div>
        </Paper>
      </Container>
    </Box>
  );
};

export default withStyles(styles)(LoginComponent);
