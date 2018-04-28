import React, { Component } from 'react';
import Graph from './Graph.js';
const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
class Explore extends Component{
	 constructor(props) {
    super(props);
	 
	 this.state = {
		 ticker:[],
		 graphData:[]
	 }
	 this.setTicker = this.setTicker.bind(this);
	 this.displayValid = this.displayValid.bind(this);
	 }
	 componentDidMount() {
	   return this.props.ticker.map((stock,i)=>{
	      alpha.data.daily(stock).then(data => {
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
		});
	this.tickervalid = false;
	this.firsttime = true;
  }
	 renderPredict(){
		 return this.state.ticker.map((stock,i)=>{
	     return <Graph key = {stock} points = {this.state.graphData}/>;
	  });
		 
	 }
	 setTicker()
	 {
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
			//console.log(this.state.ticker);
			//console.log(this.state.graphData);
			}
			
			);
			
	 }
	 
	 addStock(){
		 
	 }
	 
	 render(){
	 return(
	 <div>
	 <input type="text" id = "pred"></input>
	 <button onClick={this.setTicker}>Explore Stock</button>
	 <button onClick={this.addStock} id = "tick" disabled>Add Stock</button>
	 {this.renderPredict()}
	 </div>
	 );
	 }
}

export default Explore;