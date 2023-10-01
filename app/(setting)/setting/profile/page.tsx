import { getServerSession } from 'next-auth'

import { ProfileForm } from '@/components/ui/profile-form'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/authOptions'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
