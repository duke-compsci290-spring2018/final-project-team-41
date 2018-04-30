import React, { Component } from 'react';
import Graph from './Graph.js';

const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
    this.currStocks= [];
	 this.filterStocks = this.filterStocks.bind(this);
  }

  componentDidMount() {
    this.currStocks = [];
	   return this.props.stocks.forEach((stock,i)=>{
	      alpha.data.daily(stock).then(data => {
		        var temparr = [];
			      var temp = data['Time Series (Daily)'];
			      for (var k in temp){
              temparr.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
			      }
			      var newGraphData = this.state.graphData;
			      newGraphData.push(temparr);
            this.currStocks.push(stock);
			      this.setState({
				       graphData: newGraphData
			      });
			  });
		});
  }

  removeStock(stock) {
    this.props.userRef.once("value",(snapshot)=>{
      snapshot.forEach((itemSnapshot)=> {
        if(stock === itemSnapshot.val()){
          itemSnapshot.ref.remove();
        }
      });
    });
    var removeIndex = -1;
    this.currStocks.forEach((s,i)=>{
      if(s === stock){
        removeIndex = i;
      }
    });
    this.currStocks.splice(removeIndex,1);
    var tempGraph = [...this.state.graphData];
    tempGraph.splice(removeIndex, 1);
    this.setState({graphData: tempGraph});
  }

  renderGraphs(){
	  return this.currStocks.map((stock,i)=>{
	     return  <div className = "graphgrid" key = {stock}><button id = "special" onClick={() => this.removeStock(stock)}>&#10005;</button><strong>{stock}</strong><Graph points = {this.state.graphData[i]}/></div>;
	  });
  }

  filterStocks(){
	  var range = document.getElementById("filterpicker").value;
	  this.currStocks = [];
	   var newGraphData = [];
	   return this.props.stocks.forEach((stock,i)=>{
	      alpha.data.daily(stock).then(data => {
		        var temparr = [];
			      var temp = data['Time Series (Daily)'];
				  var counter = 0;
			      for (var k in temp){
					  if(counter >Number(range)){
					  continue;
				  }
              temparr.push({x:new Date(k),y:parseFloat(temp[k]['1. open'])});
			  counter = counter + 1;
			      }

			      newGraphData.push(temparr);
            this.currStocks.push(stock);
			      this.setState({
				       graphData: newGraphData
			      });
			  });
		});
  }

  render() {
    return (
	    <div id="home-div">
        <h1>Your Stocks</h1>
		<span>Filter: </span>
			 <select id = "filterpicker" onChange = {this.filterStocks}>
	<option value="100">100 Days</option>
	<option value="40">60 Days</option>
	<option value="20">20 Days</option>
	<option value="10">10 Days</option>
	</select>
		<div className = "grid">
        {this.renderGraphs()}
		</div>
      </div>
    );
  }
}

export default Home;
