"use client"

import { SparklesText } from "@/components/ui/sparkles-text"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, GraduationCap, Info, Search, University, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import { OSBN } from "@/iconjsx/logo"
import { ListOrdered } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Fragment, useState, useCallback, useEffect } from "react"
import useSWR from "swr"
import { api } from "@/utils/api/base"
import { SubmissionData } from "@/entity/entity"
import { AxiosError, AxiosResponse } from "axios"
import { CardItrationViewSearchHome } from "@/components/osbn/cardItreationSearchHome"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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


const fetcher = async (url: string): Promise<AxiosResponse<SubmissionData>> => {
    return await api.get<SubmissionData>(url)
}
export default function Page() {
    const anchor = useComboboxAnchor()
    const [endpoint, setEndpoint] = useState<string | null>(null)
    const { data, error, isLoading } = useSWR<AxiosResponse<SubmissionData>>(
        endpoint,
        fetcher,
    )
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

    const handleSearch = useCallback(() => {

        const params = new URLSearchParams()


        if (selectedCategories.length == 0) {
            categories.forEach((cat) => {
                params.set(cat, searchQuery)
            })
        } else {
            selectedCategories.forEach((category) => {
                params.set(category, searchQuery)
            })
        }


        setEndpoint(`/academic?${params.toString()}`)



    }, [searchQuery, selectedCategories])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch()
    }



    useEffect(() => {
        if (!error) return;

        const err = error as AxiosError;

        console.log("Message:", err.message);
        console.log("Status:", err.response?.status);
        console.log("Response:", err.response?.data);
        console.log("Request:", err.request);
    }, [error]);



    const ISExistAnyData = (
        data?.data && data.data?.lesson?.length > 0 ||
        data?.data && data.data?.major?.length > 0 ||
        data?.data && data.data?.professor?.length > 0 ||
        data?.data && data.data?.university?.length > 0
    )


    return (
        <>
            <div className="flex justify-between px-4 lg:px-0 lg:w-7/12 flex-wrap mx-auto">



                <div>

                </div>

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


            {/* {data?.data && data.data?.university?.length > 0 ? <>ok</> : <>no</>} */}
            {/* <div className="lg:w-7/12 mx-auto">
                {(data?.data && (data.data?.lesson?.length > 0 || data.data?.major?.length > 0 || data.data?.university?.length > 0 || data.data?.professor?.length > 0)) &&
                <CardItrationViewSearchHome data={data.data} />
                }
                </div> */}


            <Card className="lg:w-7/12 mx-auto mt-5">

                <CardContent >

                    {ISExistAnyData ?

                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableHead>نوع</TableHead>
                                    <TableHead>نام</TableHead>

                                </TableRow>

                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Skeleton className="h-5 w-40" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-5 w-12" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <>


                                        {
                                            data?.data?.lesson?.map((v, i) => {
                                                return (

                                                    <TableRow key={i}>
                                                        <TableCell>
                                                            <Tooltip>
                                                                <TooltipTrigger render={
                                                                    <div className="inline-flex items-center gap-3">
                                                                        <BookOpen className="size-3" />
                                                                    </div>
                                                                } />
                                                                <TooltipContent>
                                                                    درس
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>{v.name}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }


                                        {
                                            data?.data?.major?.map((v, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>
                                                            <Tooltip>
                                                                <TooltipTrigger render={
                                                                    <div className="inline-flex items-center gap-3">
                                                                        <GraduationCap className="size-3" />
                                                                    </div>
                                                                } />
                                                                <TooltipContent>
                                                                    رشته
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>{v.name}</TableCell>

                                                    </TableRow>
                                                )
                                            })
                                        }


                                        {
                                            data?.data?.professor?.map((v, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>
                                                            <Tooltip>
                                                                <TooltipTrigger render={
                                                                    <div className="inline-flex items-center gap-3">
                                                                        <UserRound className="size-3" />
                                                                    </div>
                                                                } />
                                                                <TooltipContent>
                                                                    استاد
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>{v.name}</TableCell>

                                                    </TableRow>
                                                )
                                            })
                                        }

                                        {
                                            data?.data?.university?.map((v, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>
                                                            <Tooltip>
                                                                <TooltipTrigger render={
                                                                    <div className="inline-flex items-center gap-3">
                                                                        <University className="size-3" />
                                                                    </div>
                                                                } />
                                                                <TooltipContent>
                                                                    دانشگاه
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>{v.name} {v.city}</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }


                                    </>



                                )}
                            </TableBody>

                        </Table>

                        :


                        <div>


                            <p className="text-muted-foreground inline-flex items-center gap-1">
                                <Info className="size-3" />
                                موردی برای نمایش وجود ندارد!

                            </p>
                        </div>

                    }


                </CardContent>
                {ISExistAnyData &&
                    <CardFooter>
                        <p className="text-muted-foreground inline-flex items-center gap-1">
                            <Info className="size-3" />
                            اطلاعات توسط دانشجویان ثبت شده است
                        </p>
                    </CardFooter>
                }

            </Card>

        </>
    )
}