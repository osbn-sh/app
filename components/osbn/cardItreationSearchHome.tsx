"use client"
import Link from "next/link"
import { Card, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import { Pointer } from "lucide-react"
import { SubmissionData, University, Lesson, Professor, Major } from "@/entity/entity"

export interface ICardData {
    id: number
    button: {
        name: string
        url: string
    }
    title: string
}

type CategoryKey = keyof SubmissionData

const categoryLabels: Record<CategoryKey, string> = {
    university: "دانشگاه‌ها",
    major: "رشته‌ها",
    lesson: "درس‌ها",
    professor: "اساتید",
}

// مسیر صفحه‌ی جزئیات برای هر دسته
const categoryPath: Record<CategoryKey, string> = {
    university: "/universities",
    major: "/majors",
    lesson: "/lessons",
    professor: "/professors",
}

// تبدیل هر entity (University | Lesson | Professor | Major) به شکل یکسان ICardData
const toCardData = (
    category: CategoryKey,
    item: University | Lesson | Professor | Major
): ICardData => ({
    id: item.id,
    title: item.name,
    button: {
        name: "مشاهده",
        url: `outlook/${categoryPath[category]}/${item.id}`,
    },
})

const mapSubmissionData = (data: SubmissionData): Record<CategoryKey, ICardData[]> => ({
    university: data.university?.map((v) => toCardData("university", v)),
    major: data.major?.map((v) => toCardData("major", v)),
    lesson: data.lesson?.map((v) => toCardData("lesson", v)),
    professor: data.professor?.map((v) => toCardData("professor", v)),
})

const filterItems = (items: ICardData[], term: string) => {
    if (!term.trim()) return items
    return items?.filter(
        (item) =>
            item.title.toLowerCase().includes(term) ||
            item.button.name.toLowerCase().includes(term)
    )
}

export const CardItrationViewSearchHome = ({ data }: { data: SubmissionData }) => {

    const mapped = mapSubmissionData(data)
    const [filteredData, setFilteredData] = useState<Record<CategoryKey, ICardData[]>>(mapped)
    const inpRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setFilteredData(mapSubmissionData(data))
    }, [data])

    const searchInput = () => {
        const searchTerm = inpRef.current?.value?.toLowerCase() || ""
        const base = mapSubmissionData(data)

        setFilteredData({
            university: filterItems(base.university, searchTerm),
            major: filterItems(base.major, searchTerm),
            lesson: filterItems(base.lesson, searchTerm),
            professor: filterItems(base.professor, searchTerm),
        })
    }

    return (
        <div className="my-10 relative">
            {(Object.keys(categoryLabels) as CategoryKey[]).map((category) => {
                const items = filteredData[category]
                if (items?.length > 1) {
                    return (
                        <div key={category} className="mb-10">
                            <h3 className="text-4xl md:text-start text-center font-black w-full mb-6">
                                {categoryLabels[category]}
                            </h3>


                            {items?.length < 1 ? (
                                <div className="w-full h-96 mask-b-from-0 mask-b-to-95% p-4">
                                    <Card className="size-full">
                                        <div className="flex mt-4 items-end justify-center gap-x-2">
                                            <Pointer size={"3rem"} />
                                            <h3 className="font-black text-2xl dark:text-white">
                                                موردی یافت نشد
                                            </h3>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-4 gap-4 max-h-128 overflow-y-scroll mask-b-from-0 mask-b-to-95% p-4 relative pb-48">
                                    {items?.map((v) => (
                                        <Card key={v.id}>
                                            <h3 className="px-5">{v.title}</h3>
                                            <CardFooter>
                                                <Link href={v.button.url}>
                                                    <Button>{v.button.name}</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }

            })}

            <div className="w-full flex justify-center h-14 -translate-y-10">
                <Input
                    className="w-8/12"
                    placeholder="جست و جو"
                    ref={inpRef}
                    onInput={searchInput}
                />
            </div>
        </div>
    )
}