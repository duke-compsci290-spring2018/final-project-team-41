import React, { Component } from 'react';
import Graph from './Graph.js';
import { VictoryBar,VictoryChart,VictoryLine,VictoryTheme } from 'victory';

const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    }
    this.currStocks= [];
  }

  componentDidMount() {
    this.currStocks = [];
	   return this.props.stocks.map((stock,i)=>{
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
	     return  <div key = {stock}><h3>{stock}</h3><button onClick={() => this.removeStock(stock)}>x</button><Graph points = {this.state.graphData[i]}/></div>;
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
