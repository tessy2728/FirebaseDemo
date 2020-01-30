import React, { Component } from "react";
import { withRouter } from "react-router";
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
import SignUpView from "../widgets/SignUpView";
import history from '../../history';
import styles from './SignInStyles';
import * as ROUTES from '../../constants/routes';
import SignUpLink from '../widgets/SignUpLink'
import SignInGoogle from './SignInGoogleBase'
import { Route } from 'react-router-dom';
import SignUpPage from '../signup/SignUp'
import { compose } from 'redux'
import { FirebaseContext, withFirebase } from '../firebase';
class SignInPage extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null,action: 'login',
      email: '',
      password: '',
      confirmPassword: '' };
    }
    
    handleSignIn = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        const user = this.props.firebase
            .doSignInWithEmailAndPassword(email.value, password.value)
            .then(authUser => {
                this.setState({ error: null,  username: authUser.user.email});
                this.setState(prevState => ({ isLoggedIn: true }));
                history.push(ROUTES.HOME + '/' + this.state.username);
              })
              .catch(error => {
                this.setState({ error });
              });
        } catch (error) {
        alert(error);
        }
    };
    setAction = (selectedAction) => {
        this.setState({action : selectedAction})
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password, confirmPassword } = event.target.elements;
        try {
          const user = this.props.firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(authUser => {
                this.setState({ error: null,  username: authUser.user.email, isLoggedIn: true});
                history.push(ROUTES.HOME + '/' + this.state.username);
              })
              .catch(error => {
                this.setState({ error });
              });
        } catch (error) {
          alert(error);
        }
      };

    render() {
        const {action} =  this.state;
        const { classes } = this.props;
        const {
            email,
            password, 
            confirmPassword
        } = this.state;

        let pageContent;
        if (action === 'login') {
            pageContent = (<main className={classes.main}>
                <img src={reactFirebaseImg} className={classes.left_banner} alt="reactFirebaseImg" />
                <CssBaseline />
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form className={classes.form} onSubmit={this.handleSignIn}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input id="email" name="email" autoComplete="email" value={email} onChange={this.onChange} autoFocus/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input name="password" type="password" id="password" value={password} onChange={this.onChange} autoComplete="current-password"/>
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
            //   <SignInView state={this.state} onSubmit={this.handleSignIn}/>
              )
        } else {
            pageContent = (<div>
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign Up
                  </Typography>
                <form onSubmit={this.handleSignUp}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input id="email" name="email" autoComplete="email" value={email} onChange={this.onChange} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input name="password" type="password" id="password" value={password} onChange={this.onChange} autoComplete="current-password" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="confirm-password">Password</InputLabel>
                      <Input name="confirm-password" type="password" id="confirm-password" value={confirmPassword} onChange={this.onChange} autoComplete="confirm-password" />
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
              //<SignUpView state={this.state} onSubmit={this.handleSignUp} />
            )
        }
        return pageContent;
    }
}
SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withFirebase(SignInPage));

const SignInGoogleBase = compose(
    withRouter,
    withFirebase,
)(SignInGoogle);

const SignInGoogleIcon = withFirebase(SignInGoogleBase);


export { SignInGoogleIcon };