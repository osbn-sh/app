import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import Image from "next/image"
import { tableData } from "./columns"
import { Button } from "@/components/ui/button"
import { CatIcon, Map, GraduationCap, Briefcase, Award, BookOpen, Star, Users, ClipboardList, MessageCircle, HeartHandshake, TrendingUp, University } from "lucide-react"
import { IBackProfessor } from "../entity"
import { AxiosResponse } from "axios"
import { api } from "@/utils/api/base"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"





const ClientProfessor = (param: { data: IBackProfessor }) => {
  const { data } = param


  console.log(data);

  return (
    <>
      {/* بخش اصلی با چیدمان ریسپانسیو اصلاح شده */}
      <div className="flex flex-col lg:flex-row h-auto justify-center items-start w-full px-4 md:px-6 lg:w-10/12 mx-auto mt-8 md:mt-14 gap-y-8 lg:gap-x-10">

        {/* بخش تصویر استاد - در موبایل و تبلت در بالا قرار می‌گیرد */}
        <div className="w-full md:w-8/12 lg:w-4/12 mx-auto lg:mx-0">
          <div className="w-full aspect-square max-w-75 md:max-w-87.5 lg:max-w-full mx-auto rounded-2xl overflow-hidden border border-foreground border-dashed">
            <Image
              src={"https://blog.faradars.org/wp-content/uploads/2024/12/siavash-shahshahani.jpg"}
              width={400}
              height={400}
              alt="professor"
              className="object-cover w-full h-full opacity-75"
            />
          </div>
        </div>

        {/* بخش اطلاعات استاد */}
        <div className="flex-1 w-full lg:w-7/12 flex place-self-center flex-col gap-y-4">

          {/* نام و عنوان استاد */}
          <div className="w-full text-center lg:text-right">
            <h1 className="text-3xl md:text-4xl font-black">
              {data.name}
            </h1>
            <h2 className="mt-2 text-sm font-normal text-muted-foreground">
              {data.name_english} | استاد دانشگاه تهران
            </h2>
          </div>

          {/* توضیحات */}
          <div className="w-full h-auto leading-7 text-justify border-t border-b py-4 border-white/10 border-dashed">
            <p>
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {data.education_history?.map((v, i) => {
              return (
                <Button key={i} size="sm" variant="outline" className="gap-1.5 text-xs h-8 sm:h-9" title={v.year}>
                  {v.degree}
                  <Separator orientation="vertical" />
                  {v.field}
                  <Separator orientation="vertical" />
                  {v.university}

                </Button>


              )
            })}

          </div>

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
          {data.relationships?.major?.map((v, i) => {
            return (
              <Link href={`../../outlook/major/${v.id}`} key={i}>
                <Button >
                  {v.name}
                </Button >
              </Link>
            )
          })}


          <hr />
          <h1>university:</h1>

          {data.relationships?.university?.map((v, i) => {
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
      </div>
    </>
  );
}

export default ClientProfessor;