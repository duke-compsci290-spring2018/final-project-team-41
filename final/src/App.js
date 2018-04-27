import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';

var users = firebase.database().ref('users');

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
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
        users.once("value", function(snapshot){
          snapshot.forEach(function(itemSnapshot) {
            if(itemSnapshot.child('email').val() === newUser.email){
              existed = true;
            }

          });
          if(!existed) {
            firebase.database().ref('users').push({
              name: newUser.displayName,
              email: newUser.email,
              stocks: ['FB']
            });
          }else{
            console.log('Log in successful');
          }
        });


    });
  }

  componentDidMount() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
  });
  }

  addStock() {

  }

  render() {
    return (
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
    );
  }
}

export default App;
