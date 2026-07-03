
"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { CardArea, CardAreaWrapper } from "@/components/CardArea"
import usehardness from "@/hooks/use-hardness"
import { api } from "@/utils/api/base"
import { toast } from "sonner"

type FormValues = {
    name: string
    name_english: string
    description: string
    description_english: string
    difficulty: number
    term: string
}

// مقدار اولیه برای درس
const defaultLessonData: FormValues = {
    name: "مبانی برنامه‌نویسی",
    name_english: "Programming Fundamentals",
    description: "آشنایی با مفاهیم پایه برنامه‌نویسی، ساختارهای کنترلی، توابع و آرایه‌ها",
    description_english: "Introduction to basic programming concepts, control structures, functions, and arrays",
    difficulty: 2,
    term: "3",
}

interface LessonProps {
    initialData?: FormValues
}

export function LessonComponent1() {
    return (
        <CardAreaWrapper>
            <Lesson />
        </CardAreaWrapper>
    )
}

export default function Lesson({ initialData = defaultLessonData }: LessonProps) {
    const c = usehardness()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: initialData,
    })

    const onSubmit = (data: FormValues) => {
        data.difficulty = Number(data.difficulty)

        if (data.difficulty < 1) {
            toast.error('سطح سختی را انتخاب کنید' )
        } else if (data.term?.length < 1) {
            toast.error('شماره ترم را وارد کنید' )
        } else {
            console.log("Form submitted:", data)

            api.post("/manipulation/lesson", data).then(s => {
                console.log(s.data)
                toast.success(
                 'درس با موفقیت ثبت شد!'
                )
            })
        }
    }

    const hardnessValue = watch("difficulty")

    return (
        <CardArea className="container w-full mx-auto">
            <Card className="flex flex-col p-4 w-full">
                <CardTitle className="text-xl font-semibold mb-2">ثبت درس جدید</CardTitle>
                <CardDescription className="mb-4 text-sm text-gray-600">
                    لطفاً اطلاعات درس را وارد نمایید
                </CardDescription>
                
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <FieldGroup>
                        {/* نام درس */}
                        <Field>
                            <FieldLabel htmlFor="lesson-name">نام درس</FieldLabel>
                            <Input 
                                id="lesson-name"
                                placeholder="نام درس" 
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
                                placeholder="Lesson name in English" 
                                {...register("name_english", { required: true })} 
                            />
                            {errors.name_english && <p className="text-red-500 text-sm mt-1">نام انگلیسی الزامی است</p>}
                        </Field>

                        {/* توضیحات فارسی */}
                        <Field>
                            <FieldLabel htmlFor="description">توضیحات</FieldLabel>
                            <Textarea 
                                id="description"
                                placeholder="توضیحات فارسی"
                                rows={3}
                                {...register("description", { required: true })} 
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">توضیحات الزامی است</p>}
                        </Field>

                        {/* توضیحات انگلیسی */}
                        <Field>
                            <FieldLabel htmlFor="description-en">توضیحات انگلیسی</FieldLabel>
                            <Textarea 
                                id="description-en"
                                dir="ltr"
                                placeholder="English description"
                                rows={3}
                                {...register("description_english", { required: true })} 
                            />
                            {errors.description_english && <p className="text-red-500 text-sm mt-1">توضیحات انگلیسی الزامی است</p>}
                        </Field>

                        {/* سختی درس */}
                        <Field>
                            <FieldLabel htmlFor="difficulty">سختی درس</FieldLabel>
                            <Select 
                                onValueChange={(val) => setValue("difficulty", Number(val))} 
                                value={hardnessValue ? String(hardnessValue) : undefined}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="انتخاب سختی" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <SelectItem key={i} value={i.toString()}>
                                                {c(i)}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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

                        {/* دکمه‌ها */}
                        <div className="mt-6 flex justify-end gap-4">
                            <Button type="submit">
                                ثبت درس
                            </Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                انصراف
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </Card>
        </CardArea>
    )
}