import React from 'react';
import ClientUniversity from './ClientUniversity';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CatIcon, Map, Building2, Users, BookOpen, GraduationCap, Trophy, Calendar, Award, FlaskConical, HeartHandshake, Users2, University } from "lucide-react"
import Image from "next/image"
import { columns, tableData } from "./columns"
import { DataTable } from "@/components/data-table"
import { Card, CardFooter } from "@/components/ui/card"
import { TUniversity } from "./tab"
import { Row } from "@tanstack/react-table"
import { Table } from "@/components/osbn/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import { SparklesText } from "@/components/ui/sparkles-text"
import { api } from '@/utils/api/base';
import { IBackUniversity } from '../entity';
import { AxiosResponse } from 'axios';

const TBdata: tableData[] = [
  { name: 'a', وضعیت: 'در حال پردازش' },
  { name: 'a', وضعیت: 'در حال پردازش' },
  { name: 'a', وضعیت: 'در حال پردازش' },
]



// تابع نمایش رتبه
const getRankColor = (rank: number) => {
  if (rank <= 3) return "bg-yellow-600 hover:bg-yellow-700"
  if (rank <= 10) return "bg-blue-600 hover:bg-blue-700"
  if (rank <= 30) return "bg-green-600 hover:bg-green-700"
  return "bg-gray-600 hover:bg-gray-700"
}

interface Rows {
  rowTitle: string[]
  cellData: string[][]
}

const table_data: Rows = {
  cellData: [
    ['محمدرضا', 'یمقانی'],
    ['رضا', 'گلزار'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['محمد رضا', 'شجریان'],
    ['حمید', 'هیراد'],
    ['علی', 'مددی']
  ],
  rowTitle: ['نام استاد', 'فامیلی استاد']
}

const repeat = ['اساتید', 'رشته ها', 'دروس']

const CardData: ICardItrationData = {
  detail: {
    category: 'اساتید برتر',
    data: [
      { title: 'محمد رضا یمقانی', button: { url: 'yamaghani', name: 'یمقانی' } },
      { title: 'سید علی حسینی', button: { url: 'hoseyni', name: 'حسینی' } },
      { title: 'رضا کریمی', button: { url: 'karimi', name: 'کریمی' } },
      { title: 'مریم رضایی', button: { url: 'rezaei', name: 'رضایی' } },
      { title: 'احمد نوری', button: { url: 'nouri', name: 'نوری' } },
      { title: 'زهرا موسوی', button: { url: 'mousavi', name: 'موسوی' } },
      { title: 'علیرضا صادقی', button: { url: 'sadeghi', name: 'صادقی' } },
      { title: 'فاطمه محمدی', button: { url: 'mohammadi', name: 'محمدی' } },
      { title: 'حسن تقوی', button: { url: 'taghavi', name: 'تقوی' } },
      { title: 'نگین حسنی', button: { url: 'hasani', name: 'حسنی' } },
      { title: 'مهدی عابدی', button: { url: 'abedi', name: 'عابدی' } },
      { title: 'سمیه کاظمی', button: { url: 'kazemi', name: 'کاظمی' } },
      { title: 'پیمان قاسمی', button: { url: 'ghasemi', name: 'قاسمی' } },
      { title: 'لیلا جعفری', button: { url: 'jafari', name: 'جعفری' } },
      { title: 'امیر رحمانی', button: { url: 'rahmani', name: 'رحمانی' } },
      { title: 'نرگس احمدی', button: { url: 'ahmadi', name: 'احمدی' } },
      { title: 'بهرام فتحی', button: { url: 'fathi', name: 'فتحی' } },
      { title: 'الهه مرادی', button: { url: 'moradi', name: 'مرادی' } },
      { title: 'کیوان سلطانی', button: { url: 'soltan', name: 'سلطانی' } },
      { title: 'سارا امینی', button: { url: 'amini', name: 'امینی' } }
    ],
  }
}



const Page = async ({ params }: { params: { slug: string } }) => {
  const Back_data: AxiosResponse<IBackUniversity> = await api.get(`/academic/university/${(await params).slug}`)

  const { data } = Back_data


  return (
    <div className="w-full overflow-x-hidden">
      {/* بخش اصلی - کاملاً ریسپانسیو و بدون شکستگی */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-8 md:mt-14">

        {/* چیدمان: در موبایل ستونی، در دسکتاپ سطری */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">

          {/* بخش تصویر - در موبایل حداکثر عرض 300px */}
          <div className="flex justify-center lg:justify-start shrink-0">
            <div className="w-65 xs:w-[280px] sm:w-75 md:w-85 lg:w-95 aspect-4/3 rounded-2xl overflow-hidden border border-foreground border-dashed bg-gray-100">
              <Image
                src={"/images/university.webp"}
                width={380}
                height={285}
                alt="دانشگاه"
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* بخش اطلاعات - در موبایل زیر تصویر */}
          <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">

            {/* عنوان دانشگاه */}
            <div className="text-center lg:text-right">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black wrap-break-word">
                <SparklesText>

                  {Back_data.data.name}


                </SparklesText>
              </h1>
              <h2 className="text-xs sm:text-sm text-muted-foreground mt-1">
                {data.name_english} University
              </h2>
            </div>

            {/* توضیحات */}
            <div className="border-t border-b py-3 sm:py-4 border-white/10 border-dashed">
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-justify">
                {data.description}
              </p>
            </div>


            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9">
                <Map className="size-3 sm:size-3.5" />
                {data.city}
              </Button>

              <Button size="sm" variant="secondary" className="gap-1.5 text-xs h-8 sm:h-9">

                <University className="size-3 sm:size-3.5" />
                {data.category}
              </Button>


              <Button size="sm" variant="secondary" className="gap-1.5 text-xs h-8 sm:h-9">
                <Users2 className="size-3 sm:size-3.5" />
                {data.users_count}
              </Button>
            </div>
          </div>
        </div>
        <div>

          {data.relationships?.lesson?.map((v, i) => {
            return (
              <div key={i}>
                {v.name}
              </div>
            )
          })}


          {data.relationships?.major?.map((v, i) => {
            return (
              <div key={i}>
                {v.name}
              </div>
            )
          })}

          {data.relationships?.professor?.map((v, i) => {
            return (
              <div key={i}>
                {v.name}
              </div>
            )
          })}
        </div>



      </div>
    </div>
  );
}

export default Page;
