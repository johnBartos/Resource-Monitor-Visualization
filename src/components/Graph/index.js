import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as graph from '../../utils/singleGraph';

const style = {
  height: 200,
  width: 1200
};

const Graph = React.createClass({
  propTypes: {
    readings: PropTypes.array.isRequired,
    alarms: PropTypes.array.isRequired
  },
  componentDidMount() {
    this.setState({
      graphNode: graph.mount(ReactDom.findDOMNode(this))
    });
  },
  componentWillUnmount() {
    if (this.state) {
      graph.unmount(this.state.graphNode);
    }
  },
  render() {
    if (this.state) {
      const svgOptions = {
        element: this.state.graphNode,
        height: style.height,
        width: style.width
      };
      graph.draw(svgOptions, this.props.readings, this.props.alarms);
    }
    return (
      <div id="Graph"></div>
    );
  }
});

export default Graph;
