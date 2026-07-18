"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/utils/api/base";

import { BadgeCheck, BookOpen, Check, CircleX, Clock3, ExternalLink, ExternalLinkIcon, FilePenLine, GraduationCap, Hourglass, Link2, List, Pen, Pencil, Plus, PlusCircle, Recycle, Scroll, Trash, University, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IGetPendingsMy } from "./entity";
import { AxiosResponse } from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ActionHere, ButtonStatusHere, DateHere, RenderButtonHere } from "./lib";
import { passedLessonProfessorUniversity } from "@/entity/passedLessonProfessorUniversity";
import { Input } from "@/components/ui/input";

export default function Page() {

  const [data, setData] = useState<IGetPendingsMy | null>()
  const [dataPassed, setDataPassed] = useState<passedLessonProfessorUniversity[] | null>()

  useEffect(() => {
    (async () => {

      try {



        const data: AxiosResponse<IGetPendingsMy> = await api.get("/manipulation/my-all")
        setData(data.data)


        const dataPassed: AxiosResponse<passedLessonProfessorUniversity[]> = await api.get("/student/pass")
        setDataPassed(dataPassed.data)

      } catch {

      }




    })()
  }, [])



  async function RemoveClick(id: number) {
    try {
      const deletef = await api.delete(`/student/pass/${id}`)
      const dataPassed: AxiosResponse<passedLessonProfessorUniversity[]> = await api.get("/student/pass")
      setDataPassed(dataPassed.data)
    }
    catch{}
  }

  return (
    <>







      <div className="flex flex-wrap gap-4 p-4 pt-0">


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


        <Link href={"/console/passed_lesson"}>
          <Button className=" flex justify-center items-center" variant={"outline"}>
            <PlusCircle />
            افزودن درس پاس شده
          </Button>
        </Link>




      </div>



      {!!!data ?
        <div className="grid md:grid-cols-4 gap-4 p-4 mask-b-from-5%">

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


        <div className="grid md:grid-cols-4 gap-4 p-4 max-h-[40vhs]">


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


      <hr className="my-12 mx-4" />


      {!!!dataPassed ?
        <div className="grid md:grid-cols-4 gap-4 p-4 mask-b-from-5%">

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



        <div className="grid md:grid-cols-4 gap-4 p-4">


          {dataPassed?.map((v, i) => {
            return (
              <Card key={i} >
                <CardContent>


                  <Table>
                    <TableBody>

                      <TableRow >
                        <TableHead>درس</TableHead>
                        <TableCell>{v.LessonName}</TableCell>
                        <TableCell>
                          <Link href={`/outlook/lessons/${v.LessonID}`}>
                            <Button variant={"link"}><ExternalLink /></Button>
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow >
                        <TableHead>رشته</TableHead>
                        <TableCell>{v.MajorName}</TableCell>
                        <TableCell>
                          <Link href={`/outlook/majors/${v.MajorID}`}>
                            <Button variant={"link"}><ExternalLink /></Button>
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow >
                        <TableHead>استاد</TableHead>
                        <TableCell>{v.ProfessorName}</TableCell>
                        <TableCell>
                          <Link href={`/outlook/professors/${v.ProfessorID}`}>
                            <Button variant={"link"}><ExternalLink /></Button>
                          </Link>
                        </TableCell>

                      </TableRow>

                      <TableRow >
                        <TableHead>دانشگاه</TableHead>
                        <TableCell>{v.UniversityName}</TableCell>
                        <TableCell>
                          <Link href={`/outlook/universities/${v.UniversityID}`}>
                            <Button variant={"link"}><ExternalLink /></Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                </CardContent>
                <CardFooter>

                  <Button variant={"destructive"} className={" cursor-help"} onClick={() => { RemoveClick(v.PlpuID) }}>
                    <Trash className="size-3" />
                    حذف
                  </Button>





                </CardFooter>
              </Card>
            )
          })}

        </div>



      }
    </>
  )
}






