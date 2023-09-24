"use client"

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect } from "react";

const NotesPage = () => {
    const getPosts = () => {
        axios.get('/api/notes')
            .then(() => { })
            .then((callback) => {

            })
            .catch(() => toast({ title: 'Something went wrong!' }))
            .finally(() => {
            })
    }
    useEffect(() => {
        getPosts();

        return () => {

        }
    }, [])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">Notes</div>
    );
}

export default NotesPage;