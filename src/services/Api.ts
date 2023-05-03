/*************************************************
 * Country Explorer
 * @exports
 * Api.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

type ApiError = {
  data: {message: string; status: number};
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://restcountries.com/v3.1/',
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export function isErrorWithMessage(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data != null &&
    'message' in error.data
  );
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
