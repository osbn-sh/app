"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { api } from "@/utils/api/base"
import { CardArea, CardAreaWrapper } from "@/components/CardArea"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type FormValues = {
    name: string
    name_english: string
    description: string
    description_english: string
}

// مقدار اولیه برای فرم
const defaultMajorData: FormValues = {
    name: "مهندسی کامپیوتر",
    name_english: "Computer Engineering",
    description: "رشته مهندسی کامپیوتر شامل مبانی سخت‌افزار، نرم‌افزار، شبکه و هوش مصنوعی می‌باشد",
    description_english: "Computer Engineering includes fundamentals of hardware, software, networking and artificial intelligence"
}

export function MajorComponent1() {
    return (
        <CardAreaWrapper>
            <Major/>
        </CardAreaWrapper>
    )
}

const Major = () => {
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: defaultMajorData
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        
        try {
            const response = await api.post("/manipulation/major", data)
            console.log(response.data)
            toast.success(
                 'با موفقیت به لیست معلق ها اضافه شد!'
            )
            router.push('/console')
        } catch (error) {
            console.log(error)
            toast.error( 'خطا در ذخیره اطلاعات' )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CardAreaWrapper>
            <CardArea className="container w-full mx-auto">
                <Card className="flex flex-col p-4 w-full">
                    <CardTitle className="text-xl font-semibold mb-2">
                        ثبت رشته جدید
                    </CardTitle>
                    <CardDescription className="mb-4 text-sm text-gray-600">
                        لطفاً اطلاعات رشته مورد نظر را وارد نمایید
                    </CardDescription>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <FieldGroup>
                            {/* نام رشته */}
                            <Field>
                                <FieldLabel htmlFor="major-name">نام رشته</FieldLabel>
                                <Input
                                    {...register("name", { required: true })}
                                    id="major-name"
                                    placeholder="نام رشته"
                                />
                            </Field>

                            {/* نام انگلیسی */}
                            <Field>
                                <FieldLabel htmlFor="major-name-en">نام انگلیسی</FieldLabel>
                                <Input
                                    {...register("name_english", { required: true })}
                                    id="major-name-en"
                                    dir="ltr"
                                    placeholder="Major name in English"
                                />
                            </Field>

                            {/* توضیحات فارسی */}
                            <Field>
                                <FieldLabel htmlFor="description">توضیحات</FieldLabel>
                                <Textarea
                                    {...register("description", { required: true })}
                                    id="description"
                                    placeholder="توضیحات فارسی"
                                    rows={4}
                                />
                            </Field>

                            {/* توضیحات انگلیسی */}
                            <Field>
                                <FieldLabel htmlFor="description-en">توضیحات انگلیسی</FieldLabel>
                                <Textarea
                                    {...register("description_english", { required: true })}
                                    id="description-en"
                                    dir="ltr"
                                    placeholder="English description"
                                    rows={4}
                                />
                            </Field>

                            {/* دکمه‌ها */}
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
                                        'ثبت رشته'
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

export default Major