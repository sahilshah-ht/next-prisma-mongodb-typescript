import { NoteForm } from '@/components/note/NoteForm'

const CreateNote = () => {
    return (
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <NoteForm isEditable={true} />
        </div>
    )
}

export default CreateNote
