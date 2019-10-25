import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import facebookLogin from '../../images/facebook_sigin.png';
import firebaseImg from '../../images/Firebase.jpeg';
import reactFirebaseImg from '../../images/react-firebase.png'
import SignUpLink from '../widgets/SignUpLink'
import SignInGoogle from './SignInGoogleBase'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { FirebaseContext, withFirebase } from '../firebase';
import styles from './SignInStyles';
import { Route } from 'react-router-dom';
import SignUpPage from '../signup/SignUp'
import * as ROUTES from '../../constants/routes';

function SignIn(props) {
  const { classes } = props;
  const {
    email,
    password
} = props;

  return (
    <main className={classes.main}>
      <img src={reactFirebaseImg} className={classes.left_banner} alt="reactFirebaseImg" />
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={email} autoFocus/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" value={password} autoComplete="current-password"/>
          </FormControl>
          <div className="Signin-icon-bar">
            <img src={facebookLogin} className="icon-circle" alt="logo" />
            <SignInGoogleIcon />
          </div>
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign in
          </Button>
          <SignUpLink/>
        </form>
      </Paper>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const SignInGoogleBase = compose(
  withRouter,
  withFirebase,
)(SignInGoogle);

const SignInGoogleIcon = withFirebase(SignInGoogleBase);

export default withStyles(styles)(SignIn);

export { SignInGoogleIcon };
