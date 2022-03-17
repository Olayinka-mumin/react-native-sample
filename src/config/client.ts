/**
 *  Abdul Mumin Olayinka
 *
 * Configure axios to automatically add baseUrl and authorization to needed api request
 */

import axios from 'axios';
import Helper from '@config/helper';
import { BASE_URL, DEV_BASE_URL, SOCKET_BASE_URL, DEV_SOCKET_BASE_URL } from '@config/constant';

export let baseURL = BASE_URL;
export let socketBaseURL = SOCKET_BASE_URL;

if (__DEV__) {
  baseURL = DEV_BASE_URL;
  socketBaseURL = DEV_SOCKET_BASE_URL;
}

export default () => {
  const token = Helper.token;
  if (!token) return axios.create({ baseURL });
  return axios.create({
    baseURL,
    headers: { Authorization: 'Bearer ' + token },
  });
};
