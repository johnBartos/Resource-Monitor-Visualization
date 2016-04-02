import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushOneReading, pushTwoReading, addLoadAlarm } from '../../actions';
import { getLoadAlarmEvents } from '../../reducers';

import Graph from '../../components/Graph';

const Visualization = React.createClass({
  render() {
    console.log(this.props.alarms);
    return (
      <section>
        <button onClick={this.props.addLoadAlarm}>add alarm</button>
        <button onClick={this.props.pushOneReading.bind('one')}>one reading</button>
        <button onClick={this.props.pushTwoReading.bind('two')}>two reading</button>
        <Graph
          readings={this.props.readings}
          alarms={this.props.alarms}
        />
      </section>
    );
  }
});

const mapStateToProps = state => {
  return {
    readings: state.historicalLoad.readings,
    alarms: getLoadAlarmEvents(state)
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
