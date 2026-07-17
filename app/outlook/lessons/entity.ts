export interface IBackLesson {
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
  users_count: number
  relationships: Relationships
  pre_requites: Requite[]
  co_requites: Requite[]
}

export interface Relationships {
  university: University[]
  professor: Professor[]
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

export interface Professor {
  id: number
  name: string
  name_english: string
  description: string
  description_english: string
  education_history: EducationHistory[]
  image_url: string
  registered_by: string
  href: string
}

export interface EducationHistory {
  year: string
  field: string
  degree: string
  university: string
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

export interface Requite {
  id: number
  name: string
  name_english: string
  term: string
  difficulty: number
  description: string
  description_english: string
  registered_by: string
  is_released: boolean
  href: any
}