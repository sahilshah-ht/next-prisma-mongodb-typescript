import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/authOptions'
import { createNoteEntry, getNotes } from '@/lib/note';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const page_str = request.nextUrl.searchParams.get('page')
    const limit_str = request.nextUrl.searchParams.get('limit')
    const page = page_str ? parseInt(page_str, 10) : 1
    const limit = limit_str ? parseInt(limit_str, 10) : 20
    const skip = (page - 1) * limit
    const session = await getServerSession(authOptions)
    const notes = await getNotes({ skip, limit, userId: session?.user.id as string })
    return NextResponse.json(notes, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await getServerSession(authOptions);
    const note = await createNoteEntry({ ...body, userId: user?.user.id });
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });;
  }
}