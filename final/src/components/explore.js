import React, { Component } from 'react';
import Graph from './Graph.js';
import regression from 'regression';
const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
class Explore extends Component{
	 constructor(props) {
    super(props);
	 	this.state = {
		 ticker:[],
		 graphData:[]
	 	}
	 	this.setTicker = this.setTicker.bind(this);
		this.addStock = this.addStock.bind(this);
	 }

	 componentDidMount() {
		 this.tickervalid = false;
		 this.firsttime = true;
		 document.getElementById("tick").disabled = true;
   }

	 renderExplore(){
		 return this.state.ticker.map((stock,i)=>{
	     return <Graph key = {stock} points = {this.state.graphData}/>;
	  });
	 }

	 addStock(){
		 var newStock = document.getElementById("pred").value;
		 var existed = false;
		 this.props.userRef.once("value",(snapshot)=>{
			 snapshot.forEach((itemSnapshot)=> {
				 if(newStock === itemSnapshot.val()){
					 existed = true;
					 return;
				 }
			 });
		 });
		 if(!existed){
			 this.props.userRef.push(newStock);
			 alert("Stock added to YOUR STOCKS");
		 }else{
			 alert(newStock+" is already in YOUR STOCKS");
		 }
	 }

	 setTicker(){
		 this.firsttime = false;
		 this.tickervalid = false;
		 document.getElementById("tick").disabled = true;
		 var val = document.getElementById("pred").value;
		 this.setState({
			ticker:[val]
		 });
		  alpha.data.daily(val).then(data => {
			  this.tickervalid = true;
			  document.getElementById("tick").disabled = false;
		    var temparr = [];
			  var temp = data['Time Series (Daily)'];
			  for (var k in temp){
          temparr.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
			  }
				this.setState({
					graphData: temparr
				});
			}
			);
	 }

	 render(){
	 return(
	 <div>
	 <input type="text" id = "pred"></input>
	 <button onClick={this.setTicker}>Explore Stock</button>
	 <button onClick={this.addStock} id = "tick">Add Stock</button>
	 {this.renderExplore()}
	 </div>
	 );
	 }
}

export default Explore;
