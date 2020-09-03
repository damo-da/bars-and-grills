import React from 'react';
import {
  Paper, withStyles, Grid, TextField, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

const LoginComponent = ({
  classes,
  onForgotPasswordClick,
  onSubmit,
}) => (
  <Paper className={classes.padding}>
    <div className={classes.margin}>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item md sm xs>
          <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
        </Grid>
      </Grid>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item md sm xs>
          <TextField id="username" label="Password" type="password" fullWidth required />
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
            onClick={onForgotPasswordClick}
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
          onClick={(e) => onSubmit({ username: null, password: null })}
        >
          Login/Register
        </Button>
      </Grid>
    </div>
  </Paper>
);

LoginComponent.propTypes = {
  onForgotPasswordClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

LoginComponent.defaultProps = {
  onForgotPasswordClick: () => {},
  onSubmit: () => {},
};

export default withStyles(styles)(LoginComponent);
