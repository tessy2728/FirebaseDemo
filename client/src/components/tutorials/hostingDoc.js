import React, { Component } from 'react';
import '../../App.css';
import hostingImg from '../../images/hosting.png';

class hostingDoc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
        <div className="Site-content">
                <h1>Firebase Hosting</h1>
                <h2>Step 1: Install the Firebase CLI</h2>
                <p>Using the <a href="https://firebase.google.com/docs/cli">Firebase CLI</a>, you deploy files from local directories on your computer to your Hosting server. </p>
                <h2>Step 2: Initialize your project</h2>
                <h2>Step 3:Step 3: Deploy to your site</h2>
                <img src={hostingImg} alt="hostingImg" />
        </div>
    );
  }
}

export default hostingDoc;