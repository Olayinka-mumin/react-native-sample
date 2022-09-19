/**
 *  Abdul Mumin Olayinka
 *
 * Configure axios to automatically add baseUrl and authorization to required api request
 */

import axios from 'axios';
import { env } from '@config/constants';
import store from '@config/store';

axios.defaults.baseURL = env.BASE_URL;
axios.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.user?.token;
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
);
