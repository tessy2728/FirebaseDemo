import React, { Component } from 'react';
import '../../App.css';
import firebaseInfo1 from '../../images/firebase-info-1.jpg';
import firebaseInfo2 from '../../images/firebase-info-2.jpg';
import firebaseInfo3 from '../../images/firebase-info-3.jpg';
import firebaseInfo4 from '../../images/firebase-info-4.jpg';
import firebaseInfo5 from '../../images/firebase-info-5.jpg';

class realtimeDBDoc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
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
        </div>
    );
  }
}

export default realtimeDBDoc;