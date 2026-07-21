import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

function Spinner({ className }: React.ComponentProps<"svg">) {


  return (
    <HugeiconsIcon icon={Loading03Icon} className={cn("size-4 animate-spin stroke-2", className)} />
  )
}

export { Spinner }
