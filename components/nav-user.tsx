"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon, SparklesIcon, CheckmarkBadgeIcon, CreditCardIcon, NotificationIcon, LogoutIcon } from "@hugeicons/core-free-icons"
import useUserAuthontication from "@/store/useUserAuthontication"
import { Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { ModeToggle } from "./themeModeToggle"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()



  const t = useUserAuthontication()
  const Logout = () => {
    t.Logout()
  }
  const c = useTheme()


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar>
              <div className="size-full flex justify-center items-center">
                <User className="opacity-55" />
              </div>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
            </div>
            <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} className="ms-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0  font-normal">
                <div className="flex justify-between items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <div className="flex flex-col">
                    <ModeToggle />
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

      
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { Logout() }}>
              <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
