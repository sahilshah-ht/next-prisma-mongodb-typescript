'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetNoteListQuery } from '@/store/api/note.api'

export const NoteList = () => {
  const { data: notes } = useGetNoteListQuery()
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>id</TableHead>
            <TableHead>text</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes?.map((note) => (
            <TableRow key={note.id}>
              <TableCell className='font-medium'>{note.id}</TableCell>
              <TableCell>{note.text}</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className='text-right'>$250.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
