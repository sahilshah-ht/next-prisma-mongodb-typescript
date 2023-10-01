import { getServerSession } from 'next-auth/next'

import { db } from '@/lib/db'

import { authOptions } from './authOptions'

export const currentProfile = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    return;
  }

  const profile = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  })

  return profile
}
