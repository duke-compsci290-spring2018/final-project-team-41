import React, { Component } from 'react';
import Graph from './Graph.js';

const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: ['MSFT','AMZN'],
      graphData: []
    }
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
			  });
		});
  }

  renderGraphs(){
	  return this.state.stocks.map((stock,i)=>{
	     return <div key = {stock}><h3>{stock}</h3><Graph  points = {this.state.graphData[i]}/></div>;
	  });
  }

  render() {
    return (
	    <div>
        <h1>Trending Stocks</h1>
        {this.renderGraphs()}
      </div>
    );
  }
}

export default Trending;
