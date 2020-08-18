import {takeLatest, all} from 'redux-saga/effects';
import TYPES from './types';
import {asyncRequestFindUserById} from './ducks/UserDuck';

export default function* root() {
  yield all([
    takeLatest(TYPES.REQUEST_FIND_USER_BY_ID, asyncRequestFindUserById),
  ]);
}
