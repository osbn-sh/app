"use client"

import { Button } from "@/components/ui/button"
import { CatIcon, Map, Code2, BookOpen, Users, Award, Clock, TrendingUp } from "lucide-react"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import MajorGraph from "../components/relationship/relations"

// --- data ---
const data = {
  id: "3",
  name: "مهندسی کامپیوتر",
  name_english: "Computer Engineering",
  description:
    "رشته مهندسی کامپیوتر به طراحی، پیاده‌سازی و مدیریت سیستم‌های کامپیوتری و نرم‌افزاری می‌پردازد.",
  duration: 4,
  credits: 140,
  students_count: 450,
  professors_count: 35,
  difficulty: "سخت",
}

const CardData: ICardItrationData = {
  detail: {
    category: "اساتید این رشته",
    data: [
      { title: "محمد رضا یمقانی", button: { url: "yamaghani", name: "یمقانی" } },
      { title: "سید علی حسینی", button: { url: "hoseyni", name: "حسینی" } },
      { title: "رضا کریمی", button: { url: "karimi", name: "کریمی" } },
    ],
  },
}

export default function ClientPage() {
  return (
    <>
      <div className="flex h-auto justify-start lg:justify-center items-start w-full px-3 sm:px-4 md:px-6 lg:px-0 lg:w-10/12 mx-auto mt-14 gap-x-10 flex-wrap">

        <div className="flex lg:w-7/12 md:w-10/12 w-full flex-wrap gap-y-4">

          {/* title */}
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-black text-center md:text-start">
              {data.name}
            </h1>
            <h2 className="text-xs sm:text-sm text-center md:text-start mt-1">
              {data.name_english}
            </h2>
          </div>

          {/* description */}
          <div className="w-full border-t border-b py-4 border-dashed border-white/10 text-justify">
            {data.description}
          </div>

          {/* buttons */}
          <div className="w-full flex flex-wrap gap-2">
            <Button><Clock /> {data.duration} سال</Button>
            <Button variant="secondary"><BookOpen /> {data.credits} واحد</Button>
            <Button variant="outline"><Users /> {data.students_count}</Button>
            <Button><Award /> {data.professors_count}</Button>
            <Button variant="destructive"><Code2 /> سطح {data.difficulty}</Button>
          </div>

        </div>
      </div>

      {/* bottom section */}
      <div className="border-t-2 border-dashed w-full lg:w-10/12 mx-auto py-8 mt-8 px-3">

        <MajorGraph />

        <div className="mt-8">
          <CardItrationView detail={CardData.detail} />
        </div>

        <div className="mt-4">
          <CardItrationView detail={CardData.detail} />
        </div>

      </div>
    </>
  )
}