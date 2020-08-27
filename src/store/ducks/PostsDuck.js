import {createAction, createReducer, createSelector} from '@reduxjs/toolkit';
import {offlineActionTypes} from 'react-native-offline';
import {call, put} from 'redux-saga/effects';
import TYPES from '../types';
import {
  generateId,
  handleMetaNavigation,
  getOfflineMeta,
  sortByTitle,
} from '../../services/utils';
import {
  findPostsByUser,
  createPost,
  updatePost,
} from '../../services/GoRestService';
import reactotron from 'reactotron-react-native';

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
      meta: getOfflineMeta({navigationMethod: 'goBack'}),
    };
  },
);
export const requestFindPosts = createAction(
  TYPES.REQUEST_FIND_POSTS,
  function prepare({userId}) {
    return {
      payload: {
        userId,
      },
      meta: getOfflineMeta({retry: false}),
    };
  },
);

export const requestUpdatePost = createAction(
  TYPES.REQUEST_UPDATE_POST,
  function prepare({title, body, id}) {
    return {
      payload: {
        title,
        body,
        id,
      },
      meta: getOfflineMeta({navigationMethod: 'goBack'}),
    };
  },
);

export const successCreatePost = createAction(TYPES.SUCCESS_CREATE_POST);
export const failureCreatePost = createAction(TYPES.FAILURE_CREATE_POST);
export const successFindPosts = createAction(TYPES.SUCCESS_FIND_POSTS);
export const failureFindPosts = createAction(TYPES.FAILURE_FIND_POSTS);
export const successUpdatePost = createAction(TYPES.SUCCESS_UPDATE_POST);
export const failureUpdatePost = createAction(TYPES.FAILURE_UPDATE_POST);
export const deletePost = createAction(TYPES.DELETE_POST);

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
    const {data, offlineId, queued} = action.payload;

    if (offlineId && queued) {
      state.data = state.data.map((post) =>
        post.id === offlineId ? data : post,
      );
    } else {
      state.data.push(action.payload.data);
    }
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
    reactotron.log('data', action.payload);
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
    const updatedPostData = action.payload.data;
    state.data = state.data.map((post) =>
      post.id === updatedPostData.id ? updatedPostData : post,
    );
  },
  [TYPES.FAILURE_UPDATE_POST]: (state) => {
    state.loading = false;
    state.error = true;
  },
};

const offlineReducers = {
  [offlineActionTypes.FETCH_OFFLINE_MODE]: (state, action) => {
    const {prevAction} = action.payload;
    switch (prevAction.type) {
      case TYPES.REQUEST_CREATE_POST:
        state.error = false;
        state.loading = false;
        state.data.push(prevAction.payload);
        break;
      case TYPES.REQUEST_UPDATE_POST:
        state.error = false;
        state.loading = false;
        reactotron.log('state', state);
        state.data = state.data.map((post) =>
          post?.id === prevAction.payload?.id ? prevAction.payload : post,
        );
    }
  },
};

const postsSelector = (state) => state.posts.data;

export const postListSelector = createSelector(postsSelector, (posts) =>
  [...posts].sort(sortByTitle),
);

export const postByIdSelector = (postId) =>
  createSelector(postsSelector, (posts) =>
    posts.find((post) => post.id === postId),
  );

export default createReducer(INITIAL_STATE, {
  ...createPostReducers,
  ...findPostsReducers,
  ...updatePostReducers,
  ...offlineReducers,
  [TYPES.LOGOUT_USER]: (state) => {
    state.data = [];
    state.error = false;
    state.loading = false;
  },
  [TYPES.DELETE_POST]: (state, action) => {
    state.data = state.data.filter((post) => post.id !== action.payload.id);
  },
});

export function* asyncRequestCreatePost(action) {
  try {
    const {userId, title, body, id} = action.payload;
    const response = yield call(createPost, {userId, title, body});
    const code = response.data?.code;
    if (code === 201) {
      yield put(
        successCreatePost({
          data: response.data?.data,
          offlineId: id < 0 ? id : null,
          queued: action.meta.queued,
        }),
      );
      return handleMetaNavigation(action.meta);
    }
    console.log('failure', response.data);
    yield put(failureCreatePost());
  } catch (err) {
    console.log('failure catch', err);
    yield put(failureCreatePost());
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
    const {id, title, body} = action.payload;
    const response = yield call(updatePost, {postId: id, title, body});
    const code = response.data?.code;
    if (code === 200) {
      yield put(successUpdatePost({data: response.data?.data}));
      return handleMetaNavigation(action.meta);
    }
    console.log('failure', response.data);
    yield put(failureUpdatePost());
  } catch (err) {
    console.log(err);
    yield put(failureUpdatePost());
  }
}
