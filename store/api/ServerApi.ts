import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const baseUrl = 'http://localhost:3000'

const apiURL = `${baseUrl}/api`

export const baseQuery = fetchBaseQuery({
  baseUrl: apiURL,
  prepareHeaders: (headers, { getState }) => {
    //   const { token } = (getState() as RootState).auth;
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
}) as BaseQueryFn<string | FetchArgs>

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Note'],
  endpoints: (builder) => ({}),
})
