"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartConfig = {
    value: {
        label: "value",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig



interface IChart {
    option: string,
    value: number
}

export default function ChartOsbn(dta: { data: IChart[] }) {

    const { data } = dta
    return (
        <Card>

            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <RadarChart data={data}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="option" />
                        <PolarGrid />
                        <Radar
                            dataKey="value"
                            fill="var(--color-value)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
