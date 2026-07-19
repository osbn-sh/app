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
import { Major as IMajor } from "@/entity/entity"
import { Spinner } from "@/components/ui/spinner"


type FormValues = {
    name: string
    name_english: string
    description: string
    description_english: string
}



export function MajorComponent1(data: { major: IMajor, slug: string }) {
    return (
        <CardAreaWrapper>
            <Major major={data.major} slug={data.slug} />
        </CardAreaWrapper>
    )
}

const Major = (data: { major: IMajor, slug: string }) => {
    const { major, slug } = data
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            description: major.description,
            description_english: major.description_english,
            name: major.name,
            name_english: major.name_english
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (formData: FormValues) => {
        setIsLoading(true)

        try {
            console.log(formData)
            const response = await api.put(`/manipulation/major/${slug}`, formData)
            toast.success(
                'با موفقیت به لیست معلق ها اضافه شد!'
            )
            // router.push('/console')
        } catch (error) {
            console.log(error)
            toast.error('خطا در ذخیره اطلاعات')
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
                    <CardDescription className="mb-4 text-sm text-muted-foreground">
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
                                            <Spinner />
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