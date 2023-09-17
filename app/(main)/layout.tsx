import SiteNav from "@/components/ui/site-nav"

interface MainLayoutProps {
  children: React.ReactNode
}
export default function MainLayout({
  children,
}: MainLayoutProps) {

  return (
    <div>
      <SiteNav />
      <div className="pl-72">
        {children}
      </div>
    </div>
  )
}
