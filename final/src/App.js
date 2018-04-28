import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';
import Graph from './components/Graph.js'


const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
window.graphdata = [];
window.test = [];
alpha.data.daily('MSFT').then(data => {
			var temp = data['Time Series (Daily)'];
			for (var k in temp){
		
			window.test.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
			}
			});
var users = firebase.database().ref('users');

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
	if(!firebase.apps.length){
    firebase.initializeApp(config);
	}
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
	this.addStock = this.addStock.bind(this);
    this.state = {
		points:window.dp,
      currentItem: '',
      username: '',
      items: [],
      user: null,
	  stocks: ['MSFT','AMZN'],
	  graphData: []
    }
	this.graphs = [];
	this.tempdp = [];
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
        var existed = false;
        var newUser = this.state.user;
		var oldUser = "";
        users.once("value",(snapshot)=>{
          snapshot.forEach((itemSnapshot)=> {
            if(itemSnapshot.child('email').val() == newUser.email){
              existed = true;
			  oldUser = itemSnapshot['key'];
			  console.log(oldUser);
            }

          });
          if(!existed) {
            firebase.database().ref('users').push({
              name: newUser.displayName,
              email: newUser.email,
              stocks: ['FB']
            });
			this.setState(prevState => ({
				stocks: [...prevState.stocks, 'FB']
			}));
          }else{
			var newStocks = [];
			var st = firebase.database().ref('users/'+oldUser+"/stocks");
			st.on("value", function(snapshot) {
				snapshot.forEach((itemSnapshot)=> {
					newStocks.push(itemSnapshot.val());
				});
			});
			this.setState(prevState => ({
				stocks: [...prevState, newStocks]
			}));
            console.log('Log in successful');
			console.log(this.state.stocks);
          }
        });
    });
	
  }
  renderGraphs(){
	  return this.state.stocks.map((stock,i)=>{
		  
		  var tempdp=[
			  { x: 1, y: 2 },
			  { x: 2, y: 3 },
			  { x: 3, y: 5 },
			  { x: 4, y: 4 },
			  { x: 5, y: 7 }
			];
		   
			//console.log(temparr);
		   
			
	  //console.log(this.state.graphData);
	  console.log(this.state.graphData);
	  console.log(this.state.graphData[i]);
	  return <Graph key = {stock} points = {this.state.graphData[i]}/>;
	  });
  }
  componentDidMount() {
	   return this.state.stocks.map((stock,i)=>{
	 alpha.data.daily(stock).then(data => {
		     var temparr = [];
			var temp = data['Time Series (Daily)'];
			for (var k in temp){
		
			temparr.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
			}
			var newGraphData = this.state.graphData;
			newGraphData.push(temparr);
			this.setState({
				graphData: newGraphData
			});
			
			}
			
			);
		});
  }

  addStock() {
	  console.log(this.state.graphData);
  }

  render() {
    return (
	<div>
	
    {this.renderGraphs()}

      <div className="wrapper">
        <h1>Stock</h1>
          {this.state.user ?
            <button onClick={this.logout}>Log Out</button>
          :
            <button onClick={this.login}>Log In</button>
          }
          <button onClick={this.addStock}>Add Stock</button>
        {this.state.user ?
        <div>
            <h4>{this.state.user.displayName}</h4>
        </div>
        :
        <div></div>
        }
      </div>
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
 window.time=[
                { x: new Date(1982, 1, 1), y: 125 },
                { x: new Date(1987, 1, 1), y: 257 },
                { x: new Date(1993, 1, 1), y: 345 },
                { x: new Date(1997, 1, 1), y: 515 },
                { x: new Date(2001, 1, 1), y: 132 },
                { x: new Date(2005, 1, 1), y: 305 },
                { x: new Date(2011, 1, 1), y: 270 },
                { x: new Date(2015, 1, 1), y: 470 }
              ];


export default App;
