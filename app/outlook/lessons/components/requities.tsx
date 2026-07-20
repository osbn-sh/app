"use client"
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


import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkIcon, Plus, WaypointsIcon, Workflow } from "lucide-react"
import { IBackLesson, Requite } from "../entity"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/label"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Field } from "@/components/ui/field"
import useSWR, { mutate } from "swr"
import GlobalFetcher from "@/utils/api/swrGlobal"
import { AxiosResponse } from "axios"
import { api } from "@/utils/api/base"




const Combovalue = ['پیش نیاز', 'هم نیاز']

type FormValues = {
    lessonName: string
}


interface IData {
    lesson?: IBackLesson[]
}

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function Requities(param: { data: { pre_requites: Requite[], co_requites: Requite[], lessonID: number } }) {
    const { data } = param




    const [combo, setCombo] = useState("")
    const { register, handleSubmit, watch } = useForm<FormValues>({ mode: "all" })
    const { data: lessonTarget, isLoading, error } = useSWR<IData>(`/academic?lesson=${watch("lessonName")}`, GlobalFetcher<IData>)

    function input(a: FormValues) {
        const typeCategory = combo === Combovalue[0] ? 'pre' : 'co'



        try {



            api.post(`/academic/requites/${typeCategory}`, {
                lesson_id: data.lessonID,
                target_id: TdataID

            })


        } catch {

        }
    }



    const lessonName = watch("lessonName");

    useEffect(() => {
        handleSubmit(input)();
    }, [lessonName]);



    const Tdata = lessonTarget?.lesson!![0].name ?? 'not found';
    const TdataID = lessonTarget?.lesson!![0].id ?? 'not found';



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

                <Accordion defaultValue={["item-1"]}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger >
                            <div className="inline-flex items-center gap-1">

                                <Plus className="size-3" />
                                درخواست
                                افزودن
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <form onSubmit={handleSubmit(input)}>

                                <div className="grid grid-cols-1 gap-3">
                                    <Field>
                                        <Label>نام درس</Label>
                                        <Input {...register("lessonName")} />
                                        <p className="text-muted-foreground">
                                            {Tdata}
                                        </p>
                                    </Field>


                                    <Field >

                                        <Label className="mt-4">نوع وابستگی</Label>

                                        <Combobox items={Combovalue}
                                            onValueChange={(values) => {

                                                if (values === Combovalue[0] || values === Combovalue[1]) {
                                                    setCombo(values)
                                                } else {
                                                    setCombo("2")
                                                }

                                            }}

                                        >
                                            <ComboboxInput placeholder="انتخاب کنید" />
                                            <ComboboxContent>
                                                <ComboboxEmpty>موردی پیدا نشد.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>


                                    </Field>


                                    <Button type="submit" >ثبت</Button>
                                </div>
                            </form>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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