import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as graph from '../../utils/graph';
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
    // Children render before parents, so we need to wait for the responsive component
    if (this.props.node) {
      const svgOptions = {
        node: this.props.node,
        height: style.height,
        width: this.props.width
      };
      graph.draw(svgOptions, this.props.readings, this.props.alarms);
    }
    return (
      <div className="ten columns graph"></div>
    );
  }
});

// The responsive higher-order component passes the real DOM node and the width as props
export default responsive(Graph);
