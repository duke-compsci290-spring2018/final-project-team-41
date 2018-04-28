import React, { Component } from 'react';
import Graph from './Graph.js';

const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Home extends Component {
  constructor(props) {
    super(props);
    this.addStock = this.addStock.bind(this);
    this.state = {
      graphData: []
    }
  }

  addStock() {
    
  }

  componentDidMount() {
	   return this.props.stocks.map((stock,i)=>{
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

  renderGraphs(){
	  return this.props.stocks.map((stock,i)=>{
	     return <Graph key = {stock} points = {this.state.graphData[i]}/>;
	  });
  }

  render() {
    return (
	    <div>
        {this.renderGraphs()}
        <button onClick={this.addStock}>Add Stock</button>
      </div>
    );
  }
}

export default Home;
