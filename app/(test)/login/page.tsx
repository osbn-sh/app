"use client"


import { useProtect } from "@/hooks/useProtect"

export default function page() {
    useProtect.fn()
    
    return (
        <>
            goox
        </>
    )
}