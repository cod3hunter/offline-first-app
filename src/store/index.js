import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import users from './ducks/UsersDuck';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  users,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

sagaMiddleware.run(rootSagas);

const persistor = persistStore(store);

export { persistor, store };
