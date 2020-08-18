import {createAction, createReducer} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {findUserById} from '../../services/GoRestService';

export const requestFindUserById = createAction(TYPES.REQUEST_FIND_USER_BY_ID);
export const successFindUserById = createAction(TYPES.SUCCESS_FIND_USER_BY_ID);
export const failureFindUserById = createAction(TYPES.FAILURE_FIND_USER_BY_ID);

export const logoutUser = createAction(TYPES.LOGOUT_USER);

const INITIAL_STATE = {
  data: {},
  error: null,
  loading: false,
};

const findUserByIdReducers = {
  [TYPES.REQUEST_FIND_USER_BY_ID]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_FIND_USER_BY_ID]: (_, action) => {
    return {
      loading: false,
      data: action.payload.data,
      error: null,
    };
  },
  [TYPES.FAILURE_FIND_USER_BY_ID]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
};

const logoutUserReducers = {
  [TYPES.LOGOUT_USER]: (_, action) => {
    return INITIAL_STATE;
  },
};

export default createReducer(INITIAL_STATE, {
  ...findUserByIdReducers,
  ...logoutUserReducers,
});

export function* asyncRequestFindUserById(action) {
  try {
    const response = yield call(findUserById, action.payload.id);
    const userData = response.data?.data;
    if (userData?.id) {
      return yield put(successFindUserById({data: userData || {}}));
    }
    yield put(
      failureFindUserById({
        error: userData.message || 'failed to connect to the server',
      }),
    );
  } catch (err) {
    yield put(
      failureFindUserById({
        error: err.message,
      }),
    );
  }
}
