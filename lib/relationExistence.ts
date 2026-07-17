import { Relationships as lessonType } from "@/app/outlook/lessons/entity"
import { Relationships as majorType } from "@/app/outlook/majors/entity"
import { Relationships as professorType } from "@/app/outlook/professors/entity"
import { Relationships as universityType } from "@/app/outlook/universities/entity"




const relationExistCheck = {
    lesson: (data: lessonType): boolean => {
        return (
            data?.major?.length > 0 ||
            data?.professor?.length > 0 ||
            data?.university?.length > 0
        )
    },
    major: (data: majorType): boolean => {
        return (
            data?.lesson?.length > 0 ||
            data?.professor?.length > 0 ||
            data?.university?.length > 0
        )
    },
    professor: (data: professorType): boolean => {
        return (
            data?.major?.length > 0 ||
            data?.lesson?.length > 0 ||
            data?.university?.length > 0
        )
    },
    university: (data: universityType): boolean => {
        return (
            data?.major?.length > 0 ||
            data?.professor?.length > 0 ||
            data?.lesson?.length > 0
        )
    }
}


export default relationExistCheck




