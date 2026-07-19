import {
  CardItrationView,
  ICardItrationData,
} from "@/components/osbn/cardItreation";
import Image from "next/image";
import { tableData } from "./columns";
import { Button } from "@/components/ui/button";
import {
  CatIcon,
  Map,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Star,
  Users,
  ClipboardList,
  MessageCircle,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { IProfessor } from "@/entity/professor";
import relationExistCheck from "@/lib/relationExistence";
import RelationProfessor from "../components/relations";
import { IBackProfessor } from "../entity";
import VotingArea from "@/components/osbn/vote/votingArea";
import { IVote } from "@/entity/vote";
import RatingProfessor from "../components/rating";

const ClientProfessor = (param: { data: IBackProfessor, vote: IVote, slug: string }) => {
  const { data, vote, slug } = param;

  return (
    <>
      {/* بخش اصلی با چیدمان ریسپانسیو اصلاح شده */}
      <div className="flex flex-col lg:flex-row h-auto justify-center items-start w-full px-4 md:px-6 lg:w-10/12 mx-auto mt-8 md:mt-14 gap-y-8 lg:gap-x-10">
        {/* بخش تصویر استاد - در موبایل و تبلت در بالا قرار می‌گیرد */}
        <div className="w-full md:w-8/12 lg:w-4/12 mx-auto lg:mx-0">
          <div className="w-full aspect-square max-w-75 md:max-w-87.5 lg:max-w-full mx-auto rounded-2xl overflow-hidden border border-foreground border-dashed">
            <Image
              src={data.image_url}
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
            <h1 className="text-3xl md:text-4xl font-black">{data.name}</h1>
            <h2 className="mt-2 text-sm font-normal text-muted-foreground">
              {data.name_english} | استاد دانشگاه تهران
            </h2>
          </div>

          {/* توضیحات */}
          <div className="w-full h-auto leading-7 text-justify border-t border-b py-4 border-white/10 border-dashed">
            <p>{data.description}</p>

          </div>
          <p>{data.description_english}</p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2">

            {relationExistCheck.professor(data.relationships)
              &&
              <RelationProfessor data={data.relationships} />
            }
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            <RatingProfessor id={slug} />
          </div>
        </div>



      </div>

      {/* بخش ویژگی‌های حرفه‌ای استاد */}

      {/* تحصیلات استاد */}
      <div className="border-t-2 border-dashed w-11/12 md:w-10/12 mx-auto pt-8 md:pt-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 flex items-center justify-center gap-2">
          <GraduationCap className="size-5 md:size-6" />
          سوابق تحصیلی
        </h2>

        <div className="flex flex-col gap-4 mb-10">
          {data.education_history.map((edu, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-xl p-4 border border-dashed flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <div className="text-center sm:text-right">
                <span className="font-bold text-base md:text-lg">
                  {edu.degree}
                </span>
                <span className="text-muted-foreground mx-2">|</span>
                <span className="text-sm md:text-base">{edu.field}</span>
              </div>
              <div className="text-muted-foreground text-center sm:text-left text-sm md:text-base">
                {edu.university} | {edu.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto">
        <VotingArea data={
          vote.map((v, i) => {
            return (

              {
                option: v.OptionName, value: v.AverageRate * 10
              }

            )
          })
        } />
      </div>

    </>
  );
};

export default ClientProfessor;
