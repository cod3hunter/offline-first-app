import {
  offlineActionCreators,
  checkInternetConnection,
  createNetworkMiddleware,
} from 'react-native-offline';
import TYPES from './types';
import {handleMetaNavigation} from '../services/utils';
import {requestCreatePost, deletePost} from './ducks/PostsDuck';

export const handleRequestUpdatePost = ({dispatch, state, action}) => {
  const {title, body, id} = action.payload;
  const userId = state.user.data.id;
  const enqueuedAction = state.network.actionQueue.find(
    (act) => act.payload.id === id,
  );
  dispatch(deletePost({id}));
  dispatch(offlineActionCreators.removeActionFromQueue(enqueuedAction));
  dispatch(requestCreatePost({title, body, userId}));
};

export const handleOfflineActionsMiddleware = (actionTypes) => (store) => (
  next,
) => async (action) => {
  try {
    if (!actionTypes.includes(action.type)) {
      return next(action);
    }
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      return next(action);
    }
    const state = store.getState();
    const dispatch = store.dispatch;
    if (action.type === TYPES.REQUEST_UPDATE_POST && action.payload?.id < 0) {
      return handleRequestUpdatePost({action, state, dispatch});
    }
    handleMetaNavigation(action.meta);
    if (action.meta.retry) {
      action.meta.queued = true;
    }
    return next(action);
  } catch (error) {
    console.log(error);
    next(action);
  }
};

const createOfflineMiddleware = ({actionTypes}) => {
  return {
    handleOfflineActionsMiddleware: handleOfflineActionsMiddleware(actionTypes),
    networkMiddleware: createNetworkMiddleware({actionTypes}),
  };
};

export default createOfflineMiddleware;
