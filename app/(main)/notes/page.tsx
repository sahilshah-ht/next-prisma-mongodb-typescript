import Link from "next/link";

import { NoteList } from "@/components/note/NoteList";

const NotesPage = () => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div>Notes</div>
            <Link href='/notes/create'>Create</Link>
            <NoteList />
        </div>
    );
}

export default NotesPage;