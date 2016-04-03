import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSystemLoad, addLoadAlarm } from '../../actions';
import { getLoadAlarmEvents } from '../../reducers';

import Graph from '../../components/Graph';

const Visualization = React.createClass({
  componentDidMount() {
    this.props.addLoadAlarm('one');
    this.props.addLoadAlarm('five');
    this.props.addLoadAlarm('fifteen');
    this.props.getSystemLoad();
    setInterval(() => {
      this.props.getSystemLoad();
    }, 10 * 1000);
  },
  render() {
    return (
      <section>
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
    getSystemLoad,
    addLoadAlarm
  }, dispatch);
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Visualization);
