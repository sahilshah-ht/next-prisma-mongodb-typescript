import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import type {
  BaseQueryFn,
  FetchArgs
} from '@reduxjs/toolkit/query/react';

const apiURL = `/api`

export const baseQuery = fetchBaseQuery({
  baseUrl: apiURL,
}) as BaseQueryFn<string | FetchArgs>

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Note'],
  endpoints: () => ({}),
})
