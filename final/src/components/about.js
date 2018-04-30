import React, { Component } from 'react';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
//
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     return res.redirect(303, snapshot.ref.toString());
//   });
// });

class About extends Component {
  constructor(props){
    super(props);
    this.download = this.download.bind(this);
    this.database = props.data;
  }

  download() {
    this.database.ref().on("value", function(snapshot){
      if(window.export){
        var myWindow = window.open("url", "OurData");
        myWindow.document.write(JSON.stringify(snapshot.val()));
      }
    });

  }

  render() {
  return (
    <div id="about-div">
      <h1> About Us</h1>
      <h3>Welcome to Stock Notebook!</h3>
      <p>This site is designed to help organize your stocks and to explore stocks.</p>
      <p>Here are all our feautures:</p>
      <div className="flex-container">
        <div>Your Stocks</div>
        <div>Trending Stocks</div>
        <div>Explore Stocks</div>
        <div>Predict Stocks</div>
      </div>
      <p>You can download our data <a id="download-btn" onClick={this.download}>here</a>. </p>
    </div>);
  }
}

export default About;
