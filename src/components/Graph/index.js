import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as graph from '../../utils/singleGraph';
import responsive from '../Responsive';

const style = {
  height: 200
};

const Graph = React.createClass({
  propTypes: {
    readings: PropTypes.array.isRequired,
    alarms: PropTypes.array.isRequired
  },
  render() {
    if (this.props.node) {
      const svgOptions = {
        node: this.props.node,
        height: style.height,
        width: this.props.width
      };
      graph.draw(svgOptions, this.props.readings, this.props.alarms);
    }
    return (
      <div className="ten columns" id="Graph"></div>
    );
  }
});

export default responsive(Graph);
