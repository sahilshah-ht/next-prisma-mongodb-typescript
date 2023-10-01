import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!session) {
    return NextResponse.json(
      { error: 'You must be logged in.' },
      { status: 500 },
    )
  }
  return NextResponse.next()
}

export const config = { matcher: ['/api/notes'] }
