import { createSlice } from '@reduxjs/toolkit';

export const sharedReducer = createSlice({
  name: 'shared',
  initialState: {
    isLoading: false,
  } as ISharedState,
  extraReducers: {},
  reducers: {},
});

export default sharedReducer.reducer;

interface ISharedState {
  isLoading: boolean;
}
