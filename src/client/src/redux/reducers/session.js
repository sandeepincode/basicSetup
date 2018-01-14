import update from 'immutability-helper';
import axios from 'axios';
import request from 'ajax-request';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const FETCH_SESSION_REQUEST = 'fetchSessionRequest/session/shift';
export const FETCH_SESSION_FAILURE = 'fetchSessionFailure/session/shift';
export const FETCH_SESSION_SUCCESS = 'fetchSessionSuccess/session/shift';

const initialState = {
  ui: {
    loading: true,
  },
  data: {
    valid: false,
    error: '',
  }
};

export default function sessionReducer(state = initialState, {type, payload}) {
  switch (type) {
    case FETCH_SESSION_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case FETCH_SESSION_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          error: { $set: payload },
          valid: { $set: false },
        },
      });
    }
    case FETCH_SESSION_SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          valid: { $set: true },
        },
      });
    }
  }
  return state;
}

const sessionFailure = simpleAction(FETCH_SESSION_FAILURE);

export function sessionCheck() {
  return async (dispatch, getState) => {

    dispatch({
      type: FETCH_SESSION_REQUEST
    });

    try {
      request({
        url: '/api/login',
        method: 'GET',
        withCredentials: true,
      }, (error, res, body) => {
        return new Promise((resolve, reject) => {
          if ( error ) {
            dispatch({
              type: FETCH_SESSION_FAILURE,
              payload: error,
            });
            return reject();
          }
          return resolve(JSON.parse(body));
        }).then((resp) => {
          if(resp.response === 1){
            dispatch('/shift');
            return dispatch({
              type: FETCH_SESSION_SUCCESS
            })
          }
          return dispatch({
            type: FETCH_SESSION_FAILURE,
            payload: resp.msg,
          });
        });
      });
    } catch (e) {
      return dispatch(sessionFailure('Something went wrong'))
    }
  }
}
