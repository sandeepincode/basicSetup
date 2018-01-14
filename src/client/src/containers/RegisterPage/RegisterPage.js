import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import eventToAction from '../../util/eventToAction';
import {
  updateRegEmail,
  updateRegPassword,
  updateRegPasswordConf,
  submitRegister
} from '../../redux/reducers/register';

function mapStateToProps({register}) {
  const { ui, data } = register;
  return {
    loading: ui.loading,
    error: ui.error,
    email: data.email,
    password: data.password,
    passwordConf: data.passwordConf

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateRegEmail,
    updateRegPassword,
    updateRegPasswordConf,
    submitRegister
  }, dispatch);
}

class RegisterPage extends Component {
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
          <h2 className="sr-only">Register Form</h2>
        <div className="illustration">
          <i className="icon ion-plus-round"></i>
        </div>

        {error}

        <div className="form-group">
          <input
            className="form-control"
            required="true"
            type="email"
            name="email"
            value={this.props.email}
            onChange={eventToAction(this.props.updateRegEmail)}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            required="true"
            type="password"
            name="password"
            value={this.props.password}
            onChange={eventToAction(this.props.updateRegPassword)}
            placeholder="Enter Password"
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            required="true"
            type="password"
            name="passwordConf"
            value={this.props.passwordConf}
            onChange={eventToAction(this.props.updateRegPasswordConf)}
            placeholder="Confirm Password"
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={this.props.submitRegister}
            disabled={this.props.loading}
          >
            Register
          </button>
        </div>
        <a href="/login" className="forgot">Login?</a></form>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
