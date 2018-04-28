import React, { Component } from 'react';
import Graph from './Graph.js';
import { VictoryBar,VictoryChart,VictoryLine,VictoryTheme } from 'victory';

const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStocks: [],
      graphData: []
    }
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
			  });
		});
  }

  renderGraphs(){
	  return this.props.stocks.map((stock,i)=>{
	     return  <div key = {stock}><h3>{stock}</h3><Graph points = {this.state.graphData[i]}/></div>;
	  });
  }

  render() {
    return (
	    <div>
        <h1>Your Stocks</h1>
        {this.renderGraphs()}
      </div>
    );
  }
}

export default Home;
