export interface IGetPendingsMy {
  university: University[]
  lesson: Lesson[]
  professor: Professor[]
  major: Major[]
}

export interface University {
  id: number
  name: string
  name_english: string
  description_english: string
  city: string
  category: string
  approved_at?: string
  rejection_reason?: string
  image_url: string
  description: string
  status: string
  submitted_by: number
  submitted_at: string
  action: string
  target_id: number
}

export interface Lesson {
  id: number
  name: string
  name_english: string
  description_english: string
  difficulty: number
  description: string
  term: string
  status: string

  submitted_by: number
  submitted_at: string
  action: string
  target_id?: number
  approved_by?: number
  approved_at?: string
  rejection_reason?: string
}

export interface Professor {
  id: number
  name: string
  education_history: EducationHistory[]
  image_url: string
  description: string
  status: string
  submitted_by: number
  submitted_at: string
  name_english: string
  rejection_reason?: string
  description_english: string
  approved_at?: string
  action: string
  target_id: number
}

export interface EducationHistory {
  field: string
  degree: string
  university: string
}

export interface Major {
  id: number
  name: string
  status: string
  name_english: string
  description:string
  submitted_by: number
  submitted_at: string
  description_english: string
  rejection_reason?: string
  approved_at?: string
  action: string
  target_id: number
}
