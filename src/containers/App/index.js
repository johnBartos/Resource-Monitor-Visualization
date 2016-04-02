import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushOverReading, pushUnderReading, addLoadAlarm } from '../../actions';

const App = React.createClass({
  render() {
    console.log(this.props)
    let alarms = [];
    if (this.props.alarms.loadAlarmEvents['one']) {
      alarms = this.props.alarms.loadAlarmEvents['one'].map(e => {
        return <li>{e.date}</li>;
      });
    }
    return (
      <section id="App">
        <h1>Hello</h1>
        <button onClick={this.props.pushOverReading}>over</button>
        <button onClick={this.props.pushUnderReading}>under</button>
        <button onClick={this.props.addLoadAlarm}>alarm</button>
        <ul>
          {alarms}
        </ul>
        {this.props.children}
      </section>
    );
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    pushOverReading,
    pushUnderReading,
    addLoadAlarm
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
