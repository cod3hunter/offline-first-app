import { takeLatest, all } from 'redux-saga/effects';
import TYPES from './types';
import { asyncFetchUsers } from './ducks/UsersDuck';


export default function* root() {
  yield all([
    takeLatest(TYPES.REQUEST_FETCH_USERS, asyncFetchUsers),
  ]);
}
