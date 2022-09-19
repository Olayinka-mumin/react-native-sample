import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import auth from '@modules/auth/store/reducer';
import shared from '@shared/store/reducer';

export type IReducerNames = 'auth' | 'shared';

const reducers = combineReducers({
  auth,
  shared,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

interface ITestReduxProvider {
  children: React.ReactNode;
}
export const TestReduxProvider = ({ children }: ITestReduxProvider) => (
  <Provider store={store}>{children}</Provider>
);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persist = persistStore(store);
