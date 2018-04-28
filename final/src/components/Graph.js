import React, { Component } from 'react';
import { VictoryBar,VictoryChart,VictoryLine,VictoryTheme } from 'victory';
class Graph extends Component{
 constructor(props)
 {
	 super(props);
	 this.state = {data:props.points};
 }
 render() {
    return (
      <VictoryChart
  theme={VictoryTheme.material}
  scale={{ x: "time" }}
>
  <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.props.points}
  />
</VictoryChart>
    )
  }
}

export default Graph;