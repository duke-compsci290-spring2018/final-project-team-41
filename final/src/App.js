import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';
import Graph from './components/Graph.js';
import Home from './components/home';
import Explore from './components/explore'
import Trending from './components/trending';
import Predict from './components/prediction';
import Admin from './components/admin';

const ADMIN_EMAIL = "stocknotebook1@gmail.com";
const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
var users = firebase.database().ref('users');
var trendingRef = firebase.database().ref('trending');

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
    this.changeTab = this.changeTab.bind(this);
    this.isAdmin = false;
    this.trending= [];
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
      userRef: null,
	    stocks: ['MSFT','AMZN'],
      tab: 3
    }
  }

  componentWillMount() {
    var tempTrending = [];
    trendingRef.on("value", function(snapshot) {
       snapshot.forEach((itemSnapshot)=> {
           tempTrending.push(itemSnapshot.val());
       });
    });
    this.trending = tempTrending;
  }

  logout() {
    this.isAdmin = false;
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        tab:2
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
        if(newUser.email === ADMIN_EMAIL) {
          this.isAdmin = true;
        }
        users.once("value",(snapshot)=>{
          snapshot.forEach((itemSnapshot)=> {
            if(itemSnapshot.child('email').val() == newUser.email){
              existed = true;
			        oldUser = itemSnapshot['key'];
            }
          });
          if(!existed) { //new user
            firebase.database().ref('users').push({
              name: newUser.displayName,
              email: newUser.email,
              stocks: ['FB']
            });
			      this.setState(prevState => ({
				       stocks: [...prevState.stocks, 'FB']
			      }));
          }else{ // returning user
			         var newStocks = [];
			         var st = firebase.database().ref('users/'+oldUser+"/stocks");
			         st.on("value", function(snapshot) {
				          snapshot.forEach((itemSnapshot)=> {
					            newStocks.push(itemSnapshot.val());
				          });
			         });
			         this.setState(prevState => ({
				          stocks: newStocks,
                  userRef: st
			         }));
               console.log('Log in successful');
          }
        });
    });

  }

  directTab() {
    if(this.state.tab === 1) {
      return <Home stocks={this.state.stocks} userRef={this.state.userRef}/>
    }else if(this.state.tab === 2) {
      return <Trending stocks={this.trending}/>
    }else if(this.state.tab === 3) {
      return <Explore userRef={this.state.userRef}/>
    }else if(this.state.tab === 4) {
      return <Predict ticker = {[]}/>
    }else if(this.state.tab === 5) {
      return <Admin stocks={this.trending} trendingRef={trendingRef}/>;
    }
  }

  changeTab(event) {
    var newTab = event.target.innerHTML;
    if(newTab.includes("Trending")) {
      var tempTrending = [];
      trendingRef.on("value", function(snapshot) {
         snapshot.forEach((itemSnapshot)=> {
             tempTrending.push(itemSnapshot.val());
         });
      });
      this.setState({tab:2});
      this.trending = tempTrending;
      return;
    }else if(newTab.includes("Explore")) {
      this.setState({tab:3});
      return;
    }
    if(this.state.user){
      if(newTab.includes("Home")) {
        var newStocks = []
        this.state.userRef.on("value", function(snapshot) {
           snapshot.forEach((itemSnapshot)=> {
               newStocks.push(itemSnapshot.val());
           });
        });
        this.setState({
          stocks: newStocks,
          tab:1
        });
      }else if(newTab.includes("Predict")) {
        this.setState({tab:4});
      }else if(newTab.includes("Admin")) {
        this.setState({tab:5});
      }
    }else{
      alert('Please Log In');
    }

  }

  render() {
    return (
	<div>
    <ul className="navbar">
      <li><a onClick={this.changeTab}>Home</a></li>
      <li><a onClick={this.changeTab}>Trending</a></li>
      <li><a onClick={this.changeTab}>Explore</a></li>
      <li><a onClick={this.changeTab}>Predict</a></li>
      {this.isAdmin &&
        <li><a onClick={this.changeTab}>Admin</a></li>
      }
      <li id='loginBtn'>
      {this.state.user ?
        <a onClick={this.logout}>Log Out</a>
      :
        <a onClick={this.login}>Log In</a>
      }
      </li>
    </ul>
      <div>

        {this.state.user ?
        <div>
            <h4>{this.state.user.displayName}</h4>
        </div>
        :
        <div></div>
        }
      </div>
      {this.directTab()}


</div>
    );
  }
}

export default App;
