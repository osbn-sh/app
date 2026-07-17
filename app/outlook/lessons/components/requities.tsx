import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkIcon, WaypointsIcon, Workflow } from "lucide-react"
import { Requite } from "../entity"
import Link from "next/link"


export default function Requities(param: { data: { pre_requites: Requite[], co_requites: Requite[] } }) {
    const { data } = param


    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">
                    <Workflow />
                    پیشنیاز
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>پیشنیاز و همنیاز</DialogTitle>
                    <DialogDescription>
                        روابط این درس با دیگر موجودیت ها.
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto p-4 ">
                    <Tabs defaultValue="overview" >
                        <TabsList>

                            {data.pre_requites?.length > 0
                                &&
                                <TabsTrigger value="pre">
                                    پیشنیاز
                                </TabsTrigger>
                            }
                            {data.co_requites?.length > 0
                                &&
                                <TabsTrigger value="co">
                                    هم نیاز
                                </TabsTrigger>
                            }
                        </TabsList>


                        {data.co_requites?.length > 0
                            &&
                            <TabsContent value="co" >
                                <Card>
                                    <CardContent className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center">
                                        {data.co_requites.map((v, i) => {

                                            return (
                                                <Buttons key={i} v={v} i={i} />
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        }


                        {data.pre_requites?.length > 0
                            &&
                            <TabsContent value="pre" >
                                <Card>
                                    <CardContent className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center">
                                        {data.pre_requites.map((v, i) => {

                                            return (
                                                <Buttons key={i} v={v} i={i} />
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        }

                    </Tabs>
                </div>
            </DialogContent>
        </Dialog >
    )
}




const Buttons = (d: { v: Requite, i: number }) => {
    const { i, v } = d
    return (
        <Link href={`../lessons/${v.id}`} key={i}>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9 cursor-pointer" title={v.description}>
                <LinkIcon />
                {v.name}
            </Button>
        </Link>
    )
}