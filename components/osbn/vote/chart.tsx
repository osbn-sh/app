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
import { IRate } from "@/entity/vote"

export const description = "A radar chart"

const chartConfig = {
    value: {
        label: "value",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig





export default function ChartVote(dta: { data: IRate[] }) {

    const { data } = dta
    return (
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
    )
}
