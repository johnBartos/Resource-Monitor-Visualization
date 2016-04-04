import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSystemLoad, addLoadAlarms } from '../../actions';
import { getLoadAlarmEvents } from '../../reducers';

import Graph from '../../components/Graph';
import Alarms from '../../components/Alarms';

// The load will appear on the graph in 10 seconds because we need at least 2 points to form a line

const Visualization = React.createClass({
  componentDidMount() {
    this.props.addLoadAlarms('one', 'five', 'fifteen');
    this.props.getSystemLoad();
    setInterval(() => {
      this.props.getSystemLoad();
    }, 10 * 1000);
  },
  render() {
    const graphs = Object.keys(this.props.alarms).map(id => {
      return (
        <div className="row u-full-width load" key={id}>
          <Graph
            readings={this.props.readings[id]}
            alarms={this.props.alarms[id]}
          />
          <Alarms
            id={id}
            alarms={this.props.alarms[id]}
          />
        </div>
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
    addLoadAlarms
  }, dispatch);
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Visualization);
