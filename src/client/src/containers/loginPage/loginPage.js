import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import eventToAction from '../../util/eventToAction';
import { updateLogEmail, updateLogPassword, submitLogin } from '../../redux/reducers/login';

function mapStateToProps({login}) {
  const { ui, data } = login;
  return {
    loading: ui.loading,
    error: ui.error,
    email: data.email,
    password: data.password,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateLogEmail,
    updateLogPassword,
    submitLogin,
  }, dispatch);
}

class LoginPage extends Component {
  render() {
    return (
        <div>
          <h3>Login Page</h3>

          <label>Enter Email:</label>
          <input
            type="text"
            value={this.props.email}
            onChange={eventToAction(this.props.updateLogEmail)}
            placeholder="email"
          />

          <label>Enter Password:</label>
          <input
            type="password"
            value={this.props.password}
            onChange={eventToAction(this.props.updateLogPassword)}
            placeholder="password"
          />

          <button
            onClick={this.props.submitLogin}
            disabled={this.props.loading}
          >Submit</button>

          <br/>
           <div>{this.props.error}</div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
