import { api } from './ServerApi'

import type { Note } from '@prisma/client'


export const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNoteList: builder.query<Note[], void>({
      query: () => ({
        url: '/notes',
        method: 'GET',
      }),
      providesTags: ['Note'],
    }),
    createNote: builder.mutation<Note, { text: string }>({
      query: (note) => ({
        url: '/notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    getNoteListById: builder.query<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'GET',
      }),
      providesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, { text: string, id: string }>({
      query: ({ id, ...note }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
})

export const { useGetNoteListQuery, useCreateNoteMutation, useGetNoteListByIdQuery, useUpdateNoteMutation, useDeleteNoteMutation } = noteApi
