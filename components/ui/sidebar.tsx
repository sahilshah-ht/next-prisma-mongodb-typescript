'use client'
import React, { useContext, createContext, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState, toggleSidebar, useAppDispatch } from '@/store'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button'
import { usePathname } from 'next/navigation'
import { ActionTooltip } from './action-tooltip'

interface SidebarContextType {
  isOpen: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export default function Sidebar({
  children,
  className,
}: SidebarProps): JSX.Element {
  const { isOpen } = useSelector((state: RootState) => state.ui.sidebar)
  const dispatch = useAppDispatch()

  const sidebarClasses = `h-full flex flex-col border-r shadow-sm relative ${className}`

  return (
    <div className='fixed z-20'>
      <aside className='h-screen'>
        <nav className={sidebarClasses}>
          <SidebarContext.Provider value={{ isOpen }}>
            <ul className='flex flex-1 flex-col gap-3 px-3'>{children}</ul>
          </SidebarContext.Provider>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className='absolute -right-3.5 top-4 rounded-full border bg-background p-0.5'
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </nav>
      </aside>
    </div>
  )
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  item: {
    href: string
    title: string
    icon: JSX.Element
  }
}

export function SidebarItem({ item }: SidebarItemProps): JSX.Element {
  const { isOpen } = useContext(SidebarContext) || { isOpen: true }
  const pathname = usePathname()

  const linkClasses = cn(
    buttonVariants({ variant: 'ghost' }),
    pathname === item.href ? 'bg-muted hover:bg-muted' : '',
    'justify-start relative transition-colors group',
  )

  const linkContent = (
    <Link href={item.href} className={linkClasses}>
      {item.icon}
      <span
        className={`overflow-hidden transition-all ${
          isOpen ? 'ml-3 w-40' : 'w-0'
        }`}
      >
        {item.title}
      </span>
    </Link>
  )

  return (
    <li>
      {!isOpen ? (
        <ActionTooltip side='right' align='center' label={item.title}>
          {linkContent}
        </ActionTooltip>
      ) : (
        linkContent
      )}
    </li>
  )
}
