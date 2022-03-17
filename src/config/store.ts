import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from '@modules/auth/store/reducer';

const nav = (state = {}) => state;
const store = configureStore({
  reducer: { nav, auth },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
