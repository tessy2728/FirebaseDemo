import React, { Component } from 'react';
import './App.css';
import NavBar from './components/appnavbar/NavBar';
import firebaseInfo1 from './images/firebase-info-1.jpg';
import firebaseInfo2 from './images/firebase-info-2.jpg';
import firebaseInfo3 from './images/firebase-info-3.jpg';
import firebaseInfo4 from './images/firebase-info-4.jpg';
import firebaseInfo5 from './images/firebase-info-5.jpg';
import configImg from './images/config.png';
import reactEnv from './images/react-env.png';
import firebaseContextImg from './images/firebase-context.png';
import firebaseProviderImg from './images/firebase-provider.png';
import Home from './components/home/Home';
import AuthenticationDoc from './components/tutorials/authenticationDoc';
import ReattimeDBDoc from './components/tutorials/reattimeDBDoc';
import { Router,  Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

export const AuthContext = React.createContext();

const isValid = () => {
  let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  return user ? user.stsTokenManager.expirationTime > new Date().getTime() : false;
}

const initialState = {
  isAuthenticated: isValid(),
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log(action)
      localStorage.setItem("token", JSON.stringify(action.accessToken));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        // token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <AuthContext.Provider  value={{
        state,
        dispatch
      }}>
        <div className="App Site">
        <NavBar isLoggedIn={state.isAuthenticated}/>
        
        <div className="Site-content">
                <h1>Step 1:</h1>
                <p>Let’s start by <a target="_blank" rel="noopener noreferrer" href="https://console.firebase.google.com">creating a Firebase application with your Google Account</a>. Therefore, hit the “Add Project” button to create a new Firebase project:</p>
                <img src={firebaseInfo1} alt="firebaseInfo1" />
                <h1>Step 2:</h1>
                <img src={firebaseInfo2} alt="firebaseInfo2" />
                <h1>Step 3:</h1>
                <img src={firebaseInfo3} alt="firebaseInfo3" />
                <h1>Step 4:</h1>
                <img src={firebaseInfo4} alt="firebaseInfo4" />
                <h1>Step 5:</h1>
                <img src={firebaseInfo5} alt="firebaseInfo5" />
                <h1>Step 6:</h1>
                <p>You can define the environmental variables in a new .env file in your project's root folder. The .env file can also be added to your .gitginore file (in case you are using git), so your Firebase credentials are not exposed publicly on a platform like GitHub.</p>
                <img src={reactEnv} alt="reactEnv" />
                <p>Next, we'll create a new file <i>src/components/firebase/firebase.js</i> for the Firebase setup. </p>
                <img src={configImg} alt="configImg" />
                <h1>Step 7:</h1>
                <p>Next, we will connect the firebase with React application. Use <a href="https://www.robinwieruch.de/react-context-api/">React’s Context API</a> to provide a Firebase instance once at the top-level of your component hierarchy. Create a new <i>src/components/firebase/context.js</i> file in your Firebase module and provide the following implementation details:</p>
                <img src={firebaseContextImg} alt="firebaseContextImg" />
                <h1>Step 8:</h1>
                <p>The Firebase Context from the Firebase module (folder) is used to provide a Firebase instance to your entire application in the src/index.js file. You only need to create the Firebase instance with the Firebase class and pass it as value prop to the React's Context:</p>
                <img src={firebaseProviderImg} alt="firebaseProviderImg" />
        </div>
      </div>
      </AuthContext.Provider>
      
    );
}

export default App;
