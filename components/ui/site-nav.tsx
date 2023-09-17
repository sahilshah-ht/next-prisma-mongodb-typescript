import { MainNav } from "@/components/ui/main-nav"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Search } from "@/components/ui/search"
import TeamSwitcher from "@/components/ui/team-switcher"
import { UserNav } from "@/components/ui/user-nav"


export default function SiteNav() {

    return (
        <>
            <div className="border-b sticky top-0 z-50 bg-background">
                <div className="flex h-16 items-center px-6 w-full">
                    <TeamSwitcher />
                    <MainNav className="mx-8" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <ModeToggle />
                        <UserNav />
                    </div>
                </div>
            </div>
        </>
    )
}
