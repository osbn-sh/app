"use client"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/utils/api/base"
import { useFieldArray, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { CardArea, CardAreaWrapper } from "@/components/CardArea"
import { Building2, Users, Calendar, Trophy, Plus, X, Globe, Phone, Mail, MapPin, Award } from "lucide-react"
import { toast } from "sonner"

const Option = [
    "دانشگاه",
    "استاد",
] as const


type FormValues = {
    name: string
    wight: number
    owner: string
}

export default function page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            name: "",
            owner: "",
            wight: 0
        },
    })





    const onSubmit = async (data: FormValues) => {

        console.log(data)
        setIsLoading(true)

        if (!data.name || data.name.length < 1) {
            toast.error('شهر را انتخاب کنید')
            setIsLoading(false)
            return
        }

        if (!data.owner || data.owner.length < 1) {
            toast.error('دسته بندی را انتخاب کنید')
            setIsLoading(false)
            return
        }

        // اعتبارسنجی ویژگی‌های جدید
        if (data.wight && data.wight < 1) {
            toast.error('تعداد دانشکده‌ها باید حداقل ۱ باشد')
            setIsLoading(false)
            return
        }


        try {
            console.log("Form submitted:", data)

            if(data.owner == "استاد") data.owner = "professor"
            if(data.owner == "دانشگاه") data.owner = "university"

            const response = await api.post(`/option`, data)

            router.push('/')
            console.log(response.data)

            toast.success(
                'دانشگاه با موفقیت اضافه شد!'
            )
        } catch (error) {
            console.error(error)
            toast.error(
                'ارسال اطلاعات با خطا مواجه شد'
            )
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <CardAreaWrapper>
            <CardArea className="container w-full mx-auto">
                <Card className="flex flex-col p-4 w-full">
                    <CardTitle className="text-xl font-semibold mb-2">افزودن ویژگی جدید</CardTitle>
                    <CardDescription className="mb-4 text-sm text-gray-600">
                        لطفاً اطلاعات ویژگی را وارد نمایید
                    </CardDescription>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <FieldGroup>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="university-name">نام ویژگی</FieldLabel>
                                    <Input
                                        {...register("name", { required: true })}
                                        id="university-name"
                                        placeholder="مثال: اخلاق"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="university-name-en">مالکیت</FieldLabel>
                                    <Combobox
                                        onValueChange={(value: string | null) => setValue("owner", value ?? "")}
                                        items={Option}
                                    >
                                        <ComboboxInput
                                            id="small-form-framework"
                                            placeholder="انتخاب شهر"
                                            required
                                        />
                                        <ComboboxContent>
                                            <ComboboxEmpty>شهری یافت نشد</ComboboxEmpty>
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
                            </div>

                            {/* توضیحات فارسی و انگلیسی */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <Field>
                                    <FieldLabel>وزن اهمیت</FieldLabel>
                                    <Input type="number" min={0} max={10}
                                        {...register("wight", { required: true })}
                                        id="university-name-en"
                                        dir="ltr"
                                        placeholder="Example: University of Tehran"
                                    />
                                </Field>


                            </div>





                            {/* دکمه‌های ارسال و انصراف */}
                            <div className="mt-6 flex justify-end gap-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center space-x-2">
                                            <svg
                                                className="animate-spin size-5 delay-150 text-black"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                                                <path
                                                    d="M22 12a10 10 0 0 0-10-10"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span>در حال ذخیره...</span>
                                        </span>
                                    ) : (
                                        'افزودن دانشگاه'
                                    )}
                                </Button>
                                <Button onClick={() => router.back()} variant="outline" type="button">
                                    انصراف
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </Card>
            </CardArea>
        </CardAreaWrapper>
    )
}