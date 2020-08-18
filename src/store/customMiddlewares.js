import TYPES from './types';

export const createPostMiddleware = () => (next) => (action) => {
  if (action.type === TYPES.REQUEST_CREATE_POST) {
    action.payload.id = Math.floor(1000 + Math.random() * 9000) * -1;
  }
  next(action);
};
