import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSystemLoad, addLoadAlarm } from '../../actions';
import { getLoadAlarmEvents } from '../../reducers';

import Graph from '../../components/Graph';
import Alarms from '../../components/Alarms';

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
    const graphs = Object.keys(this.props.alarms).map(e => {
      return (
        <section id="load" key={e}>
          <Alarms
            alarms={this.props.alarms[e]}
          />
          <Graph
            readings={this.props.readings[e]}
            alarms={this.props.alarms[e]}
          />
        </section>
      );
    });

    return (
      <section>
        {graphs}
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
