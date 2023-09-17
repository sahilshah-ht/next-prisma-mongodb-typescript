"use client"
import Sidebar, { SidebarItem } from "@/components/ui/sidebar"
import SiteNav from "@/components/ui/site-nav"
import { RootState } from "@/store"
import { LayoutDashboard } from "lucide-react"
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
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
      </Sidebar>
      <div className={`${isOpen ? 'pl-60' : 'pl-16'} transition-all`}>
        {children}
      </div>
    </div>
  )
}
