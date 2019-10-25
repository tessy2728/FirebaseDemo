import app from 'firebase/app';

import 'firebase/auth';

  const config = {
    apiKey: "AIzaSyDd-y3Dpu7uA8hTgSBiBJU635TzFMcq6Nc",
    authDomain: "elysiumdreamz-8a6be.firebaseapp.com",
    databaseURL: "https://elysiumdreamz-8a6be.firebaseio.com",
    projectId: "elysiumdreamz-8a6be",
    storageBucket: "elysiumdreamz-8a6be.appspot.com",
    messagingSenderId: "463185100767"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();

      this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  }
  
  export { Firebase as default };