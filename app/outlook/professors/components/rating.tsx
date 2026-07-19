"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { IGetMyVotes } from "@/entity/getMyVotes";
import { api } from "@/utils/api/base";

import { Trash, WaypointsIcon } from "lucide-react"
import useSWR, { mutate } from "swr";
import GlobalFetcher from "@/utils/api/swrGlobal"
import { IOptionVoting } from "@/entity/optionsVoting"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/label"
import { FormHTMLAttributes, useState } from "react"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { IPostRate } from "@/entity/rate"
import { toast } from "sonner"

type FormValues = {
    rate: number

}
export default function RatingProfessor(dta: { id: string }) {




    const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            rate: 0
        },
    })



    const { data: rates, error: rateErr, isLoading: RateLoading } = useSWR(`/vote/i/professor/${dta.id}`, GlobalFetcher<IGetMyVotes[]>);
    const { data: op, error: OptErr, isLoading: OptLoading } = useSWR(`/option`, GlobalFetcher<IOptionVoting[]>);

    const options = op?.filter(s => s.owner == "professor")

    const [combo, setCombo] = useState<IOptionVoting>()




    const votedOptionIds = new Set(rates?.map((rate) => rate.OptionId))

    const notVotedOptions = options?.filter(
        (option) => !votedOptionIds.has(option.option_id)
    )

    console.log(votedOptionIds, options)

    const opts = notVotedOptions?.map((v, i) => v.name)

    console.log(opts);


    const Remove = async (id: number) => {
        try {
            await api.delete(`/vote/${id}`)
            mutate(`/vote/i/professor/${dta.id}`);
            mutate(`/option`);
        } catch {

        }
    }

    const Submit = async (event: FormValues) => {

        if (combo && combo.option_id) {

            try {
                const rate = event.rate
                const target = "professor"
                const target_id = Number(dta.id)
                const option_id = combo.option_id


                const data: IPostRate = {
                    rate, target, target_id, option_id
                }

                console.log(data, "here")


                const resp = await api.post("/vote", data)
                mutate(`/vote/i/professor/${dta.id}`);
                mutate(`/option`);
                console.log(resp)
            } catch (err) {
                console.log(err);

                toast.error("مشکل")
            }

        }

    }



    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">
                    <WaypointsIcon />
                    آرای من
                </Button>
            } />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>روابط</DialogTitle>
                    <DialogDescription>
                        روابط این درس با دیگر موجودیت ها.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="new">رای دادن</TabsTrigger>
                        <TabsTrigger value="old">سابقه</TabsTrigger>
                    </TabsList>
                    <TabsContent value="old">
                        <Table >
                            <TableBody>
                                <TableRow>
                                    <TableHead>ویژگی</TableHead>
                                    <TableHead>نمره</TableHead>
                                    <TableHead>عملیات</TableHead>
                                </TableRow>

                                {rates?.map((v, i) => {
                                    return (

                                        <TableRow key={i}>
                                            <TableCell>{v.OptionName}</TableCell>
                                            <TableCell>{v.Rate}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { Remove(v.Id) }}
                                                    variant="destructive">
                                                    <Trash className="size-3" />
                                                    حذف
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                            </TableFooter>
                        </Table>
                    </TabsContent>
                    <TabsContent value="new">
                        {(opts && opts.length > 0) ?
                            <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(Submit)}>
                                <Label>دسته بندی</Label>
                                <Combobox items={opts}
                                    onValueChange={(values) => {
                                        const finded = options?.find(s => s.name == values)

                                        setCombo(finded)

                                    }}
                                >
                                    <ComboboxInput placeholder="Select a framework" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item} value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <Label>نمره</Label>
                                <Input type="number" min={0} max={10}      {...register("rate", { required: true, valueAsNumber: true })} />


                                {combo?.name}
                                <Button type="submit">ثبت</Button>
                            </form> :

                            <div className="py-4 text-muted-foreground">
                                به تمام ویژگی ها رای داده اید !
                            </div>

                        }
                    </TabsContent>
                </Tabs>


            </DialogContent>
        </Dialog >
    )
}





const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
