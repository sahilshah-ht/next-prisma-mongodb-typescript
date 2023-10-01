'use client'

import { SessionProvider } from 'next-auth/react'
import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper'
import { Provider } from 'react-redux'
import store from '@/store'

export interface AuthContextProps {
  children: React.ReactNode
}

export default function AuthContext({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ProtectedRouteWrapper>{children}</ProtectedRouteWrapper>
      </Provider>
    </SessionProvider>
  )
}
