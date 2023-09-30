"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useCreateNoteMutation } from "@/store/api/note.api"

const noteSchema = z.object({
    text: z.string().max(160).min(4),
})

type NoteFormValues = z.infer<typeof noteSchema>


export function CreateNoteForm() {
    const form = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
        mode: "onChange",
    })

    const [createNote,{isLoading}] = useCreateNoteMutation();
   async function onSubmit(data: NoteFormValues) {
       await createNote(data);
       form.reset({
        text:''
       })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
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
                <Button type="submit" disabled={isLoading} >{isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )} Submit </Button>
            </form>
        </Form>
    )
}