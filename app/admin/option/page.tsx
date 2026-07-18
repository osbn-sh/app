"use client"
import { IOptionVoting } from "@/entity/optionsVoting";
import { api } from "@/utils/api/base";
import { AxiosResponse } from "axios";
import useSWR, { mutate } from "swr";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Fragment } from "react/jsx-runtime";
import { Filter, Plus, SortAsc, Trash, University, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export default function Page() {

    const fetcher = (url: string) => api.get<IOptionVoting[]>(url).then((res) => res.data);

    const { data: options, error, isLoading } = useSWR("/option", fetcher);



    const RemoveClick = (id: number) => {

        api.delete(`/option/${id}`)

        mutate("/option");
    }



    const [filter, setFilter] = useState<string>("")
    const SwitchFilter = () => {
        setFilter((prev) => {


            switch (prev) {
                case "professor":
                    return "university"
                case "university":
                    return ""
                case "":
                    return "professor"

                default:
                    return ""
            }

        })
    }


    return (



        <Card className="w-8/12 mx-auto">
            <CardContent >
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>نام</TableHead>
                            <TableHead>ضریب اهمیت (؟/۱۰)</TableHead>
                            <TableHead>
                                <Button onClick={SwitchFilter}>
                                    <Filter />
                                    مالکیت
                                </Button>
                            </TableHead>
                            <TableHead>عملیات</TableHead>
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
                                    <TableCell>
                                        <Skeleton className="h-8 w-24 rounded-md" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-8 w-20 rounded-md" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            options
                                ?.filter((s) => (filter === "" ? true : s.owner === filter))
                                .map((v) => (
                                    <TableRow key={v.option_id}>
                                        <TableCell>{v.name}</TableCell>
                                        <TableCell>{v.weight}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost">
                                                {v.owner === "university" ? (
                                                    <>
                                                        <University className="size-3" />
                                                        دانشگاه
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserRound className="size-3" />
                                                        استاد
                                                    </>
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                onClick={() => RemoveClick(v.option_id)}
                                            >
                                                <Trash className="size-3" />
                                                حذف
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>


            <CardFooter>
                <Link href={"/admin/option/append"}>
                    <Button>
                        <Plus />
                        اضافه کردن
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )




}