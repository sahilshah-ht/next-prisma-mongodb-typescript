"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className='p-4'>
      <p>{session?.user?.email}</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}
