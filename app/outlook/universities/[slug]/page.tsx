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
import RelationUniversity from '../components/relations';
import { IVote } from '@/entity/vote';
import ChartOsbn from '@/components/osbn/vote/chart';
import relationExistCheck from '@/lib/relationExistence';
import VotingArea from '@/components/osbn/vote/votingArea';
import { Metadata } from 'next';



const Page = async ({ params }: { params: { slug: string } }) => {

  const { slug } = (await params)

  const Back_data: AxiosResponse<IBackUniversity> = await api.get(`/academic/university/${slug}`)

  const { data } = Back_data

  const VoteData: AxiosResponse<IVote> = await api.get(`/vote/university/${slug}`)





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

              {relationExistCheck.university(data.relationships)
                &&
                <RelationUniversity data={data.relationships} />
              }
            </div>
          </div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto">
          <VotingArea data={
            VoteData.data.map((v, i) => {
              return (

                {
                  option: v.OptionName, value: v.AverageRate * 10
                }

              )
            })
          } />

        </div>

      </div>
    </div>
  );
}




export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const { slug } = await params;

  const { data } = await api.get(`/academic/university/${slug}`);

  return {
    title: data.name,
    description: data.description,
  };
}



export default Page;