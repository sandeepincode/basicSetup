import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import eventToAction from '../../util/eventToAction';
import { submitLogout } from '../../redux/reducers/logout';

function mapStateToProps({logout}) {
  const { ui, data } = logout;
  return {
    loading: ui.loading,
    error: ui.error,
    terminated: data.terminated,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitLogout,
  }, dispatch);
}

 class NavBar extends Component {
  render() {
    return (
      <div>
        <h1>NAV BAR</h1>
        <button
          onClick={eventToAction(this.props.submitLogout)}
          >LOGOUT</button>
        <br/>
        <div>
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
