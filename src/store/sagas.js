import {all, fork, takeEvery} from 'redux-saga/effects';
import {networkSaga} from 'react-native-offline';
import TYPES from './types';
import {
  asyncRequestFindUserById,
  asyncRequestValidateUser,
} from './ducks/UserDuck';
import {
  asyncRequestCreatePost,
  asyncRequestFindPosts,
  asyncRequestUpdatePost,
} from './ducks/PostsDuck';

export default function* root() {
  yield all([
    takeEvery(TYPES.REQUEST_FIND_USER_BY_ID, asyncRequestFindUserById),
    takeEvery(TYPES.REQUEST_CREATE_POST, asyncRequestCreatePost),
    takeEvery(TYPES.REQUEST_FIND_POSTS, asyncRequestFindPosts),
    takeEvery(TYPES.REQUEST_VALIDATE_USER, asyncRequestValidateUser),
    takeEvery(TYPES.REQUEST_UPDATE_POST, asyncRequestUpdatePost),
    fork(networkSaga),
  ]);
}
