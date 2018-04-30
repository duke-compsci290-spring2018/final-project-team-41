import React, { Component } from 'react';
import { VictoryChart,VictoryLine,VictoryTheme,VictoryBrushContainer,VictoryZoomContainer } from 'victory';
class GraphLineBrush extends Component{
 constructor(props)
 {
	 super(props);
	 this.state = {data:props.points, tline:props.tlinepoints};
 }
 handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }
 render() {
    return (
	<div className = "sameline">
      <VictoryChart
  theme={VictoryTheme.material}
  scale={{ x: "time"}}
  width={window.innerWidth*0.8}
  height ={window.innerHeight*0.5}
   containerComponent={
              <VictoryZoomContainer responsive={false}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
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
<VictoryChart
padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={window.innerWidth*0.8} height={90} scale={{x: "time"}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
>
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

export default GraphLineBrush;
