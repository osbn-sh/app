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
import { Building2, Users, Calendar, Trophy, Award, Plus, X, Globe, Phone, Mail, MapPin } from "lucide-react"
import { CardArea, CardAreaWrapper } from "@/components/CardArea"
import { toast } from "sonner"
import { University } from "@/entity/entity"
import { IRAN_CITIES } from "@/lib/cities"

export function UniversityComponent1(data: { university: University, slug: string }) {
  return (
    <CardAreaWrapper>

      <FormExample university={data.university} slug={data.slug} />
    </CardAreaWrapper>
  )
}



const universityOption = [
  "دانشگاه دولتی",
  "دانشگاه آزاد",
  "آزاد",
  "غیر انتفاعی",
  "پیام نور",
  "علمی کاربردی"
] as const



type FormValues = {
  name: string
  name_english: string
  description: string
  description_english: string
  city: string
  category: string
  image_url: string

}



export default function FormExample(data: { university: University, slug: string }) {
  const { slug } = data
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: data.university,
  })



  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    if (!data.city || data.city.length < 1) {
      toast.error('شهر را انتخاب کنید')
      setIsLoading(false)
      return
    }

    if (!data.category || data.category.length < 1) {
      toast.error('دسته بندی را انتخاب کنید')
      setIsLoading(false)
      return
    }



    try {
      console.log("Form submitted:", data)

      const response = await api.put(`/manipulation/university/${slug}`, data)

      router.push('/console')
      console.log(response.data)

      toast.success(
        'با موفقیت به لیست معلق‌ها اضافه شد!'
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
    <CardArea className="container w-full mx-auto">
      <Card className="flex flex-col p-4 w-full">
        <CardTitle className="text-xl font-semibold mb-2">ویرایش دانشگاه</CardTitle>
        <CardDescription className="mb-4 text-sm text-gray-600">
          لطفاً بخش های مورد نظر را ویرایش نمایید
        </CardDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <FieldGroup>
            {/* ردیف اول: نام دانشگاه و نام انگلیسی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="university-name">نام دانشگاه</FieldLabel>
                <Input
                  {...register("name", { required: true })}
                  id="university-name"
                  placeholder="نام دانشگاه"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="university-name-en">نام انگلیسی</FieldLabel>
                <Input
                  {...register("name_english", { required: true })}
                  id="university-name-en"
                  dir="ltr"
                  placeholder="University name in English"
                />
              </Field>
            </div>

            {/* توضیحات فارسی و انگلیسی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Field>
                <FieldLabel htmlFor="description">توضیحات</FieldLabel>
                <Textarea
                  {...register("description", { required: true })}
                  id="description"
                  placeholder="توضیحات دانشگاه"
                  rows={3}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="english-description">توضیحات به انگلیسی</FieldLabel>
                <Textarea
                  {...register("description_english", { required: true })}
                  id="english-description"
                  dir="ltr"
                  placeholder="English description"
                  rows={3}
                />
              </Field>
            </div>
            {watch('city')}
            {data.university.city}
            {data.university.category}
            {/* شهر و نوع دانشگاه */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Field>
                <FieldLabel htmlFor="small-form-framework">شهر را انتخاب کنید</FieldLabel>
                <Combobox
                  onValueChange={(value: string | null) => setValue("city", value ?? "")}
                  items={IRAN_CITIES}
                >
                  <ComboboxInput
                    value={watch('city')}
                    {...register("city", { required: true })}
                    id="small-form-framework"
                    placeholder="Select your city"
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

              <Field>
                <FieldLabel htmlFor="small-form-university">نوع دانشگاه را انتخاب کنید</FieldLabel>
                <Combobox
                  items={universityOption}
                  onValueChange={(value: string | null) => setValue("category", value ?? "")}
                >
                  <ComboboxInput
                    value={watch('category')}
                    id="small-form-university"
                    placeholder="Select a university type"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>نوعی یافت نشد</ComboboxEmpty>
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



            {/* آدرس عکس */}
            <div className="mt-4">
              <Field>
                <FieldLabel htmlFor="image-url">آدرس عکس</FieldLabel>
                <Input
                  {...register("image_url", { required: true })}
                  id="image-url"
                  dir="ltr"
                  placeholder="https://example.com/image.jpg"
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
                  'ذخیره تغییرات'
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
  )
}