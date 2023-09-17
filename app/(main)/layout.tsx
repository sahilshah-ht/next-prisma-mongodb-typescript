"use client"
import SiteNav from "@/components/ui/site-nav"
import { RootState } from "@/store"
import { useSelector } from "react-redux"

interface MainLayoutProps {
  children: React.ReactNode
}
export default function MainLayout({
  children,
}: MainLayoutProps) {
  const { isOpen } = useSelector((state: RootState) => state.ui.sidebar)
  return (
    <div>
      <SiteNav />
      <div className={`${isOpen ? 'pl-72' : 'pl-16'}`}>
        {children}
      </div>
    </div>
  )
}
