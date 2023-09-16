"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();
  return (
    <div className='p-4'>
      <p>{session?.user?.email}</p>
      <Button onClick={() => router.push('/setting')}>Setting</Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}
