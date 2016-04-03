import React, { Component, PropTypes } from 'react';

const Alarms = React.createClass({
  propTypes: {
    alarms: PropTypes.array.isRequired
  },
  render() {
    const alarms = this.props.alarms.map(e => {
      return (
        <li>
          {`Alarm triggered on ${new Date(e.triggered.date)} with value ${e.triggered.value}`}
          {e.resolved ? `\nAlarm resolved on ${new Date(e.resolved.date)} with value ${e.resolved.value}` : ''}
        </li>
      );
    });
    return (
      <div className="two columns" id="Alarms">
        <h6>Alarms</h6>
        <ul>
          {alarms}
        </ul>
      </div>
    );
  }
});

export default Alarms;