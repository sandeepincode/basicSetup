import update from 'immutability-helper';
import axios from 'axios';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const UPDATE_EMAIL = 'updateEmail/login/prime';
export const UPDATE_PASSWORD = 'updatePassword/login/prime';
export const FETCH_LOGIN_REQUEST = 'fetchLoginRequest/login/prime';
export const FETCH_LOGIN_FAILURE = 'fetchLoginFailure/login/prime';
export const FETCH_LOGIN_SUCCESS = 'fetchLoginSuccess/login/prime';
export const LOGOUT = 'logout/login/prime';

const initialState = {
  ui: {
    loading: false,
    error: '',
  },
  data: {
    email: '',
    password: '',
  },
};

export default function loginReducer(state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_EMAIL: {
      return update(state, {
        data: { email: { $set: payload } },
      });
    }
    case UPDATE_PASSWORD: {
      return update(state, {
        data: { password: { $set: payload } },
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
      return { ...initialState };
    }
    case LOGOUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

export const updateEmail = simpleAction(UPDATE_EMAIL);
export const updatePassword = simpleAction(UPDATE_PASSWORD);

const loginFailure = simpleAction(FETCH_LOGIN_FAILURE);

export function submitLogin() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });

    const {
      email,
      password,
    } = getState().login.data;

    try {
      const response = await axios.post('/prime/api/login', {
        email,
        password,
      });

      if (response.data.error) {
        return dispatch(loginFailure(response.data.error));
      }
      dispatch(push('/prime'));
      return dispatch({
        type: FETCH_LOGIN_SUCCESS,
      });
    } catch (e) {
      return dispatch(loginFailure('Something went wrong'));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    axios.get('/prime/api/logout');
    dispatch(push('/prime/login'));
    dispatch({ type: LOGOUT });
  };
}
