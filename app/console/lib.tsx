import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AgoDateCalculator } from "@/lib/date"
import { BadgeCheck, BookOpen, CircleX, Clock3, FilePenLine, GraduationCap, Plus, PlusCircle, University, UserRound } from "lucide-react"

export const ButtonStatusHere = (data: { status: string }) => {

    if (data.status == "pending") {
        return (
            <Button variant={"outline"}>
                <Clock3 className="h-4 w-4" />
                در انتظار بررسی
            </Button>
        )
    }

    if (data.status == "approved") {
        return (
            <Button variant={"default"}>
                <BadgeCheck className="h-4 w-4" />
                تایید شده
            </Button>
        )
    }
    if (data.status == "rejected") {
        return (
            <Button variant={"destructive"}>
                <CircleX className="w-4" />
                عدم تایید
            </Button>
        )
    }

}


export const ActionHere = (data: { action: string }) => {

    return (
        <>
            {
                data.action === "update" ? (
                    <Tooltip>
                        <TooltipTrigger render={<Button variant={"ghost"}><FilePenLine /></Button>} />
                        <TooltipContent>درخواست تغییر</TooltipContent>
                    </Tooltip>
                ) : (
                    <Tooltip>
                        <TooltipTrigger render={<Button variant={"ghost"}><Plus /></Button>} />
                        <TooltipContent>درخواست ایجاد</TooltipContent>
                    </Tooltip>
                )
            }
        </>
    )
}

export const ColorGuesser = (status: string): string => {
    switch (status) {
        case "approved":
            return "color-mix(in oklab, var(--color-green-950) 10%, transparent)";

        case "rejected":
            return "color-mix(in oklab, var(--color-red-950) 10%, transparent)";

        default:
            return "transparent";
    }
};
export const RenderButtonHere = (v: { name: string, action: string, entity: "استاد" | "رشته" | "دانشگاه" | "درس", status: string }) => {

    return (


        <Card className="hover:translate-y-0.5 transition-transform cursor-pointer " style={{
            backgroundColor: ColorGuesser(v.status)

        }}>
            <CardHeader>

                <div className="flex gap-2 mt-2 items-center">

                    {v.status == "rejected" && <CircleX className="size-4" />}
                    {v.status == "approved" && <BadgeCheck className="size-4" />}
                    {v.status == "pending" && <Clock3 className="size-4" />}

                    |

                    {v.entity == "رشته" && <GraduationCap className="size-4" />}
                    {v.entity == "استاد" && <UserRound className="size-4" />}
                    {v.entity == "دانشگاه" && <University className="size-4" />}
                    {v.entity == "درس" && <BookOpen className="size-4" />}

                    <CardTitle> {v.entity} {v.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="w-full flex">
                    <Kbd>

                        {v.action == "update" ?
                            <>
                                <Plus />
                                درخواست افزودن
                            </>
                            :
                            <>
                                <FilePenLine />
                                درخواست تغییر
                            </>
                        }
                    </Kbd>

                </div>
            </CardContent>
        </Card>

    )
}


export const DateHere = (v: { approved_at?: string, status: string, submitted_at: string }) => {

    return (
        <>
            {v.approved_at ?
                <Tooltip>
                    <TooltipTrigger render={<Button variant={v.status == "rejected" ? "destructive" : "default"}>
                        <FilePenLine />
                        {AgoDateCalculator(v.approved_at)}
                    </Button>} />
                    <TooltipContent>تاریخ
                        {v.status == "rejected" ? " رد " : " تایید "}
                    </TooltipContent>
                </Tooltip>
                :
                <Tooltip>
                    <TooltipTrigger render={<Button variant="secondary">
                        <PlusCircle />
                        {AgoDateCalculator(v.submitted_at)}
                    </Button>} />
                    <TooltipContent>
                        تاریخ ثبت
                    </TooltipContent>
                </Tooltip>
            }
        </>
    )
}

