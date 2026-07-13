"use client"

import { Button } from "@/components/ui/button"
import { CatIcon, Map, Code2, BookOpen, Users, Award, Clock, TrendingUp } from "lucide-react"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import MajorGraph from "../components/relationship/relations"
import { IBackMajor } from "../entity"
import Link from "next/link"

export default function ClientPage(param: { data: IBackMajor }) {

  const { data } = param
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

        </div>
      </div>

      {/* bottom section */}
      <div className="border-t-2 border-dashed w-full lg:w-10/12 mx-auto py-8 mt-8 px-3">

        <MajorGraph />

        <div>

          relations:
          <hr />
          <h1>lesson:</h1>
          {data.relationships?.lesson?.map((v, i) => {
            return (
              <Link href={`../../outlook/lessons/${v.id}`} key={i}>
                <Button >
                  {v.name}
                </Button >
              </Link>
            )
          })}
          <hr />

          <h1>major:</h1>
          {data.relationships?.university?.map((v, i) => {
            return (
              <Link href={`../../outlook/major/${v.id}`} key={i}>
                <Button >
                  {v.name}
                </Button >
              </Link>
            )
          })}


          <hr />
          <h1>professor:</h1>

          {data.relationships?.professor?.map((v, i) => {
            return (
              <Link href={`../../outlook/professors/${v.id}`} key={i}>
                <Button >
                  {v.name}
                </Button >
              </Link>
            )
          })}
        </div>

      </div>
    </>
  )
}