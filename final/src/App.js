import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA7wAvjwERBxkLFy0g02pa188IJ-j15IXk",
      authDomain: "final-3e758.firebaseapp.com",
      databaseURL: "https://final-3e758.firebaseio.com",
      projectId: "final-3e758",
      storageBucket: "",
      messagingSenderId: "601895557355"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (

    );
  }
}

export default App;
