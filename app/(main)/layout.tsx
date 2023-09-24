"use client"
import { Separator } from "@/components/ui/separator"
import Sidebar, { SidebarItem } from "@/components/ui/sidebar"
import SiteNav from "@/components/ui/site-nav"
import { RootState } from "@/store"
import { BarChart3, Boxes, LayoutDashboard, LifeBuoy, Package, PackagePlus, Receipt, Settings, UserCircle } from "lucide-react"
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
      <Sidebar className="pt-2" >
        <SidebarItem item={{
          icon: <LayoutDashboard size={20} />,
          title: "Dashboard",
          href: '/'
        }} />
        <SidebarItem item={{
          icon: <PackagePlus size={20} />,
          title: "Notes",
          href: '/notes'
        }} />
        <SidebarItem item={{
          icon: <BarChart3 size={20} />,
          title: "Users",
          href: '/Users'
        }} />
        <SidebarItem item={{
          icon: <UserCircle size={20} />,
          title: "Inventory",
          href: '/Inventory'
        }} />
        <Separator />
        <SidebarItem item={{
          icon: <Boxes size={20} />,
          title: "Orders",
          href: '/Orders'
        }} />
        <SidebarItem item={{
          icon: <Package size={20} />,
          title: "Billings",
          href: '/Billings'
        }} />
        <SidebarItem item={{
          icon: <Receipt size={20} />,
          title: "Settings",
          href: '/Settings'
        }} />
        <Separator />
        <SidebarItem item={{
          icon: <Settings size={20} />,
          title: "Help",
          href: '/Help'
        }} />
      </Sidebar>
      <div className={`${isOpen ? 'pl-60' : 'pl-16'} transition-all`}>
        {children}
      </div>
    </div>
  )
}
