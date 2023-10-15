'use client'

import { type FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useCreateNoteMutation, useGetNoteListByIdQuery, useUpdateNoteMutation } from '@/store/api/note.api'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { MainLoader } from '../ui/main-loader'
import { Textarea } from '../ui/textarea'

interface NoteFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isEditable?: boolean
}

const noteSchema = z.object({
  text: z.string().max(160).min(4),
})

type NoteFormValues = z.infer<typeof noteSchema>


export const NoteForm: FC<NoteFormProps> = ({ isEditable }) => {
  const { id } = useParams();
  const { data: note, isLoading: isNoteLoading } = useGetNoteListByIdQuery(id as string, {
    skip: !isEditable || !id
  })


  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    mode: 'onChange',
    defaultValues: {
      text: ''
    }
  })

  useEffect(() => {
    if (note) {
      form.setValue('text', note.text);
    }
  }, [form, note]);



  const [createNote, { isLoading }] = useCreateNoteMutation()
  const [updateNote] = useUpdateNoteMutation()

  async function onSubmit(data: NoteFormValues) {
    if (isEditable && note) {
      console.log({ ...data, id: note.id })
      await updateNote({ ...data, id: note.id })
      return;
    }
    await createNote(data)
    form.reset({
      text: '',
    })
  }
  if (isNoteLoading) {
    return <MainLoader />
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditable ? 'Edit' : 'Create'}Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />} Submit{' '}
        </Button>
      </form>
    </Form>
  )
}
