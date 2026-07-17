import { Star } from "lucide-react"

export const RatingCalculus = (data: { rate: number }) => {
    const { rate } = data
    return (
        <div className="flex w-full justify-end">
            {Array.from({ length: 5 - rounder(rate) }).map((v, i) => {
                return (
                    <Star key={i} className="w-[.8rem] fill-accent " />
                )
            })}

            {Array.from({ length: rounder(rate) }).map((v, i) => {
                return (
                    <Star key={i} className="w-[.8rem] fill-accent-foreground" />
                )
            })}



        </div>


    )
}


const rounder = (a: number): number => {
    if (a == 0 || a == 100) return a

    return Math.floor(a / 20) + 1
}
