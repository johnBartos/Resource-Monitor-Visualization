import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Graph from '../../components/Graph';

const Visualization = React.createClass({
  render() {
    return (
      <section>
        <h1>vis</h1>
        <Graph />
      </section>
    );
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Visualization);