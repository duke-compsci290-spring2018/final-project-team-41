import React, { Component } from 'react';
const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });

class Admin extends Component {
  constructor(props){
    super(props);
    this.addStock = this.addStock.bind(this);
    this.current = this.props.stocks;
    this.state={
      dummy: 0
    };
  }

  addStock() {
    var newStock = document.getElementById('adminInput').value.toUpperCase();

    alpha.data.daily(newStock).then(data => {
      var existed = false;
      this.props.trendingRef.once("value",(snapshot)=>{
        snapshot.forEach((itemSnapshot)=> {
          if(newStock === itemSnapshot.val()){
            existed = true;
            return;
          }
        });
      });
      var copy = this.current.slice(0);
      if(!existed){
        this.props.trendingRef.push(newStock);
        alert("Stock added to TRENDING STOCKS");
      }else{
        alert(newStock+" is already in TRENDING STOCKS");
      }
      copy.push(newStock);
      this.current = copy;
      var temp = this.state.dummy+1;
      this.setState(prevState => ({
        dummy: temp
      }));
    }
    ).catch(function(error) { alert("invalid stock ticker"); });
  }

  removeStock(stock) {
    var copy = this.current.slice(0);
    this.props.trendingRef.once("value",(snapshot)=>{
      snapshot.forEach((itemSnapshot)=> {
        if(stock === itemSnapshot.val()){
          itemSnapshot.ref.remove();
        }
      });
    });
    var removeIndex = -1;
    copy.forEach((s,i)=>{
      if(s === stock){
        removeIndex = i;
      }
    });
    copy.splice(removeIndex,1);
    this.current = copy;
    var dumb = this.state.dummy + 1;
    this.setState(prevState => ({
      dummy: dumb
    }));
  }

  renderTrendingStocks() {
    return this.current.map((stock,i)=>{
	     return <li key={stock} className="trending-li"><button onClick={() => this.removeStock(stock)}>x</button>{stock}</li>;
    });
  }

  render() {
    return(
       <div>
        <h1>Admin Page</h1>
        <h5>Add Stock to Trending Page:</h5>
        <input type="text" id = "adminInput"></input>
        <button onClick={this.addStock}>Add to Trending Stocks</button>
        <h5>Current Trending Stocks</h5>
        <ul>{this.renderTrendingStocks()}</ul>
       </div>
    )
  }
}

export default Admin;
