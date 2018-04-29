import React, { Component } from 'react';
import { VictoryBar,VictoryChart,VictoryLine,VictoryTheme,VictoryContainer } from 'victory';
class GraphLine extends Component{
 constructor(props)
 {
	 super(props);
	 this.state = {data:props.points, tline:props.tlinepoints};
 }
 render() {
    return (
	<div class = "sameline">
      <VictoryChart
  theme={VictoryTheme.material}
  scale={{ x: "time"}}
  width={window.innerWidth*0.7}
  height ={window.innerHeight*0.8}
   containerComponent={<VictoryContainer responsive={false}/>}
>
{this.props.tlinepoints.length > 0 &&
 <VictoryLine
    style={{
      data: { stroke: "#80aaff" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.props.tlinepoints}
  />
}
  <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.props.points}
  />
  
</VictoryChart>
</div>

    )
  }
}

export default GraphLine;