import React, { Component, PropTypes } from 'react';

const App = React.createClass({
  render() {
    return (
      <div className="container u-full-width">
        {this.props.children}
      </div>
    );
  }
});

export default App;
