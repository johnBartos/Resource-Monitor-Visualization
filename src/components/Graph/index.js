import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as graph from '../../utils/graph';

const style = {
  height: 250,
  width: 1250
};

const Graph = React.createClass({
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

      graph.draw(svgOptions, this.props.readings);
    }
    return (
      <div id="Graph"></div>
    );
  }
});

export default Graph;
