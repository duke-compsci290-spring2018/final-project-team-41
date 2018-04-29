import React, { Component } from 'react';
import GraphLine from './GraphLine.js';
import regression from 'regression';
const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
var math = require('mathjs');

class Predict extends Component{
	 constructor(props) {
    super(props);

	 this.state = {
		 ticker:[],
		 graphData:[],
		 tlinedata:[]
	 }
	 this.setTicker = this.setTicker.bind(this);
	 this.analyze = this.analyze.bind(this);
	 this.computeMetrics = this.computeMetrics.bind(this);
	 this.trend = [];
	 this.prediction = 0;
	 this.stdev = 0;
	 }
	 componentDidMount() {
		 document.getElementById("tick").disabled = true;
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
  }
	 renderPredict(){
		 return this.state.ticker.map((stock,i)=>{
	     return <GraphLine key = {stock} points = {this.state.graphData} tlinepoints = {this.state.tlinedata}/>;
	  });

	 }
	 computeMetrics(input){
		 var temparray = [];
		 for (var k = 0; k<input.length; k++){
			 temparray.push(input[k].y);
		 }
		 return math.std(temparray);

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
			  var counter = 0;
			  var range = document.getElementById("rangepicker").value;
			  for (var k in temp){
				  if(counter >Number(range)){
					  continue;
				  }
          temparr.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
		  this.stdev = this.computeMetrics(temparr);
		  counter = counter + 1;
			  }

			this.setState({
				graphData: temparr,
				tlinedata:[]
			});
			//console.log(this.state.ticker);
			//console.log(this.state.graphData);
			//console.log(this.state.tlinedata);
			}

			);
	 }

	 analyze(){
		 console.log("hi");
		 this.trend = [];
		var temptrendline = [];
		for (var k in this.state.graphData){
			this.trend.push([Number(k), this.state.graphData[k].y]);
		}
		//console.log(this.trend);
		var result;
		var selection = document.getElementById("orderpicker").value;
		if(selection==='1'){
			result = regression.linear(this.trend);
		}
		else if(selection==='3'){
			result = regression.polynomial(this.trend,{ order: 3 ,precision:3});
		}
		//var slope = result.equation[0];
		//var yint = result.equation[1];
		//console.log(result.predict(100));
		this.prediction = result.predict(-1)[1];
		for (var j in this.state.graphData){
			//var tempval = Number(j)*slope+yint;
			temptrendline.push({x:this.state.graphData[j].x,y:result.predict(Number(j))[1]});
		}

		this.setState({
			tlinedata:temptrendline
		});

	 }

	 render(){
	 return(
	 <div>
	 <input type="text" id = "pred"></input>
	 <button onClick={this.setTicker}>View Stock</button>
	 <select id = "rangepicker">
	<option value="100">100 Days</option>
	<option value="40">60 Days</option>
	<option value="20">20 Days</option>
	<option value="10">10 Days</option>
	</select>
	 <button onClick={this.analyze} id = "tick">Analyze Stock</button>
	 <select id = "orderpicker">
	<option value="1">Linear</option>
	<option value="3">Polynomial</option>
	</select>

	<span>
	 {this.renderPredict()}
		 {this.state.tlinedata.length>0 &&
		 <div className = "sameline">
<<<<<<< HEAD
		 <div>{this.state.ticker[0]}</div>
		<div>{this.stdev}</div>
=======
		 <div>{this.state.ticker[0]}</div><br></br>
		 <div><p>Standard Deviation in Dollars</p></div> <br></br>
		<div>{this.stdev}</div> <br></br>
		<div><p>Prediction for next close price</p></div><br></br>
>>>>>>> 76591bae937c8fd5572a5ff2beeebdf9d167c7c9
			<div>{this.prediction}</div>
		 </div>
		 }
	</span>
	 </div>
	 );
	 }
}

export default Predict;
