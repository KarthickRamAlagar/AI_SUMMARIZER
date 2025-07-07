import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = '8ec018f852mshcb40010aafa9503p110fbdjsnfee51884fe02'

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', rapidApiKey)
      headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=5`,
    }),
  }),
})

// ✅ This must match the endpoint name exactly
export const { useLazyGetSummaryQuery } = articleApi
