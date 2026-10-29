import { Translation } from '@/types'

export interface ApplicationFormData {
  // Step 1: Personal Info
  fullName: string
  birthDate: string
  gender: 'male' | 'female'
  passportNumber: string
  pinfl: string
  phone: string
  additionalPhone?: string
  email?: string
  region: string
  district: string
  address: string

  // Step 2: Education
  school: string
  graduationYear: number
  averageScore: number

  // Step 3: Department
  departments: Array<{ id: number; priority: number }>
  formOfEducation: 'day' | 'dual'

  // Step 4: Parent Info
  parentFullName: string
  parentPhone: string

  // Step 5: Documents
  photo?: File
  passportCopy?: File
  certificateCopy?: File
  consent: boolean
}

export type ApplicationStatus = 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'needs_documents'

export interface SubmittedApplication {
  id: string
  trackingNumber: string
  status: ApplicationStatus
  fullName: string
  email: string
  phone: string
  departmentChoice: string
  submittedAt: string
  lastUpdated: string
  documents: number
}

export interface ApplicationStep {
  number: number
  key: string
  title: Translation
  description?: Translation
}
