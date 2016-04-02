import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as graph from '../../utils/graph';

const style = {
  height: 250,
  width: 1000
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

      graph.draw(svgOptions, [
        { value: 1, date: new Date(Date.now()) },
        { value: 2, date: new Date(Date.now() + 10000) },
        { value: 3, date: new Date(Date.now() + 10000) }
      ]);
    }
    return (
      <div id="Graph"></div>
    );
  }
});

export default Graph;
