import {createAction, createReducer} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {findUserById} from '../../services/GoRestService';

export const requestFindUserById = createAction(TYPES.REQUEST_FIND_USER_BY_ID);
export const successFindUserById = createAction(TYPES.SUCCESS_FIND_USER_BY_ID);
export const failureFindUserById = createAction(TYPES.FAILURE_FIND_USER_BY_ID);

const INITIAL_STATE = {
  data: {},
  error: false,
  loading: false,
};

export default createReducer(INITIAL_STATE, {
  [TYPES.REQUEST_FIND_USER_BY_ID]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_FIND_USER_BY_ID]: (_, action) => {
    return {
      loading: false,
      data: action.payload.data,
      error: false,
    };
  },
  [TYPES.FAILURE_FIND_USER_BY_ID]: (state) => {
    state.loading = false;
    state.error = true;
  },
});

export function* asyncRequestFindUserById(action) {
  try {
    const response = yield call(findUserById, action.payload.id);
    yield put(successFindUserById({data: response.data?.data || {}}));
  } catch (err) {
    console.log(err);
    yield put(failureFindUserById());
  }
}
