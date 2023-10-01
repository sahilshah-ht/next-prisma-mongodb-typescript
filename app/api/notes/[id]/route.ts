import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const note = await db.note.findUnique({
    where: {
      id,
    },
  })

  if (!note) {
    let error_response = {
      status: 'fail',
      message: 'No Note with the Provided ID Found',
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let json_response = {
    status: 'success',
    data: {
      note,
    },
  }
  return NextResponse.json(json_response)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    let json = await request.json()

    const updated_note = await db.note.update({
      where: { id },
      data: json,
    })

    let json_response = {
      status: 'success',
      data: {
        note: updated_note,
      },
    }
    return NextResponse.json(json_response)
  } catch (error: any) {
    if (error.code === 'P2025') {
      let error_response = {
        status: 'fail',
        message: 'No Note with the Provided ID Found',
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let error_response = {
      status: 'error',
      message: error.message,
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    await db.note.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      let error_response = {
        status: 'fail',
        message: 'No Note with the Provided ID Found',
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let error_response = {
      status: 'error',
      message: error.message,
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
