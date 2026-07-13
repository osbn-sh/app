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

export default function DialogScrollableContent() {
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
                            <TabsTrigger value="overview">درس</TabsTrigger>
                            <TabsTrigger value="analytics">استاد</TabsTrigger>
                            <TabsTrigger value="reports">دانشگاه</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <Card>
                                <CardContent className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center">
                                    {Array.from({ length: 100 }).map((v, i) => {
                                        return (
                                            <Button key={i} size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9 " >
                                                استاد
                                                محمدرضا یمقانی
                                                <Separator orientation="vertical" />
                                                <LinkIcon />
                                            </Button>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}
