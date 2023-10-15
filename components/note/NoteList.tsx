'use client'

import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteNoteMutation, useGetNoteListQuery } from '@/store/api/note.api'

import { Button } from '../ui/button'
import { MainLoader } from '../ui/main-loader'

export const NoteList = () => {
  const { data: notes, isLoading } = useGetNoteListQuery();
  const [deleteNote] = useDeleteNoteMutation()
  if (isLoading) {
    return <MainLoader />
  }
  const handleDelete = async (id: string) => {
    await deleteNote(id)
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>id</TableHead>
            <TableHead>text</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes?.map((note) => (
            <TableRow key={note.id}>
              <TableCell className='font-medium'>{note.id}</TableCell>
              <TableCell>{note.text}</TableCell>
              <TableCell className='text-right'>
                <Link href={`/notes/${note.id}`} >Edit</Link>
                <Button onClick={() => handleDelete(note.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
