import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '@config/client';
import { API_ONE, STRIPE_KEY_API } from '@config/api';
import Helper from '@config/helper';

const axiosCall = axios.CancelToken.source();

export const queryOne = createAsyncThunk('auth/queryOne', async () => {
  return client()
    .get(API_ONE)
    .then((res) => res.data)
    .catch((e) => Helper.returnError(e));
});

export const fetchCountry = createAsyncThunk('auth/fetchCountry', async () => {
  setTimeout(() => {
    axiosCall.cancel(`Timeout of 5000ms exceeded`);
  }, 5000);
  return client()
    .get('http://ip-api.com/json', {
      timeout: 5000,
      cancelToken: axiosCall.token,
    })
    .then((res) => res.data)
    .catch((error) => Helper.returnError(error));
});

export const fetchStripeKey = async () => {
  setTimeout(() => {
    axiosCall.cancel(`Timeout of 5000ms exceeded`);
  }, 5000);
  return client()
    .get(STRIPE_KEY_API, { timeout: 5000, cancelToken: axiosCall.token })
    .then((res) => '')
    .catch(() => false);
};
