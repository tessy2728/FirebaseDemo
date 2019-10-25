import React, { Component } from 'react';
import googleLogin from '../../images/google-sigin.png';
import * as ROUTES from '../../constants/routes';
import history from '../../history';

export default class SignInGoogleBase extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
      this.props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
          this.setState({ error: null,  username: socialAuthUser.user.displayName, isLoggedIn: true});
          console.log(this.state, this.props)
          this.props.mergeState(this.state)
          history.push(ROUTES.HOME + '/' + this.state.username);
        })
        .catch(error => {
          console.log(error.message)
          this.setState({ error });
        });
    }
  
    render() {
      //const { error } = this.state;
      return (
        <div>
          <a onClick={this.handleClick}><img src={googleLogin} className="icon-circle" alt="logo" /></a></div>
      );
    }
  }
