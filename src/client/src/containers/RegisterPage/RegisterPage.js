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
    return (
        <div>
          <h3>Register Page</h3>

          <label>Enter Email:</label>
          <input
            required="true"
            type="email"
            name="email"
            value={this.props.email}
            onChange={eventToAction(this.props.updateRegEmail)}
            placeholder="email"
          />

          <label>Enter Password:</label>
          <input
            required="true"
            type="password"
            name="password"
            value={this.props.password}
            onChange={eventToAction(this.props.updateRegPassword)}
            placeholder="password"
          />

          <label>Confirm Password:</label>
          <input
            required="true"
            type="password"
            name="passwordConf"
            value={this.props.passwordConf}
            onChange={eventToAction(this.props.updateRegPasswordConf)}
            placeholder="confirm password"
          />

          <button
            onClick={this.props.submitRegister}
            disabled={this.props.loading}
          >Submit</button>

          <br/>
           <div>{this.props.error}</div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
