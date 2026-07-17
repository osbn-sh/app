"use client"

import { Button } from "@/components/ui/button"
import { CatIcon, Map, Code2, BookOpen, Users, Award, Clock, TrendingUp, University, Users2 } from "lucide-react"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import MajorGraph from "../components/relationship/relations"
import { IBackMajor } from "../entity"
import Link from "next/link"
import RelationMajor from "../components/relations"
import { SparklesText } from "@/components/ui/sparkles-text"
import relationExistCheck from "@/lib/relationExistence"

export default function ClientPage(param: { data: IBackMajor }) {

  const { data } = param
  return (
    <div className="w-full overflow-x-hidden">
      {/* بخش اصلی - کاملاً ریسپانسیو و بدون شکستگی */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-8 md:mt-14">

        {/* چیدمان: در موبایل ستونی، در دسکتاپ سطری */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">


          {/* بخش اطلاعات - در موبایل زیر تصویر */}
          <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">

            {/* عنوان دانشگاه */}
            <div className="text-center lg:text-right">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black wrap-break-word">
                <SparklesText>
                  {data.name}
                </SparklesText>
              </h1>
              <h2 className="text-xs sm:text-sm text-muted-foreground mt-1">
                {data.name_english}
              </h2>
            </div>

            {/* توضیحات */}
            <div className="border-t border-b py-3 sm:py-4 border-white/10 border-dashed">
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-justify">
                {data.description}
              </p>
            </div>


            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {/* <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9">
                <Map className="size-3 sm:size-3.5" />
                {data.description}sss
              </Button>

              <Button size="sm" variant="secondary" className="gap-1.5 text-xs h-8 sm:h-9">

                <University className="size-3 sm:size-3.5" />
                {data.name_english}
              </Button>


              <Button size="sm" variant="secondary" className="gap-1.5 text-xs h-8 sm:h-9">
                <Users2 className="size-3 sm:size-3.5" />
                {data.description_english}
              </Button> */}

              {relationExistCheck.major(data.relationships)
                &&
                <RelationMajor data={data.relationships} />
              }
            </div>
          </div>
        </div>




      </div>
    </div>
  )
}