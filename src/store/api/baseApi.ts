/**
 * Base API Configuration with RTK Query
 */

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENV from '../../config/env';
import type {RootState} from '../index';

const baseQuery = fetchBaseQuery({
  baseUrl: `${ENV.API_BASE_URL}/${ENV.API_VERSION}`,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Restaurant',
    'Order',
    'Menu',
    'Inventory',
    'Employee',
    'QR',
    'Media',
    'Reward',
    'Analytics',
  ],
  endpoints: () => ({}),
});

