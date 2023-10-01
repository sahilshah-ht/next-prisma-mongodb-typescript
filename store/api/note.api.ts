import { api } from './ServerApi'

import type { Note } from '@prisma/client'


export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNoteList: builder.query<Note[], void>({
      query: () => ({
        url: '/notes',
        method: 'GET',
      }),
      providesTags: [],
    }),
    createNote: builder.mutation<Note, { text: string }>({
      query: (note) => ({
        url: '/notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
  }),
})

export const { useGetNoteListQuery, useCreateNoteMutation } = noteApi
