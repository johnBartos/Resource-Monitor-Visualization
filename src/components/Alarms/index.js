import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const formatDate = date => moment(date).format('MMM Do HH:mm:ss');
const formatValue = value => value.toFixed(2);

const Alarms = React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    alarms: PropTypes.array.isRequired
  },
  render() {
    const alarms = [];
    for (const alarm of this.props.alarms) {
      alarms.push(
        <li className="alarm triggered" key={alarm.triggered.date}>
          {`High load generated an alert - load = ${formatValue(alarm.triggered.value)}, triggered at ${formatDate(alarm.triggered.date)}`}
        </li>
      );
      if (alarm.resolved) {
        alarms.push(
          <li className="alarm resolved" key={alarm.resolved.date}>
            {`High load alert resolved - load = ${formatValue(alarm.resolved.value)} triggered at ${formatDate(alarm.resolved.date)}`}
          </li>
        );
      }
    }
    return (
      <div className="two columns alarms">
        <h6>{`${this.props.id} minute average`}</h6>
        <hr/>
        <ul>
          {alarms}
        </ul>
      </div>
    );
  }
});

export default Alarms;
