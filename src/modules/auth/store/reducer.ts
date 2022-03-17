import { createSlice } from '@reduxjs/toolkit';
import { fetchCountry, queryOne } from '@modules/auth/store/action';
import Helper from '@config/helper';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    country: null,
    userLocation: null,
    network: null,
  } as authInitialState,
  extraReducers: {
    [queryOne.pending.type]: (state: any) => {
      state.loading = true;
    },
    [queryOne.rejected.type]: (state: any) => {
      state.loading = false;
    },
    [queryOne.fulfilled.type]: (state: any, action) => {
      state.loading = false;
    },
    [fetchCountry.fulfilled.type]: (state: any, action) => {
      state.country = action.payload;
    },
  },
  reducers: {
    storeUser: (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        if (action.payload.user.token) Helper.token = action.payload.user.token;
      }
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
  },
});

export const { storeUser, setNetwork } = auth.actions;
export default auth.reducer;

interface authInitialState {
  loading: boolean;
  country: any;
  userLocation: any;
  user: userInterface | null;
  network: any;
}

export interface userInterface {
  token: string;
  id: string;
  first_name: string;
  last_name: string;
}
