import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <section id="App">
        <h1>Hello</h1>
        {this.props.children}
      </section>
    );
  }
}

export default App;
