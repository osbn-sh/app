import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IRate } from "@/entity/vote";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableVote from "./teble";
import ChartVote from "./chart";

const VotingArea = (dta: { data: IRate[] }) => {
    const { data } = dta
    return (



        <Card className="overflow-hidden" >

            <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2">آرا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
                <Tabs defaultValue="overview" >
                    <TabsList>
                        <TabsTrigger value="a">
                            جدول
                        </TabsTrigger>
                        <TabsTrigger value="b">
                            نمودار
                        </TabsTrigger>
                    </TabsList>



                    <TabsContent value="a">
                        <Card>
                            <CardContent className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center">
                                <TableVote data={data}/>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="b">
                        <Card>
                            <CardContent >

                                    <ChartVote data={data}/>

                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>



            </CardContent>
            <CardFooter className="bg-muted/40 px-6 py-3 text-xs text-muted-foreground flex justify-between">
                آرای برخاسته از نظر دانشجویان
            </CardFooter>
        </Card>
    )
}


export default VotingArea