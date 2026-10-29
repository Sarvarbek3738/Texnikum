// Tillar
export type Language = 'uz' | 'ru' | 'en'

// Tarjima strukturasi
export type Translation = Record<Language, string>

// Yo'nalish (Kasb)
export interface Department {
  id: number
  slug: string
  title: Translation
  summary: Translation
  description: Translation
  forms: ('day' | 'dual')[]
  duration: string
  level: string
  language: Language[]
  subjects: SubjectItem[]
  curriculumFile: string
  careers: Translation[]
  coverImage: string
  gallery: string[]
  icon?: string
}

export interface SubjectItem {
  uz: string
  ru?: string
  en?: string
  hours: number
}

// Yangilik
export interface News {
  id: number
  slug: string
  title: Translation
  excerpt: Translation
  content: Translation
  coverImage: string
  images?: string[]
  category: 'news' | 'announcement' | 'event' | 'achievement'
  tags: Translation[]
  views: number
  publishedAt: string
  author: Translation
}

// Xodim/O'qituvchi
export interface Staff {
  id: number
  fullName: string
  position: Translation
  department: Translation
  category?: string
  degree?: string
  languages: string[]
  experienceYears: number
  photo: string
  bio: Translation
}

// Rahbariyat
export interface Leader extends Staff {
  office?: string
  receptionDays?: string
  phone?: string
  email?: string
}

// Hujjat
export interface Document {
  id: number
  title: Translation
  category: string
  fileUrl: string
  fileType: 'pdf' | 'docx' | 'doc'
  size: number
  publishedAt: string
  icon?: string
}

// Ariza holati
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'reviewing' | 'needs_documents'

export interface Application {
  id: number
  trackingNumber: string
  fullName: string
  email: string
  phone: string
  status: ApplicationStatus
  createdAt: string
  documents: number
}

// Statistika
export interface Statistics {
  totalStudents: number
  totalTeachers: number
  departments: number
  classrooms: number
  dormitoryBeds: number
  graduates: number
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: {
    page: number
    limit: number
    total: number
  }
  error: string | null
}
