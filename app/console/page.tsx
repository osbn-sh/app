"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/utils/api/base";

import { BadgeCheck, Check, CircleX, Clock3, FilePenLine, Hourglass, List, Plus, PlusCircle, Scroll } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IGetPendingsMy } from "./entity";
import { AxiosResponse } from "axios";
import { Card, CardTitle } from "@/components/ui/card";
import { CardArea } from "@/components/CardArea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/label";
import { AgoDateCalculator, PersianData } from "@/lib/date";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Page() {

  const [data, setData] = useState<IGetPendingsMy>()

  useEffect(() => {
    (async () => {

      try {



        const data: AxiosResponse<IGetPendingsMy> = await api.get("/manipulation/my-all")

        setData(data.data)

      } catch {

      }




    })()
  })

  return (
    <>







      <div className="flex gap-4 p-4 pt-0">


        <Link href={"/console/append/university"}>
          <Button className=" flex justify-center items-center" variant={"outline"}>
            <PlusCircle />
            افزودن دانشگاه
          </Button>
        </Link>


        <Link href={"/console/append/lesson"}>
          <Button className=" flex justify-center items-center" variant={"outline"}>
            <PlusCircle />
            افزودن درس
          </Button>
        </Link>


        <Link href={"/console/append/major"}>
          <Button className=" flex justify-center items-center" variant={"outline"}>
            <PlusCircle />
            افزودن رشته
          </Button>
        </Link>

        <Link href={"/console/append/professor"}>
          <Button className=" flex justify-center items-center" variant={"outline"}>
            <PlusCircle />
            افزودن استاد
          </Button>
        </Link>





      </div>


      <div className="grid grid-cols-4 gap-3">


        {data?.professor.map((v, i) => {
          return (
            <Drawer key={i} swipeDirection="down" >
              <DrawerTrigger render={<Button variant="outline" />}>{v.name}</DrawerTrigger>
              <DrawerContent className="max-w-120 mx-auto">
                <DrawerHeader>
                  <div className="flex gap-2 ">
                    <Kbd>{v.action}</Kbd>
                    <Kbd>استاد</Kbd>
                    <Kbd>{v.name}</Kbd>
                  </div>
                </DrawerHeader>
                <div className="p-4 max-h-[50vhs] overflow-y-scroll">

                  <SeperatorHere name="نام " />
                  {v.name}

                  <SeperatorHere name="نام انگلیسی" />
                  {v.name_english}

                  <SeperatorHere name="توضیحات" />
                  {v.description}



                  <SeperatorHere name="توضیحات انگلیسی" />
                  {v.description_english}


                  <SeperatorHere name="وضعیت " />
                  {v.status}


                  <SeperatorHere name="آدرس عکس " />
                  <img src={v.image_url} alt="" className="w-32 aspect-square" />


                  <SeperatorHere name="نوع درخواست" />
                  {v.action}

                  <SeperatorHere name="تحصیلات" />
                  {v.education_history.map((v, i) => {
                    return (
                      <div key={i} className="flex my-3">

                        <div>{v.degree}</div>,
                        <div>{v.field}</div>,
                        <div>{v.university}</div>

                      </div>
                    )
                  })}

                  <SeperatorHere name="تاریخ ثبت" />
                  {PersianData(v.submitted_at)}





                </div>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          )
        })}


        {data?.lesson.map((v, i) => {
          return (
            <Drawer key={i} swipeDirection="down" >
              <DrawerTrigger render={<Button variant="outline" />}>{v.name}</DrawerTrigger>
              <DrawerContent className="max-w-120 mx-auto">
                <DrawerHeader>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <ActionHere action={v.action} />
                    <ButtonStatusHere status={v.status} />

                    <DateHere approved_at={v.approved_at} status={v.status} submitted_at={v.submitted_at} />





                    {v.status == "rejected" &&
                      <div className="w-full text-right">
                        <div className="font-black text-2xl">علت رد :</div>
                        <div className="text-xl">{v.rejection_reason}</div>
                      </div>
                    }
                  </div>
                </DrawerHeader>
                {v.status == "pending" &&

                  <div className="p-4 max-h-[50vhs] overflow-y-scroll">
                    <div className="text-2xl font-bold">
                      اطلاعات ثبت شده:
                    </div>
                    <SeperatorHere name="نام " />
                    {v.name}

                    <SeperatorHere name="نام انگلیسی" />
                    {v.name_english}

                    <SeperatorHere name="توضیحات" />
                    {v.description}



                    <SeperatorHere name="توضیحات انگلیسی" />
                    {v.description_english}


                    <SeperatorHere name="وضعیت " />
                    {v.status}


                    <SeperatorHere name="دلیل رد" />
                    {v.rejection_reason}


                    <SeperatorHere name="نوع درخواست" />
                    {v.action}

                    <SeperatorHere name="سختی" />
                    {v.difficulty}




                    <SeperatorHere name="تاریخ ثبت" />






                  </div>
                }
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          )
        })}
        {data?.major.map((v, i) => {
          return (
            <Card key={i}>
              <CardTitle>
                {v.name}
              </CardTitle>
            </Card>

          )
        })}
        {data?.university.map((v, i) => {
          return (
            <Card key={i}>
              <CardTitle>
                {v.name}
              </CardTitle>
            </Card>

          )
        })}
      </div>
    </>
  )
}



const SeperatorHere = (data: { name: string }) => {
  return (
    <>
      <hr className="mt-4" />
      <Label className="mb-4 mt-4">
        {data.name}
      </Label>
    </>
  )
}



const ButtonStatusHere = (data: { status: string }) => {

  if (data.status == "pending") {
    return (
      <Button variant={"outline"}>
        <Clock3 className="h-4 w-4" />
        در انتظار بررسی
      </Button>
    )
  }

  if (data.status == "approved") {
    return (
      <Button variant={"default"}>
        <BadgeCheck className="h-4 w-4" />
        تایید شده
      </Button>
    )
  }
  if (data.status == "rejected") {
    return (
      <Button variant={"destructive"}>
        <CircleX className="w-4" />
        عدم تایید
      </Button>
    )
  }

}


const ActionHere = (data: { action: string }) => {

  return (
    <>
      {
        data.action === "update" ? (
          <Tooltip>
            <TooltipTrigger render={<Button variant={"ghost"}><FilePenLine /></Button>} />
            <TooltipContent>درخواست تغییر</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger render={<Button variant={"ghost"}><Plus /></Button>} />
            <TooltipContent>درخواست ایجاد</TooltipContent>
          </Tooltip>
        )
      }
    </>
  )
}


const DateHere = (v: { approved_at?: string, status: string, submitted_at: string }) => {

  return (
    <>
      {v.approved_at ?
        <Tooltip>
          <TooltipTrigger render={<Button variant={v.status == "rejected" ? "destructive" : "default"}>
            <FilePenLine />
            {AgoDateCalculator(v.approved_at)}
          </Button>} />
          <TooltipContent>تاریخ
            {v.status == "rejected" ? " رد " : " تایید "}
          </TooltipContent>
        </Tooltip>
        :
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary">
            <PlusCircle />
            {AgoDateCalculator(v.submitted_at)}
          </Button>} />
          <TooltipContent>
            تاریخ ثبت
          </TooltipContent>
        </Tooltip>
      }
    </>
  )
}