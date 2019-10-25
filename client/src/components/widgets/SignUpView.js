import React from "react";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../signin/SignInStyles';


const SignUpView = (props, { onSubmit }) => {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
      <form onSubmit={onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirm-password">Password</InputLabel>
            <Input name="confirm-password" type="password" id="confirm-password" autoComplete="confirm-password" />
          </FormControl>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
      </form>
      </Paper>
    </div>
  );
};

SignUpView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpView);
