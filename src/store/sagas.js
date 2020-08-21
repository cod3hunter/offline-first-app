import {takeLatest, all} from 'redux-saga/effects';
import TYPES from './types';
import {
  asyncRequestFindUserById,
  asyncRequestValidateUser,
} from './ducks/UserDuck';
import {asyncRequestCreatePost, asyncRequestFindPosts} from './ducks/PostsDuck';

export default function* root() {
  yield all([
    takeLatest(TYPES.REQUEST_FIND_USER_BY_ID, asyncRequestFindUserById),
    takeLatest(TYPES.REQUEST_CREATE_POST, asyncRequestCreatePost),
    takeLatest(TYPES.REQUEST_FIND_POSTS, asyncRequestFindPosts),
    takeLatest(TYPES.REQUEST_VALIDATE_USER, asyncRequestValidateUser),
  ]);
}
