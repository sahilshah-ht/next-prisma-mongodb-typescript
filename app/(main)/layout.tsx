import { MainNav } from "@/components/ui/main-nav"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Search } from "@/components/ui/search"
import TeamSwitcher from "@/components/ui/team-switcher"
import { UserNav } from "@/components/ui/user-nav"

interface MainLayoutProps {
  children: React.ReactNode
}
export default function MainLayout({
  children,
}: MainLayoutProps) {

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
