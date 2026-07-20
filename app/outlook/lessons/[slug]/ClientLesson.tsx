import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import { Button } from "@/components/ui/button"
import { Award, Code2, TrendingUp, Clock, BookOpen, Users, Star, AlertCircle, Brain, Calculator, Users2 } from "lucide-react"
import MajorGraph from "../../majors/components/relationship/relations"
import { IBackLesson } from "../entity"
import Link from "next/link"
import RelationLessons from "../components/relations"
import relationExistCheck from "@/lib/relationExistence"
import Requities from "../components/requities"


const getDifficultyInfo = (level: number): { text: string; color: string; variant: "default" | "destructive" | "outline" | "secondary" } => {
  switch (level) {
    case 1:
      return { text: "ساده", color: "bg-green-500", variant: "default" }
    case 2:
      return { text: "متوسط", color: "bg-blue-500", variant: "default" }
    case 3:
      return { text: "چالش‌برانگیز", color: "bg-yellow-500", variant: "default" }
    case 4:
      return { text: "سخت", color: "bg-orange-500", variant: "destructive" }
    case 5:
      return { text: "وحشتناک", color: "bg-red-500", variant: "destructive" }
    default:
      return { text: "نامشخص", color: "bg-gray-500", variant: "outline" }
  }
}


const ClientLesson = (param: { data: IBackLesson }) => {
  const { data } = param
  const difficultyInfo = getDifficultyInfo(data.difficulty)

  return (
    <>
      <div className="flex h-auto justify-start lg:justify-center items-start w-full px-3 sm:px-4 md:px-6 lg:px-0 lg:w-10/12 mx-auto mt-14 gap-x-10 flex-wrap">

        <div className="flex lg:w-7/12 md:w-10/12 w-full items-center flex-wrap gap-y-4 mx-auto md:mx-0">

          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl md:text-start text-center font-black w-full">
              {data.name}
            </h1>
            <h2 className="mt-1 text-xs sm:text-sm md:text-start text-center font-normal w-full text-muted-foreground">
              {data.name_english}
            </h2>
          </div>

          <div className="w-full h-auto leading-6 sm:leading-7 text-justify border-t border-b py-3 sm:py-4 border-white/10 border-dashed">
            <p className="text-sm sm:text-base">
              {data.description}
            </p>
          </div>

          {/* تمام دکمه‌ها با هم در یک بخش */}
          <div className="w-full flex flex-wrap justify-center sm:justify-center md:justify-start items-center gap-2 sm:gap-3">

            {/* دکمه سطح سختی */}
            <Button
              variant={difficultyInfo.variant}
              className={`gap-1 sm:gap-2 ${difficultyInfo.color} hover:opacity-80 text-white text-xs sm:text-sm`}
            >
              <AlertCircle className="size-3 sm:size-4" />
              <span className="whitespace-nowrap">{difficultyInfo.text}</span>
            </Button>

            {/* دکمه ترم */}
            <Button variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Clock className="size-3 sm:size-4" />
              <span className="whitespace-nowrap">ترم {data.term}</span>
            </Button>

            <Button size="sm" variant="secondary" className="gap-1.5 text-xs h-8 sm:h-9">
              <Users2 className="size-3 sm:size-3.5" />
              {data.users_count}
            </Button>

            {relationExistCheck.lesson(data.relationships)
              &&
              <RelationLessons data={data.relationships} />
            }



           
              <Requities data={{ co_requites: data.co_requites, pre_requites: data.pre_requites,lessonID:data.id }} />
            







          </div>

        </div>
      </div>

    </>
  );
}

export default ClientLesson;