import { NetInfoState } from '@react-native-community/netinfo';
import { createSlice, Draft } from '@reduxjs/toolkit';
import { fetchCountry, queryOne } from '@modules/auth/store/action';

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
  } as IAuthState,
  extraReducers: {
    [queryOne.pending.type]: (state: IAuthState) => {
      state.isLoading = true;
    },
    [queryOne.rejected.type]: (state: IAuthState) => {
      state.isLoading = false;
    },
    [queryOne.fulfilled.type]: (state: IAuthState) => {
      state.isLoading = false;
    },
    [fetchCountry.fulfilled.type]: (state: IAuthState, action) => {
      state.countryData = action.payload;
    },
  },
  reducers: {
    setNetwork: (state: Draft<IAuthState>, action) => {
      state.network = action.payload;
    },
  },
});

export const { setNetwork } = authReducer.actions;
export default authReducer.reducer;

interface IAuthState {
  isLoading: boolean;
  user: IUser;
  network: NetInfoState;
  countryData: {
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    zip: string,
    lat: number,
    lon: number,
    timezone: string,
  };
}

export interface IUser {
  token: string;
  id: string;
  firstName: string;
  lastLame: string;
  email: string;
  phoneNumber: string;
}
