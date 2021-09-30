import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_SERVER } from '../utils/constants.util';

const cryptoApiHeaders = Object({
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f5eaa604f5mshedf1e826ad03446p1f3a1djsnc58234d95b4c'
});

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_SERVER
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        }),
    })
});

export const { useGetCryptosQuery } = cryptoApi;