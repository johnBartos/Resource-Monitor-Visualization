import React, { Component, PropTypes } from 'react';

const Alarms = React.createClass({
  propTypes: {
    alarms: PropTypes.array.isRequired
  },
  render() {
    return (
      <section id="Alarms">
        <h1>hey b0ss</h1>
      </section>
    );
  }
});

export default Alarms;