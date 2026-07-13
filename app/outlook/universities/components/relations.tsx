import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkIcon, WaypointsIcon } from "lucide-react"
import { Relationships } from "../entity"
import Link from "next/link"
import { EntityLinkMapper } from "@/lib/linkmapper"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { RainbowButton } from "@/components/ui/rainbow-button"

export default function RelationUniversity(param: { data: Relationships }) {

    const { data } = param


    const Items = [["major", "رشته"], ["lesson", "درس"], ["professor", "استاد"]] as const

    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">
                    <WaypointsIcon />
                    نمایش روابط
                </Button>




            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>روابط</DialogTitle>
                    <DialogDescription>
                        روابط این درس با دیگر موجودیت ها.
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto p-4 ">
                    <Tabs defaultValue="overview" >
                        <TabsList>
                            {Items.map(([key, label]) =>
                                data[key]?.length ? (
                                    <TabsTrigger key={key} value={key}>
                                        {label}
                                    </TabsTrigger>
                                ) : null
                            )}
                        </TabsList>


                        {Items.map(([key, label]) =>
                            <TabsContent value={key} key={key}>
                                <Card>
                                    <CardContent className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center">
                                        {data[key].map((v, i) => {
                                            return (
                                                <Link href={`../${EntityLinkMapper(key)}/${v.id}`} key={i}>
                                                    <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9 cursor-pointer" title={v.description}>
                                                        <LinkIcon />
                                                        {v.name}
                                                    </Button>
                                                </Link>
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog >
    )
}




