import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { deleteNoteById, getNoteById, updateNoteById } from '@/lib/note';

import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    const note = await getNoteById(id);
    return NextResponse.json(note, { status: 200 })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } },) {
  try {
    const id = params.id;
    let body = await request.json()
    const session = await getServerSession(authOptions);
    const res = await updateNoteById(body, session?.user.id as string, id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } },) {
  try {
    const id = params.id;
    const session = await getServerSession(authOptions);
    const res = await deleteNoteById(session?.user.id as string, id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
