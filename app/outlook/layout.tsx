"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Pen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EntityLinkMapperReverse } from "@/lib/linkmapper"

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const pathname = usePathname()

    const segments = pathname.split("/").filter(Boolean)

    const paramLatest = segments.at(-1)
    const paramBeforeLatest = segments.at(-2)

    return (
        <>
            <div className="min-h-[calc(100vh-60px)]">
                {children}
            </div>

            <div className="text-xs h-14 w-full flex justify-start px-12 items-center border-t-2 border-dashed">
                <Link href={`/console/manipulation/${EntityLinkMapperReverse(paramBeforeLatest ? paramBeforeLatest : '')}/${paramLatest}`}>
                    <Button variant="destructive">
                        <Pen />
                        ویرایش
                    </Button>
                </Link>
            </div>
        </>
    )
}