import React, { Component } from 'react';
import googleLogin from '../../images/google-sigin.png';
import * as ROUTES from '../../constants/routes';
import history from '../../history';
import { AuthContext } from "../../App";

const SignInGoogleBase = (props) => {
const { dispatch } = React.useContext(AuthContext); 

    const handleClick = () => {
      props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
          dispatch({
              type: "LOGIN",
              payload: socialAuthUser,
              accessToken: socialAuthUser.user.refreshToken
          })
          localStorage.setItem('authDetails', JSON.stringify(socialAuthUser));
          history.push(ROUTES.HOME + '/' + socialAuthUser.user.displayName);
        })
        .catch(error => {
          console.log(error.message)
        });
    }
  
    return (
      <div>
        <a onClick={handleClick}><img src={googleLogin} className="icon-circle" alt="logo" /></a></div>
    );
  }

  export default SignInGoogleBase;
