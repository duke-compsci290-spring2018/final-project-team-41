import React, { Component } from 'react';
import firebase from 'firebase';
import stock from 'stocks.js';
import './App.css';
import Graph from './components/Graph.js'


const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

console.log('hi');
alpha.data.daily(`msft`).then(data => {
   var temp = data['Time Series (Daily)'];
	for (var k in temp){
		//console.log(temp[k]);
		console.log(temp[k]['1. open']);
	}
});

class App extends Component {
  constructor(props) {
    super(props);
	this.state = {points:window.dp}
	
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
	<div>
<Graph points ={this.state['points']}/>
</div>
    );
  }
}
window.dp=[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ];



export default App;
