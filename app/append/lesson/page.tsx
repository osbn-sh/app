"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { CardArea, CardAreaWrapper } from "@/components/CardArea"
import usehardness from "@/hooks/use-hardness"
import { sileo } from "sileo"
import { api } from "@/utils/api/base"
import { RefreshCcw } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type FormValues = {
    name: string
    name_english: string
    description: string
    description_english: string
    difficulty: number
    term: string
}

interface IButton {
    isLoading: boolean
    isNotActive: boolean
}

export default function Lesson() {
    const c = usehardness()
    const router = useRouter()
    
    const [ButtonState, setButtonState] = useState<IButton>({ isNotActive: false, isLoading: false })
    
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            name: "",
            name_english: "",
            description: "",
            description_english: "",
            difficulty: 0,
            term: "",
        },
    })

    const onSubmit = async (data: FormValues) => {
        setButtonState((prev) => { return { ...prev, isLoading: true } })
        
        data.difficulty = Number(data.difficulty)

        if (data.difficulty < 1) {
            sileo.error({ title: 'سطح سختی را انتخاب کنید' })
            setButtonState((prev) => { return { ...prev, isLoading: false } })
            return
        } 
        
        if (data.term?.length < 1) {
            sileo.error({ title: 'شماره ترم را وارد کنید' })
            setButtonState((prev) => { return { ...prev, isLoading: false } })
            return
        }
        
        try {
            console.log("Form submitted:", data)
            
            await api.post("/manipulation/lesson", data)
            
            sileo.success({
                title: 'درس با موفقیت ثبت شد!'
            })
            
            // router.replace('./console')
            
        } catch (error) {
            console.log(error);
            sileo.error({ title: 'خطا در ثبت درس' })
        } finally {
            setButtonState((prev) => { return { ...prev, isLoading: false } })
        }
    }

    const hardnessValue = watch("difficulty")

    return (
        <CardAreaWrapper>
            <CardArea>
                <Card className="flex flex-col p-4 w-full">
                    <CardTitle className="text-xl font-semibold mb-2">ثبت درس جدید</CardTitle>
                    <CardDescription className="mb-4 text-sm text-gray-600">
                        لطفاً اطلاعات درس را وارد نمایید
                    </CardDescription>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <FieldGroup>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* نام درس */}
                                <Field>
                                    <FieldLabel htmlFor="lesson-name">نام درس</FieldLabel>
                                    <Input
                                        id="lesson-name"
                                        placeholder="طراحی الگوریتم"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">نام درس الزامی است</p>}
                                </Field>

                                {/* نام انگلیسی */}
                                <Field>
                                    <FieldLabel htmlFor="lesson-name-en">نام انگلیسی</FieldLabel>
                                    <Input
                                        id="lesson-name-en"
                                        dir="ltr"
                                        placeholder="Algorithm Design"
                                        {...register("name_english", { required: true })}
                                    />
                                    {errors.name_english && <p className="text-red-500 text-sm mt-1">نام انگلیسی الزامی است</p>}
                                </Field>
                            </div>

                            {/* توضیحات فارسی */}
                            <div className="mt-4">
                                <Field>
                                    <FieldLabel htmlFor="description">توضیحات</FieldLabel>
                                    <Textarea
                                        id="description"
                                        placeholder="این درس به بررسی طراحی الگوریتم‌های کارآمد می‌پردازد"
                                        rows={3}
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">توضیحات الزامی است</p>}
                                </Field>
                            </div>

                            {/* توضیحات انگلیسی */}
                            <div className="mt-4">
                                <Field>
                                    <FieldLabel htmlFor="description-en">توضیحات انگلیسی</FieldLabel>
                                    <Textarea
                                        id="description-en"
                                        dir="ltr"
                                        placeholder="This course covers efficient algorithm design techniques"
                                        rows={3}
                                        {...register("description_english", { required: true })}
                                    />
                                    {errors.description_english && <p className="text-red-500 text-sm mt-1">توضیحات انگلیسی الزامی است</p>}
                                </Field>
                            </div>

                            {/* سختی درس و ترم در یک ردیف */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {/* سختی درس */}
                                <Field>
                                    <FieldLabel htmlFor="difficulty">سختی درس</FieldLabel>
                                    <select
                                        id="difficulty"
                                        className="w-full p-2 border rounded-md"
                                        value={hardnessValue || ""}
                                        onChange={(e) => setValue("difficulty", Number(e.target.value))}
                                    >
                                        <option value="" disabled>انتخاب کنید</option>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <option key={i} value={i}>
                                                {c(i)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.difficulty && <p className="text-red-500 text-sm mt-1">سختی درس را انتخاب کنید</p>}
                                </Field>

                                {/* ترم */}
                                <Field>
                                    <FieldLabel htmlFor="term">شماره ترم</FieldLabel>
                                    <Input
                                        id="term"
                                        type="number"
                                        placeholder="ترم (۱ تا ۱۰)"
                                        min={1}
                                        max={10}
                                        {...register("term", { required: true, min: 1, max: 10 })}
                                    />
                                    {errors.term && <p className="text-red-500 text-sm mt-1">شماره ترم الزامی است (۱ تا ۱۰)</p>}
                                </Field>
                            </div>

                            {/* دکمه‌ها */}
                            <div className="mt-6 flex justify-end gap-4">
                                <Button type="submit" disabled={ButtonState.isNotActive || ButtonState.isLoading}>
                                    {ButtonState.isLoading ? (
                                        <span className="flex items-center space-x-2">
                                            <RefreshCcw className="animate-spin ml-2" />
                                            <span>در حال ذخیره...</span>
                                        </span>
                                    ) : (
                                        'ذخیره'
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