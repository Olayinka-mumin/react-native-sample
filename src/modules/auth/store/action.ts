import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_ONE, STRIPE_KEY_API } from '@config/api';
import { returnError } from '@config/helpers';

export const queryOne = createAsyncThunk(
  'auth/queryOne',
  async () => {
    try {
      const response = await axios.post(API_ONE);
      return response.data;
    } catch (e) {
      throw returnError(e as AxiosError);
    }
  },
);

export const fetchCountry = createAsyncThunk(
  'auth/fetchCountry',
  async () => {
    try {
      const response = await axios.get('http://ip-api.com/json');
      return response.data;
    } catch (e) {
      throw returnError(e as AxiosError);
    }
  },
);

export const fetchStripeKey = async () => {
  try {
    await axios.get(STRIPE_KEY_API);
    return '';
  } catch (e) {
    return undefined;
  }
};
