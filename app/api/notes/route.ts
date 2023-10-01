import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/lib/authOptions'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const page_str = request.nextUrl.searchParams.get('page')
  const limit_str = request.nextUrl.searchParams.get('limit')

  const page = page_str ? parseInt(page_str, 10) : 1
  const limit = limit_str ? parseInt(limit_str, 10) : 10
  const skip = (page - 1) * limit

  const notes = await db.note.findMany({
    skip,
    take: limit,
  })
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const user = await getServerSession(authOptions)

    const note = await db.note.create({
      data: { ...json, userId: user?.user.id },
    })

    let json_response = {
      status: 'success',
      data: note,
    }
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
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
