import { useState, useCallback } from 'react'
import { ApplicationFormData } from '../types'

const STORAGE_KEY = 'admission_form_draft'

const initialFormData: ApplicationFormData = {
  fullName: '',
  birthDate: '',
  gender: 'male',
  passportNumber: '',
  pinfl: '',
  phone: '',
  additionalPhone: '',
  email: '',
  region: '',
  district: '',
  address: '',
  school: '',
  graduationYear: new Date().getFullYear(),
  averageScore: 3.0,
  departments: [],
  formOfEducation: 'day',
  parentFullName: '',
  parentPhone: '',
  photo: undefined,
  passportCopy: undefined,
  certificateCopy: undefined,
  consent: false,
}

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData
  })

  const [currentStep, setCurrentStep] = useState(1)

  const updateField = useCallback(
    (field: keyof ApplicationFormData, value: any) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    },
    []
  )

  const updateMultipleFields = useCallback(
    (fields: Partial<ApplicationFormData>) => {
      setFormData((prev) => {
        const updated = { ...prev, ...fields }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    },
    []
  )

  const clearDraft = useCallback(() => {
    setFormData(initialFormData)
    localStorage.removeItem(STORAGE_KEY)
    setCurrentStep(1)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  return {
    formData,
    currentStep,
    updateField,
    updateMultipleFields,
    nextStep,
    prevStep,
    clearDraft,
    setCurrentStep,
  }
}
