"use client"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ComputerTerminalIcon, RoboticIcon, Settings05Icon,
  CropIcon, PieChartIcon, MapsIcon
} from "@hugeicons/core-free-icons"
import { OSBN } from "@/iconjsx/logo"
import useUserAuthontication from "@/store/useUserAuthontication"
import { cn } from "@/lib/utils"
import { ComponentProps, useEffect, useMemo } from "react"
import { useProtect } from "@/hooks/useProtect"
import { Home } from "lucide-react"
import Link from "next/link"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  useProtect.fn()
  const { username, isAdmin } = useUserAuthontication()
  const { open } = useSidebar()

  // تعریف داده‌ها در داخل کامپوننت یا استفاده از useMemo
  // نکته: برای جلوگیری از رندر مجدد غیرضروری، این ساختار را بهینه می‌کنیم
  const navData = useMemo(() => ({
    user: {
      name: username || "کاربر مهمان",
      email: "",
      avatar: "",
    },

    projects: [
      // { name: "مستندات", url: "#", icon: <HugeiconsIcon icon={CropIcon} strokeWidth={2} /> },
      // { name: "ثبت پیشنهادات", url: "#", icon: <HugeiconsIcon icon={PieChartIcon} strokeWidth={2} /> },
      { name: "درباره ما", url: "/about", icon: <HugeiconsIcon icon={MapsIcon} strokeWidth={2} /> },
    ],
  }), [username, isAdmin]);



  const navItem = useMemo(() => {
    const items = [
      {
        title: "موجودیت‌ها",
        url: "#",
        icon: <Home />,
        isActive: true,
        items: [
          { title: "افزودن درس پاس شده", url: "/console/passed_lesson" },
          { title: "درخواست افزودن", url: "/console/append" },
        ],
      }
    ];

    if (isAdmin) {
      items.push({
        title: "مدیریت",
        url: "#",
        icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
        isActive: true,
        items: [
          { title: "لیست معلق‌ها", url: "/admin/pending" },
          { title: "ویژگی ها", url: "/admin/option" },
        ],
      });
    }

    return items;
  }, [isAdmin]);
  return (
    <Sidebar collapsible="icon" {...props} side="right" dir="rtl" variant="floating">
      <Link href={"/"}>
        <SidebarHeader>
          <div className="overflow-hidden size-full flex items-end my-2">
            <div className="h-full w-[2.1rem] flex justify-center items-center">
              <OSBN />
            </div>
            <span className={cn(
              "transition-all duration-150 overflow-hidden whitespace-nowrap font-bold",
              open ? "w-20" : "opacity-0 w-0"
            )}>
              استادبان
            </span>
          </div>
        </SidebarHeader>
      </Link>
      <SidebarContent>
        <NavMain items={navItem} />
        <NavProjects projects={navData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

