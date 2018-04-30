import React, { Component } from 'react';
import Graph from './Graph.js';
import GraphLineBrush from "./GraphLineBrush.js"
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
		 document.getElementById("pred").value = "NVDA";
		 this.setTicker();

   }

	 renderExplore(){
		 return this.state.ticker.map((stock,i)=>{
	     return <GraphLineBrush key = {stock} points = {this.state.graphData} tlinepoints = {[]}/>;
	  });
	 }

	 addStock(){
		 var newStock = document.getElementById("pred").value.toUpperCase();
		 var existed = false;
		 if(this.props.userRef != null){
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
		 }else{
			 alert("Please Log In");
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
			).catch(function(error) { alert("invalid stock ticker"); });
	 }

	 render(){
	 return(
	 <div>
	 <h1>Explore a Stock</h1>
	 <input type="text" id = "pred"></input>
	 <button onClick={this.setTicker}>Explore Stock</button>
	 <button onClick={this.addStock} id = "tick">Add Stock</button><br></br>
	 {this.renderExplore()}
	 </div>
	 );
	 }
}

export default Explore;
