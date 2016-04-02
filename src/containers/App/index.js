import React, { Component, PropTypes } from 'react';

const App = React.createClass({
  render() {
    return (
      <section id="App">
        {this.props.children}
      </section>
    );
  }
});

export default App;
