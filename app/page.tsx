"use client"

import { SparklesText } from "@/components/ui/sparkles-text"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import { OSBN } from "@/iconjsx/logo"
import { ListOrdered } from "lucide-react"

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { Field } from "@/components/ui/field"
import { Fragment, useState, useCallback } from "react"
import useSWR from "swr"
import { api } from "@/utils/api/base"
import { SubmissionData } from "@/entity/entity"
import { AxiosResponse } from "axios"
import { CardItrationViewSearchHome } from "@/components/osbn/cardItreationSearchHome"

const categories = [
    "university",
    "major",
    "lesson",
    "professor",
] as const

type Category = (typeof categories)[number]

const categoryLabels: Record<Category, string> = {
    university: "دانشگاه",
    major: "رشته",
    lesson: "درس",
    professor: "استاد",
}

// const CardData: ICardItrationData = {
//     detail: {
//         category: 'نتایج',
//         data: [
//             { title: 'محمد رضا یمقانی', button: { url: 'yamaghani', name: 'یمقانی' } },
//             { title: 'سید علی حسینی', button: { url: 'hoseyni', name: 'حسینی' } },
//             { title: 'رضا کریمی', button: { url: 'karimi', name: 'کریمی' } },
//             { title: 'مریم رضایی', button: { url: 'rezaei', name: 'رضایی' } },
//             { title: 'احمد نوری', button: { url: 'nouri', name: 'نوری' } },
//             { title: 'زهرا موسوی', button: { url: 'mousavi', name: 'موسوی' } },
//             { title: 'علیرضا صادقی', button: { url: 'sadeghi', name: 'صادقی' } },
//             { title: 'فاطمه محمدی', button: { url: 'mohammadi', name: 'محمدی' } },
//             { title: 'حسن تقوی', button: { url: 'taghavi', name: 'تقوی' } },
//             { title: 'نگین حسنی', button: { url: 'hasani', name: 'حسنی' } },
//         ],
//     }
// }
const fetcher = async (url: string): Promise<AxiosResponse<SubmissionData>> => {
    return await api.get<SubmissionData>(url)
}
export default function Page() {
    const anchor = useComboboxAnchor()
    const [endpoint, setEndpoint] = useState<string | null>(null)
    const { data, error, isLoading } = useSWR<AxiosResponse<SubmissionData>>(
        endpoint,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    )
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([categories[0]])

    const handleSearch = useCallback(() => {
        // const params = {
        //     query: searchQuery,
        //     sort: sortOrder,
        //     categories: selectedCategories,
        //     categoryLabels: selectedCategories.map(c => categoryLabels[c]),
        // }
        const params = new URLSearchParams()

        if (sortOrder) params.set("sort", sortOrder)

        selectedCategories.forEach((category) => {
            params.set(category, searchQuery)
        })

        setEndpoint(`/academic?${params.toString()}`)



    }, [searchQuery, sortOrder, selectedCategories])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch()
    }

    return (
        <>
            <div className="flex justify-between px-4 lg:px-0 lg:w-7/12 flex-wrap mx-auto">

                <div className="flex items-center max-h-12 my-4 w-full border-b border-dashed">
                    <div className="h-full -translate-y-4 w-8 animate-wiggle">
                        <OSBN />
                    </div>
                    <h1 className="mb-10 mt-4 font-black text-2xl flex items-end gap-x-4">
                        <SparklesText className="md:text-5xl text-3xl">
                            استادبان
                        </SparklesText>
                        <span className="opacity-80 md:text-2xl text-xs">
                            در خدمت شماست
                        </span>
                    </h1>
                </div>

                <Input
                    className="w-full h-10 my-4"
                    placeholder="جست و جو بین دانشگاه ها ، اساتید ، رشته ها و دروس"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <div className="flex my-2 w-auto gap-3">

                    {/* <Select value={sortOrder} onValueChange={(val: any) => {
                        setSortOrder(val)
                        console.log("📊 مرتب‌سازی:", val)
                    }}>
                        <SelectTrigger className="text-xs!">
                            <ListOrdered />
                            <SelectValue className="text-xs!" placeholder="الفبا" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="alpha">الفبا</SelectItem>
                                <SelectItem value="grade">نمره</SelectItem>
                                <SelectItem value="views">بازدید</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}

                    <Field className="mx-auto w-full max-w-xs">
                        <Combobox
                            multiple
                            autoHighlight
                            items={categories}
                            value={selectedCategories}
                            onValueChange={(values) => {
                                const typed = values as Category[]
                                setSelectedCategories(typed)
                                console.log("🏷️ دسته‌بندی‌های انتخاب‌شده:", typed.map(c => categoryLabels[c]))
                            }}
                            itemToStringValue={(item: Category) => categoryLabels[item] || item}
                        >
                            <ComboboxChips ref={anchor}>
                                <ComboboxValue>
                                    {(values: string[]) => (
                                        <Fragment>
                                            {values.map((value) => (
                                                <ComboboxChip key={value}>
                                                    {categoryLabels[value as Category] || value}
                                                </ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput placeholder="فیلتر" />
                                        </Fragment>
                                    )}
                                </ComboboxValue>
                            </ComboboxChips>
                            <ComboboxContent anchor={anchor} dir="rtl" data-lang="fa">
                                <ComboboxEmpty>موردی یافت نشد!</ComboboxEmpty>
                                <ComboboxList>
                                    {(item: Category) => (
                                        <ComboboxItem key={item} value={item}>
                                            {categoryLabels[item] || item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </Field>
                </div>

                <div className="my-2">
                    <Button className="px-4" onClick={handleSearch}>
                        <Search />
                        جست و جو
                    </Button>
                </div>
            </div>

            <div className="lg:w-7/12 mx-auto">
                {data?.data &&
                    <CardItrationViewSearchHome data={data.data} />
                }
            </div>
        </>
    )
}