import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class Chart extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    return(
      <LineChart width={600} height={300} data={this.props.data} >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
      </LineChart>
    )
  }
};

export default Chart;