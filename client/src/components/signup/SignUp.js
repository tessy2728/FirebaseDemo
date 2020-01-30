import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpView from "../widgets/SignUpView";
import history from '../../history';
import * as ROUTES from '../../constants/routes';
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
import SignInView from "../signin/SignInView";
import styles from '../signin/SignInStyles';
import SignUpLink from '../widgets/SignUpLink'
import { Route } from 'react-router-dom';
import { compose } from 'redux'
import { FirebaseContext, withFirebase } from '../firebase';

class SignUpPage extends Component {
  state = {
    action: 'login',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password, confirmPassword, fullName } = event.target.elements;
    try {
      const user = this.props.firebase
        .doCreateUserWithEmailAndPassword(email.value, password.value, fullName.value)
        .then(authUser => {
          this.setState({ error: null,  username: authUser.user.email});
          history.push(ROUTES.HOME + '/' + this.state.username);
        })
        .catch(error => {
          this.setState({ error });
        });;
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {
      email,
      password, 
      confirmPassword,
      fullName
  } = this.state;
  const { classes } = this.props;
    return (<div>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
      <form onSubmit={this.handleSignUp}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Full Name</InputLabel>
            <Input id="fullName" name="fullName" autoComplete="fullName" value={fullName} onChange={this.onChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={email} onChange={this.onChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" value={password} onChange={this.onChange} autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input name="confirmPassword" type="password" id="confirmPassword" value={confirmPassword} onChange={this.onChange} autoComplete="confirm-password" />
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
    </div>);
  }
}

export default withStyles(styles)(withFirebase(SignUpPage));