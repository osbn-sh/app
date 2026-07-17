"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/utils/api/base";

import { BadgeCheck, BookOpen, Check, CircleX, Clock3, FilePenLine, GraduationCap, Hourglass, List, Plus, PlusCircle, Scroll, University, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IGetPendingsMy } from "./entity";
import { AxiosResponse } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {

  const [data, setData] = useState<IGetPendingsMy | null>()

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



      {!!!data ?
        <div className="grid grid-cols-4 gap-4 p-4 mask-b-from-5%">

          {Array.from({ length: 10 }).map((v, i) => {
            return (
              <Card key={i} >
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-video w-full" />
                </CardContent>
              </Card>
            )
          })}

        </div>
        :


        <div className="grid grid-cols-4 gap-4 p-4">


          {data?.professor.map((v, i) => {
            return (
              <Drawer key={i} swipeDirection="down" >
                <DrawerTrigger render={<button><RenderButtonHere action={v.action} name={v.name} entity="استاد" status={v.status} /></button>}>{v.name}</DrawerTrigger>
                <DrawerContent className="max-w-120 mx-auto">
                  <DrawerHeader>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <ActionHere action={v.action} />
                      <ButtonStatusHere status={v.status} />
                      <DateHere approved_at={v.approved_at} status={v.status} submitted_at={v.submitted_at} />

                      {v.status == "rejected" &&
                        <div className="w-full text-right">
                          <div className="font-black text-xl">علت رد :</div>
                          <div className="text-xl">{v.rejection_reason}</div>
                        </div>
                      }

                    </div>
                  </DrawerHeader>
                  {v.status == "pending" &&

                    <div className="p-4 max-h-[50vhs] overflow-y-scroll">
                      <Table>
                        <TableBody>

                          <TableRow >
                            <TableHead>نام</TableHead>
                            <TableCell>{v.name}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>نام انگلیسی</TableHead>
                            <TableCell>{v.name_english}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات</TableHead>
                            <TableCell>{v.description}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات انگلیسی</TableHead>
                            <TableCell>{v.description_english}</TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>تصویر</TableHead>
                            <TableCell>
                              {v.image_url ? <img src={v.image_url} width={100} alt="" /> : <>ندارد!</>}
                            </TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>تحصیلات</TableHead>
                            <TableCell>{v.education_history.map((v, i) => {
                              return (
                                <div key={i}>
                                  {` ${v.degree} | ${v.field} | ${v.university}`}



                                </div>
                              )
                            })}</TableCell>
                          </TableRow>



                        </TableBody>
                      </Table>
                    </div>
                  }
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
                <DrawerTrigger render={<button><RenderButtonHere action={v.action} name={v.name} entity="درس" status={v.status} /></button>}>{v.name}</DrawerTrigger>
                <DrawerContent className="max-w-120 mx-auto">
                  <DrawerHeader>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <ActionHere action={v.action} />
                      <ButtonStatusHere status={v.status} />
                      <DateHere approved_at={v.approved_at} status={v.status} submitted_at={v.submitted_at} />

                      {v.status == "rejected" &&
                        <div className="w-full text-right">
                          <div className="font-black text-xl">علت رد :</div>
                          <div className="text-xl">{v.rejection_reason}</div>
                        </div>
                      }

                    </div>
                  </DrawerHeader>
                  {v.status == "pending" &&

                    <div className="p-4 max-h-[50vhs] overflow-y-scroll">
                      <Table>
                        <TableBody>

                          <TableRow >
                            <TableHead>نام</TableHead>
                            <TableCell>{v.name}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>نام انگلیسی</TableHead>
                            <TableCell>{v.name_english}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات</TableHead>
                            <TableCell>{v.description}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات انگلیسی</TableHead>
                            <TableCell>{v.description_english}</TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>سختی</TableHead>
                            <TableCell>{v.difficulty}</TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>ترم</TableHead>
                            <TableCell>{v.term}</TableCell>
                          </TableRow>



                        </TableBody>
                      </Table>
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
              <Drawer key={i} swipeDirection="down" >
                <DrawerTrigger render={<button><RenderButtonHere action={v.action} name={v.name} entity="رشته" status={v.status} /></button>}>{v.name}</DrawerTrigger>
                <DrawerContent className="max-w-120 mx-auto">
                  <DrawerHeader>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <ActionHere action={v.action} />
                      <ButtonStatusHere status={v.status} />
                      <DateHere approved_at={v.approved_at} status={v.status} submitted_at={v.submitted_at} />

                      {v.status == "rejected" &&
                        <div className="w-full text-right">
                          <div className="font-black text-xl">علت رد :</div>
                          <div className="text-xl">{v.rejection_reason}</div>
                        </div>
                      }

                    </div>
                  </DrawerHeader>
                  {v.status == "pending" &&

                    <div className="p-4 max-h-[50vhs] overflow-y-scroll">
                      <Table>
                        <TableBody>

                          <TableRow >
                            <TableHead>نام</TableHead>
                            <TableCell>{v.name}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>نام انگلیسی</TableHead>
                            <TableCell>{v.name_english}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات</TableHead>
                            <TableCell>{v.description}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات انگلیسی</TableHead>
                            <TableCell>{v.description_english}</TableCell>
                          </TableRow>






                        </TableBody>
                      </Table>
                    </div>
                  }
                  <DrawerFooter>
                    <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

            )
          })}
          {data?.university.map((v, i) => {
            return (
              <Drawer key={i} swipeDirection="down" >
                <DrawerTrigger render={<button><RenderButtonHere action={v.action} name={v.name} entity="دانشگاه" status={v.status} /></button>}>{v.name}</DrawerTrigger>
                <DrawerContent className="max-w-120 mx-auto">
                  <DrawerHeader>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <ActionHere action={v.action} />
                      <ButtonStatusHere status={v.status} />
                      <DateHere approved_at={v.approved_at} status={v.status} submitted_at={v.submitted_at} />

                      {v.status == "rejected" &&
                        <div className="w-full text-right">
                          <div className="font-black text-xl">علت رد :</div>
                          <div className="text-xl">{v.rejection_reason}</div>
                        </div>
                      }

                    </div>
                  </DrawerHeader>
                  {v.status == "pending" &&

                    <div className="p-4 max-h-[50vhs] overflow-y-scroll">
                      <Table>
                        <TableBody>

                          <TableRow >
                            <TableHead>نام</TableHead>
                            <TableCell>{v.name}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>نام انگلیسی</TableHead>
                            <TableCell>{v.name_english}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات</TableHead>
                            <TableCell>{v.description}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>توضیحات انگلیسی</TableHead>
                            <TableCell>{v.description_english}</TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>نوع دانشگاه</TableHead>
                            <TableCell>{v.category}</TableCell>
                          </TableRow>


                          <TableRow >
                            <TableHead>شهر</TableHead>
                            <TableCell>{v.city}</TableCell>
                          </TableRow>

                          <TableRow >
                            <TableHead>تصویر</TableHead>
                            <TableCell>
                              {v.image_url ? <img src={v.image_url} width={100} alt="" /> : <>ندارد!</>}
                            </TableCell>
                          </TableRow>




                        </TableBody>
                      </Table>
                    </div>
                  }
                  <DrawerFooter>
                    <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

            )
          })}
        </div>

      }
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

const ColorGuesser = (status: string): string => {
  switch (status) {
    case "approved":
      return "color-mix(in oklab, var(--color-green-950) 10%, transparent)";

    case "rejected":
      return "color-mix(in oklab, var(--color-red-950) 10%, transparent)";

    default:
      return "transparent";
  }
};
const RenderButtonHere = (v: { name: string, action: string, entity: "استاد" | "رشته" | "دانشگاه" | "درس", status: string }) => {

  return (


    <Card className="hover:translate-y-0.5 transition-transform cursor-pointer " style={{
      backgroundColor: ColorGuesser(v.status)

    }}>
      <CardHeader>

        <div className="flex gap-2 mt-2 items-center">

          {v.status == "rejected" && <CircleX className="size-4" />}
          {v.status == "approved" && <BadgeCheck className="size-4" />}
          {v.status == "pending" && <Clock3 className="size-4" />}

          |

          {v.entity == "رشته" && <GraduationCap className="size-4" />}
          {v.entity == "استاد" && <UserRound className="size-4" />}
          {v.entity == "دانشگاه" && <University className="size-4" />}
          {v.entity == "درس" && <BookOpen className="size-4" />}

          <CardTitle> {v.entity} {v.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex">
          <Kbd>

            {v.action == "update" ?
              <>
                <Plus />
                درخواست افزودن
              </>
              :
              <>
                <FilePenLine />
                درخواست تغییر
              </>
            }
          </Kbd>

        </div>
      </CardContent>
    </Card>

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



