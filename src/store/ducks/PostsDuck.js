import {createAction, createReducer} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {findPostsByUser, createPost} from '../../services/GoRestService';
import {failureFindUserById} from './UserDuck';

export const requestCreatePost = createAction(TYPES.REQUEST_CREATE_POST);
export const successCreatePost = createAction(TYPES.SUCCESS_CREATE_POST);
export const failureCreatePost = createAction(TYPES.FAILURE_CREATE_POST);
export const requestFindPosts = createAction(TYPES.REQUEST_FIND_POSTS);
export const successFindPosts = createAction(TYPES.SUCCESS_FIND_POSTS);
export const failureFindPosts = createAction(TYPES.FAILURE_FIND_POSTS);

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
};

const createPostReducers = {
  [TYPES.REQUEST_CREATE_POST]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_CREATE_POST]: (state, action) => {
    state.error = false;
    state.loading = false;
    state.data.push(action.payload.data);
  },
  [TYPES.FAILURE_CREATE_POST]: (state) => {
    state.error = true;
    state.loading = false;
  },
};

const findPostsReducers = {
  [TYPES.REQUEST_FIND_POSTS]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_FIND_POSTS]: (_, action) => {
    return {
      error: false,
      loading: false,
      data: action.payload.data,
    };
  },
  [TYPES.FAILURE_FIND_POSTS]: (state) => {
    state.error = true;
    state.loading = false;
  },
};

export default createReducer(INITIAL_STATE, {
  ...createPostReducers,
  ...findPostsReducers,
});

export function* asyncRequestCreatePost(action) {
  try {
    const {userId, title, body} = action.payload;
    const response = yield call(createPost, {userId, title, body});
    yield put(successCreatePost({data: response.data?.data || {}}));
  } catch (err) {
    console.log(err);
    yield put(failureFindUserById());
  }
}

export function* asyncRequestFindPosts(action) {
  try {
    const response = yield call(findPostsByUser, action.payload.id);
    yield put(successFindPosts({data: response.data?.data}));
  } catch (err) {
    console.log(err);
    yield put(failureFindPosts());
  }
}
