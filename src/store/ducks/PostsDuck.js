import {createAction, createReducer} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {goBack} from '../../services/NavigationService';
import {generateId} from '../../services/utils';
import {failureFindUserById} from './UserDuck';
import {
  findPostsByUser,
  createPost,
  updatePost,
} from '../../services/GoRestService';

export const requestCreatePost = createAction(
  TYPES.REQUEST_CREATE_POST,
  function prepare({title, body, userId}) {
    return {
      payload: {
        title,
        body,
        userId,
        id: generateId(),
      },
    };
  },
);
export const successCreatePost = createAction(TYPES.SUCCESS_CREATE_POST);
export const failureCreatePost = createAction(TYPES.FAILURE_CREATE_POST);
export const requestFindPosts = createAction(TYPES.REQUEST_FIND_POSTS);
export const successFindPosts = createAction(TYPES.SUCCESS_FIND_POSTS);
export const failureFindPosts = createAction(TYPES.FAILURE_FIND_POSTS);
export const requestUpdatePost = createAction(TYPES.REQUEST_UPDATE_POST);
export const successUpdatePost = createAction(TYPES.SUCCESS_UPDATE_POST);
export const failureUpdatePost = createAction(TYPES.FAILURE_UPDATE_POST);

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
};

const createPostReducers = {
  [TYPES.REQUEST_CREATE_POST]: (state, action) => {
    state.loading = true;
    state.data.push({
      id: action.payload.id,
      body: action.payload.body,
      title: action.payload.title,
    });
  },
  [TYPES.SUCCESS_CREATE_POST]: (state, action) => {
    state.error = false;
    state.loading = false;
    state.data = state.data.map((post) =>
      post.id === action.payload.id ? action.payload : post,
    );
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
  [TYPES.SUCCESS_FIND_POSTS]: (state, action) => {
    state.error = false;
    state.loading = false;
    state.data = action.payload.data;
  },
  [TYPES.FAILURE_FIND_POSTS]: (state) => {
    state.error = true;
    state.loading = false;
  },
};

const updatePostReducers = {
  [TYPES.REQUEST_UPDATE_POST]: (state) => {
    state.loading = true;
  },
  [TYPES.SUCCESS_UPDATE_POST]: (state, action) => {
    state.error = false;
    state.loading = false;
    const updatedUserData = action.payload.data;
    state.data = state.data.map((post) => {
      if (post.id === updatedUserData.id) {
        return updatedUserData;
      }
      return post;
    });
  },
  [TYPES.FAILURE_UPDATE_POST]: (state) => {
    state.loading = false;
    state.error = true;
  },
};

export default createReducer(INITIAL_STATE, {
  ...createPostReducers,
  ...findPostsReducers,
  ...updatePostReducers,
  [TYPES.LOGOUT_USER]: (state) => {
    state.data = [];
  },
});

export function* asyncRequestCreatePost(action) {
  try {
    const {userId, title, body} = action.payload;
    const response = yield call(createPost, {userId, title, body});
    const code = response.data?.code;
    if (code === 201) {
      yield put(successCreatePost({data: response.data?.data || {}}));
      return goBack();
    }
    yield put(failureFindPosts());
  } catch (err) {
    console.log(err);
    yield put(failureFindUserById());
  }
}

export function* asyncRequestFindPosts(action) {
  try {
    const response = yield call(findPostsByUser, action.payload.userId);
    yield put(successFindPosts({data: response.data?.data}));
  } catch (err) {
    console.log(err);
    yield put(failureFindPosts());
  }
}

export function* asyncRequestUpdatePost(action) {
  try {
    const {postId, title, body} = action.payload;
    const response = yield call(updatePost, {postId, title, body});
    const code = response.data?.code;
    if (code === 200) {
      yield put(successUpdatePost({data: response.data?.data}));
      return goBack();
    }
    yield put(failureUpdatePost());
  } catch (err) {
    console.log(err);
    yield put(failureUpdatePost());
  }
}
