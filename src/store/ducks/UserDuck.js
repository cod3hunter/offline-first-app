import {createAction, createReducer, createSelector} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import TYPES from '../types';
import {findUserById} from '../../services/GoRestService';
import {reset} from '../../services/NavigationService';
import {setAppLoading} from '../actions';

export const requestFindUserById = createAction(TYPES.REQUEST_FIND_USER_BY_ID);
export const successFindUserById = createAction(TYPES.SUCCESS_FIND_USER_BY_ID);
export const failureFindUserById = createAction(TYPES.FAILURE_FIND_USER_BY_ID);
export const requestValidateUser = createAction(TYPES.REQUEST_VALIDATE_USER);
export const successValidateUser = createAction(TYPES.SUCCESS_VALIDATE_USER);
export const failureValidateUser = createAction(TYPES.FAILURE_VALIDATE_USER);

const INITIAL_STATE = {
  data: {},
  error: null,
  loading: false,
};

const findUserByIdReducers = {
  [TYPES.REQUEST_FIND_USER_BY_ID]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_FIND_USER_BY_ID]: (state, action) => {
    state.loading = false;
    state.data = action.payload.data;
    state.error = null;
  },
  [TYPES.FAILURE_FIND_USER_BY_ID]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
};

const validateUserReducers = {
  [TYPES.REQUEST_VALIDATE_USER]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_VALIDATE_USER]: (state, action) => {
    state.loading = false;
  },
  [TYPES.FAILURE_VALIDATE_USER]: (state) => {
    state.loading = false;
    state.data = {};
  },
};

const logoutUserReducers = {
  [TYPES.LOGOUT_USER]: () => {
    return INITIAL_STATE;
  },
};

export default createReducer(INITIAL_STATE, {
  ...findUserByIdReducers,
  ...validateUserReducers,
  ...logoutUserReducers,
});

const userIdSelector = createSelector(
  (state) => state.user.data,
  (user) => user?.id,
);

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
    console.log(err);
    yield put(
      failureFindUserById({
        error: err.message,
      }),
    );
  }
}

export function* asyncRequestValidateUser(action) {
  try {
    const response = yield call(findUserById, action.payload.id);
    const responseUserData = response.data?.data;
    const currentUserId = yield select(userIdSelector);
    if (responseUserData?.id && responseUserData.id === currentUserId) {
      yield put(successValidateUser());
      yield put(setAppLoading(false));
      return reset({routes: [{name: 'Posts'}]});
    }
    yield put(failureValidateUser());
  } catch (err) {
    console.log(err);
    yield put(failureValidateUser());
  }
}
