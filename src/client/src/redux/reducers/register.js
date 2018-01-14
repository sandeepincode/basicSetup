import update from 'immutability-helper';
import axios from 'axios';
import request from 'ajax-request';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const UPDATE_REGEMAIL = 'updateRegEmail/register/shift';
export const UPDATE_REGPASSWORD = 'updateRegPassword/register/shift';
export const UPDATE_REGPASSWORDCONF = 'updateRegPasswordConf/register/shift';

export const FETCH_REGISTER_REQUEST = 'fetchRegisterRequest/Register/shift';
export const FETCH_REGISTER_FAILURE = 'fetchRegisterFailure/Register/shift';
export const FETCH_REGISTER_SUCCESS = 'fetchRegsiterSuccess/Register/shift';

const initialState = {
  ui: {
    loading: false,
    error: '',
  },
  data: {
    email: '',
    password: '',
    passwordConf: '',
  }
};

export default function registerReducer(state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_REGEMAIL: {
      return update(state, {
        data: {
          email: { $set: payload },
        },
      });
    }
    case UPDATE_REGPASSWORD: {
      return update(state, {
        data: {
          password: { $set: payload },
        },
      });
    }
    case UPDATE_REGPASSWORDCONF: {
      return update(state, {
        data: {
          passwordConf: { $set: payload },
        },
      });
    }
    case FETCH_REGISTER_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
          error: { $set: '' },
        },
      });
    }
    case FETCH_REGISTER_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
          error: { $set: payload },
        },
      });
    }
    case FETCH_REGISTER_SUCCESS: {
      return {...initialState};
    }
  }
  return state;
}

const registerFailure = simpleAction(FETCH_REGISTER_FAILURE);
export const updateRegEmail = simpleAction(UPDATE_REGEMAIL);
export const updateRegPassword = simpleAction(UPDATE_REGPASSWORD);
export const updateRegPasswordConf = simpleAction(UPDATE_REGPASSWORDCONF);

export function submitRegister() {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REGISTER_REQUEST
    });
    
    const {
      email,
      password,
      passwordConf,
    } = getState().register.data;

    try {
      request({
        url: '/api/login',
        method: 'POST',
        withCredentials: true,
        data: {
          email,
          password,
          passwordConf,
        }
      }, (error, res, body) => {
        return new Promise((resolve, reject) => {
          if ( error ) {
            dispatch({
              type: FETCH_REGISTER_FAILURE,
              payload: error,
            });
            return reject();
          }
          return resolve(JSON.parse(body));
        }).then((resp) => {
          if(resp.response === 1){
            dispatch('/shift');
            return dispatch({
              type: FETCH_REGISTER_SUCCESS
            })
          }
          return dispatch({
            type: FETCH_REGISTER_FAILURE,
            payload: resp.msg,
          });
        });
      });
    } catch (e) {
      return dispatch(registerFailure('Something went wrong'))
    }
  }
}
