import update from 'immutability-helper';
import axios from 'axios';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const UPDATE_LOGEMAIL = 'updateLogEmail/login/shift';
export const UPDATE_LOGPASSWORD = 'updateLogPassword/login/shift';

export const FETCH_LOGIN_REQUEST = 'fetchLoginRequest/login/shift';
export const FETCH_LOGIN_FAILURE = 'fetchLoginFailure/login/shift';
export const FETCH_LOGIN_SUCCESS = 'fetchLoginSuccess/login/shift';

export const LOGOUT = 'logout/login/shift';

const initialState = {
  ui: {
    loading: false,
    error: '',
  },
  data: {
    logemail: '',
    logpassword: '',
  }
};

export default function loginReducer(state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_LOGEMAIL: {
      return update(state, {
        ui: {
          error: { $set: '' },
        },
        data: {
          logemail: { $set: payload },
        },
      });
    }
    case UPDATE_LOGPASSWORD: {
      return update(state, {
        ui: {
          error: { $set: '' },
        },
        data: {
          logpassword: { $set: payload },
        },
      });
    }
    case FETCH_LOGIN_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
          error: { $set: '' },
        },
      });
    }
    case FETCH_LOGIN_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
          error: { $set: payload },
        },
      });
    }
    case FETCH_LOGIN_SUCCESS: {
      return {...initialState};
    }
    case LOGOUT: {
      return {...initialState};
    }
  }
  return state;
}

const loginFailure = simpleAction(FETCH_LOGIN_FAILURE);
export const updateLogEmail = simpleAction(UPDATE_LOGEMAIL);
export const updateLogPassword = simpleAction(UPDATE_LOGPASSWORD);

export function submitLogin() {
  return async (dispatch, getState) => {
    dispatch({type: FETCH_LOGIN_REQUEST});

    const {
      logemail,
      logpassword,
    } = getState().login.data;

    try {
      const resp = await axios.post('/api/login', {
        data: {
          logemail,
          logpassword,
        },
        withCredentials: true,
      });
      if (resp.data.error) {
        return dispatch(loginFailure(resp.data.error));
      } else {
        if(resp.response === 1){
          dispatch('/shift');
          return dispatch({
            type: FETCH_LOGIN_SUCCESS
          })
        }
        return dispatch({
          type: FETCH_LOGIN_FAILURE,
          payload: resp.data.msg,
        });
      }
    } catch (e) {
      return dispatch(loginFailure('Something went wrong'))
    }
  }
}

export function logout() {
  return async (dispatch) => {
    axios.get('/api/logout');
    dispatch(push('/shift/login'));
    dispatch({type: LOGOUT});
  }
}
