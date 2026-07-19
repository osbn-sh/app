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
import { api } from "@/utils/api/base"
import { Check, CheckCheck, RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { AxiosResponse } from "axios"
import { IBackProfessor } from "@/app/outlook/professors/entity"
import { IBackLesson } from "@/app/outlook/lessons/entity"

type FormValues = {
    lesson: string
    professor: string
}

interface IButton {
    isLoading: boolean
    isNotActive: boolean
}

export default function AddPassedLesson() {
    const c = usehardness()
    const router = useRouter()

    const [ButtonState, setButtonState] = useState<IButton>({ isNotActive: false, isLoading: false })

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            lesson: "",
            professor: ""

        },
    })

    const onSubmit = async () => {
        setButtonState((prev) => { return { ...prev, isLoading: true } })

        console.log(data)
        if ((!data?.professor?.length && !data?.lesson?.length)) {
            toast.error('فرم را به درستی پر کنید')
            return
        }


        try {
            console.log("Form submitted:", data)


            const formData = {
                lesson_id: data!.lesson![0].id,
                professor_id: data?.professor?.[0]?.id,
            };

            const reps = await api.post("/student/pass", formData)

            toast.success(
                'درس با موفقیت ثبت شد!'
            )

            // router.replace('./console')

        } catch (error) {
            console.log(error);
            toast.error('خطا در ثبت درس')
        } finally {
            setButtonState((prev) => { return { ...prev, isLoading: false } })
        }
    }

    const watchProfessor = watch("professor")
    const watchLesson = watch("lesson")

    interface IData {
        professor?: IBackProfessor[]
        lesson?: IBackLesson[]
    }



    const [data, setData] = useState<IData>()



    useEffect(() => {

        (async () => {

            setButtonState((prev) => { return { ...prev, isLoading: true } })
            try {


                const dta: AxiosResponse<IData> = await api.get(`/academic?lesson=${watchLesson}&professor=${watchProfessor}`)

                setData(dta.data)

            } catch { }
            finally {

                setButtonState((prev) => { return { ...prev, isLoading: false } })
            }


        })()





    }, [watchLesson, watchProfessor])








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
                                        placeholder="درس"
                                        {...register("lesson", { required: true })}
                                    />
                                    {/* {errors.lesson && <p className="text-red-500 text-sm mt-1"> درس الزامی است</p>} */}

                                    <div className="text-gray-600 text-sm mt-1 flex gap-2 items-center">

                                        {!data?.lesson?.length ? (
                                            <>
                                                <Spinner className="size-4" />
                                                درس الزامی است
                                            </>
                                        ) : (
                                            <>
                                                <Check className="size-4" />
                                                <span>{data.lesson[0].name}</span>
                                            </>
                                        )}
                                    </div>
                                </Field>

                                {/* نام انگلیسی */}
                                <Field>
                                    <FieldLabel htmlFor="lesson-name-en">نام استاد</FieldLabel>
                                    <Input
                                        id="lesson-name-en"
                                        dir="ltr"
                                        placeholder="Algorithm Design"
                                        {...register("professor", { required: true })}
                                    />

                                    <div className="text-gray-600 text-sm mt-1 flex gap-2 items-center">

                                        {!data?.professor?.length ? (
                                            <>
                                                <Spinner className="size-4" />
                                                درس الزامی است
                                            </>
                                        ) : (
                                            <>
                                                <Check className="size-4" />
                                                <span>{data.professor[0].name}</span>
                                            </>
                                        )}
                                    </div>
                                </Field>
                            </div>





                            {/* دکمه‌ها */}
                            <div className="mt-6 flex justify-end gap-4">
                                <Button type="submit" disabled={ButtonState.isNotActive || ButtonState.isLoading || (!data?.professor?.length || !data?.lesson?.length)}>
                                    {ButtonState.isLoading ? (
                                        <span className="flex items-center space-x-2">
                                            <RefreshCcw className="animate-spin ml-2" />
                                            <span>در حال ذخیره...</span>
                                        </span>
                                    ) : (
                                        'ثبت'
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