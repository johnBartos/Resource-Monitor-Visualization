import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushOneReading, pushTwoReading, addLoadAlarm } from '../../actions';

import Graph from '../../components/Graph';

const Visualization = React.createClass({
  render() {
    return (
      <section>
        <button onClick={this.props.addLoadAlarm}>add alarm</button>
        <button onClick={this.props.pushOneReading.bind('one')}>one reading</button>
        <button onClick={this.props.pushTwoReading.bind('two')}>two reading</button>
        <Graph
          readings={this.props.readings}
        />
      </section>
    );
  }
});

const mapStateToProps = state => {
  return {
    readings: state.historicalLoad.readings
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    pushOneReading,
    pushTwoReading,
    addLoadAlarm
  }, dispatch);
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Visualization);
