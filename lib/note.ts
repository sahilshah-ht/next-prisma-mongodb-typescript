
import { db } from '@/lib/db'

import type { Note } from '@prisma/client'


export const createNoteEntry = async (data: Note) => {
    try {
        return await db.note.create({
            data,
        })
    } catch (error) {
        throw error;
    }
}

export const getNotes = async ({ skip, limit, userId }: {
    skip: number,
    limit: number,
    userId: string
}) => {
    try {
        return db.note.findMany({
            skip,
            take: limit,
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }

        })
    } catch (error) {
        throw error;
    }
}

export const getNoteById = async (noteId: string) => {
    try {
        return db.note.findUnique({
            where: {
                id: noteId,
            },
        })
    } catch (error) {
        throw error;
    }
}

export const updateNoteById = async (data: Note, userId: string, id: string) => {
    try {
        return db.note.update({
            where: { id, userId },
            data,
        });
    } catch (error) {
        throw error;
    }
}

export const deleteNoteById = async (userId: string, id: string) => {
    try {
        return db.note.delete({
            where: { id, userId },
        })

    } catch (error) {
        throw error;
    }
}