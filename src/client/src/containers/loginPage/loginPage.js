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
    email: data.logemail,
    password: data.logpassword,
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
    const error = [];
    if(this.props.error){
      error.push((
        <div className="alert" role="alert" style={{backgroundColor:'#f4466b', color:'white'}}>
          <div>{this.props.error}</div>
        </div>
      ));
    }
    return (

      <div className="login-clean">
        <form method="post">
          <h2 className="sr-only">Login Form</h2>
        <div className="illustration">
        <i className="icon ion-log-in"></i>
        </div>

        {error}

        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="logemail"
            value={this.props.email}
            onChange={eventToAction(this.props.updateLogEmail)}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="logpassword"
            value={this.props.password}
            onChange={eventToAction(this.props.updateLogPassword)}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={this.props.submitLogin}
            disabled={this.props.loading}
          >
            Log In
          </button>
        </div>
        <a href="/register" className="forgot">Register?</a></form>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
