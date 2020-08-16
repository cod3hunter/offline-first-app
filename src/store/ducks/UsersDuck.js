import {createAction, createReducer} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {getAllUsers, createUser} from '../../services/GoRestService';

export const requestFetchUsers = createAction(TYPES.REQUEST_FETCH_USERS);
export const successFetchUsers = createAction(TYPES.SUCCESS_FETCH_USERS);
export const failureFetchUsers = createAction(TYPES.FAILURE_FETCH_USERS);

export const requestCreateUser = createAction(TYPES.REQUEST_CREATE_USER);
export const successCreateUser = createAction(TYPES.SUCCESS_CREATE_USER);
export const failureCreateUser = createAction(TYPES.FAILURE_CREATE_USER);

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
};

export default createReducer(INITIAL_STATE, {
  [TYPES.REQUEST_FETCH_USERS]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_FETCH_USERS]: (_, action) => {
    return {
      loading: false,
      data: [...action.payload.data],
      error: false,
    };
  },
  [TYPES.FAILURE_FETCH_USERS]: (state) => {
    state.loading = false;
    state.error = true;
  },
  [TYPES.REQUEST_CREATE_USER]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_CREATE_USER]: (state, action) => {
    state.error = false;
    state.loading = false;
    state.data.push(action.data);
  },
  [TYPES.FAILURE_CREATE_USER]: (state) => {
    state.loading = false;
    state.error = true;
  },
});

export function* asyncFetchUsers() {
  try {
    const response = yield call(getAllUsers);
    yield put(successFetchUsers({data: response.data?.data || []}));
  } catch (err) {
    console.log(err);
    yield put(failureFetchUsers());
  }
}

const normalizedData = (entryData) => {
  const outData = {};
  Object.keys(entryData).forEach((key) => {
    outData[key] = entryData[key].value;
  });
  return outData;
};

export function* asyncCreateUser(action) {
  try {
    const data = normalizedData(action.form);
    const response = yield call(createUser, data);
    yield put(successCreateUser({data: response.data?.result || {}}));
  } catch (err) {
    yield put(failureCreateUser());
  }
}
