export interface IBackUniversity {
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
  users_count: number
  relationships: Relationships
}

export interface Relationships {
  lesson: Lesson[]
  professor: Professor[]
  major: Major[]
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
  href?: string
}

export interface Professor {
  id: number
  name: string
  name_english?: string
  description: string
  description_english?: string
  education_history: EducationHistory[]
  image_url: string
  registered_by: string
  href?: string
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
  name_english?: string
  submitted_by: string
  description: any
  description_english: string
  href: any
}
