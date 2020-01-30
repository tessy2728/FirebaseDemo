import React, { Component } from 'react';
import '../../App.css';
import authentication from '../../images/firebase-authentication-settings.png';
import authReact from '../../images/authentication-react.png';
import authAPIs from '../../images/authAPIs.png';
import authAPICall from '../../images/authAPI-calls.png';

class AuthenticationDoc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
        <div className="Site-content">
                <h1>Firebase Authentication:</h1>
                <p>Start <a target="_blank" rel="noopener noreferrer" href="https://console.firebase.google.com">creating a Firebase project</a> if you don’t have one already. </p>
                <h1>Step 1:</h1>
                <p>Go to the Develop >> Authentication page.
                <br></br>
                Click on the “Sign-in method” tab and make sure you have Google-enabled as a sign-in provider. Enable the auth services you want.
                </p>
                <img src={authentication} alt="authentication" />
                <h1>Step 2:</h1>
                <p>Second, we will implement the authentication API for our Firebase class. Import and instantiate the package from Firebase responsible for all the authentication in your <i>src/components/Firebase/firebase.js</i> file:</p>
                <img src={authReact} alt="authReact" />
                <h1>Step 3:</h1>
                <p>Let's define all the authentication functions as class methods.</p>
                <img src={authAPIs} alt="authAPIs" />
                <h1>Step 4:</h1>
                <p>We will pass all the form data to the Firebase authentication API via your authentication interface in the Firebase class:</p>
                <img src={authAPICall} alt="authAPICall" />
        </div>
    );
  }
}

export default AuthenticationDoc;
