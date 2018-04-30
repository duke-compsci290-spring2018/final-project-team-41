import React, { Component } from 'react';
import { VictoryChart,VictoryLine,VictoryTheme, VictoryContainer } from 'victory';
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
   width={window.innerWidth*0.4}
  height ={window.innerHeight*0.4}
   containerComponent={<VictoryContainer responsive={false}/>}
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
