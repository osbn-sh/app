export interface IBackProfessor {
  id: number
  name: string
  name_english: string
  description: string
  description_english: string
  education_history: EducationHistory[]
  image_url: string
  registered_by: string
  href: string
  relationships: Relationships
}

export interface EducationHistory {
  year: string
  field: string
  degree: string
  university: string
}

export interface Relationships {
  university: University[]
  lesson: Lesson[]
  major: Major[]
}

export interface University {
  id: number
  name: string
  name_english: string
  city: string
  category: string
  image_url: string
  description: string
  description_english: string
  registered_by: string
  status: string
  href: string
}

export interface Lesson {
  id: number
  name: string
  name_english: string
  term: string
  difficulty: number
  description: string
  description_english: string
  registered_by: string
  is_released: boolean
  href: string
}

export interface Major {
  id: number
  name: string
  registered_by: string
  name_english: any
  submitted_by: string
  description: any
  description_english: string
  href: any
}
