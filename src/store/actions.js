import {createAction} from '@reduxjs/toolkit';
import TYPES from './types';

export const logoutUser = createAction(TYPES.LOGOUT_USER);
