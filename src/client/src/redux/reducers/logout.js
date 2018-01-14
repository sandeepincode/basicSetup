import update from 'immutability-helper';
import axios from 'axios';
import request from 'ajax-request';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const FETCH_LOGOUT_REQUEST = 'fetchLogoutRequest/login/shift';
export const FETCH_LOGOUT_FAILURE = 'fetchLoginFailure/login/shift';
export const FETCH_LOGOUT_SUCCESS = 'fetchLoginSuccess/login/shift';

const initialState = {
  ui: {
    loading: false,
    error: '',
  },
  data: {
    terminated: false,
  }
};

export default function logoutReducer(state = initialState, {type, payload}) {
  switch (type) {
    case FETCH_LOGOUT_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
          error: { $set: '' },
        },
      });
    }
    case FETCH_LOGOUT_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
          error: { $set: payload },
        },
        data: {
          terminated: { $set: false }
        }
      });
    }
    case FETCH_LOGOUT_SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
          error: { $set: '' },
        },
        data: {
          terminated: true,
        }
      });
    }
  }
  return state;
}

const logoutFailure = simpleAction(FETCH_LOGOUT_FAILURE);

export function submitLogout() {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_LOGOUT_REQUEST
    });

    try {
      request({
        url: '/api/logout',
        method: 'GET',
        withCredentials: true,
      }, (error, res, body) => {
        return new Promise((resolve, reject) => {
          if ( error ) {
            dispatch({
              type: FETCH_LOGOUT_FAILURE,
              payload: error,
            });
            return reject();
          }
          return resolve(JSON.parse(body));
        }).then((resp) => {
          if (resp.response === 1) {
            dispatch('/login');
            return dispatch({
              type: FETCH_LOGOUT_SUCCESS,
            });
          }
          return dispatch({
            type: FETCH_LOGOUT_FAILURE,
            payload: resp.msg,
          });
        });
      });
    } catch (e) {
      return dispatch(logoutFailure('Something went wrong'))
    }
  }
}
