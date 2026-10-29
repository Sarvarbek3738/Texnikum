import { useMemo } from 'react'
import { ApplicationFormData } from '../types'

interface ValidationErrors {
  [key: string]: string | undefined
}

const validatePhoneNumber = (phone: string): boolean => {
  return /^\+998\d{9}$/.test(phone.replace(/[\s-]/g, ''))
}

const validatePinfl = (pinfl: string): boolean => {
  return /^\d{14}$/.test(pinfl)
}

const validatePassportNumber = (passport: string): boolean => {
  return /^[A-Z]{2}\d{7}$/.test(passport.toUpperCase())
}

export const useApplicationValidation = (formData: ApplicationFormData, step: number) => {
  const errors = useMemo<ValidationErrors>(() => {
    const errs: ValidationErrors = {}

    if (step === 1) {
      if (!formData.fullName || formData.fullName.length < 5) {
        errs.fullName = 'Ism kamida 5 belgi bo\'lishi kerak'
      }
      if (!formData.birthDate) {
        errs.birthDate = 'Tug\'ilgan sanani tanlang'
      }
      if (!formData.passportNumber || !validatePassportNumber(formData.passportNumber)) {
        errs.passportNumber = 'Pasport raqami tog\'ri emas (masalan: AA1234567)'
      }
      if (!formData.pinfl || !validatePinfl(formData.pinfl)) {
        errs.pinfl = 'PINFL 14 raqamdan iborat bo\'lishi kerak'
      }
      if (!formData.phone || !validatePhoneNumber(formData.phone)) {
        errs.phone = 'Telefon raqami tog\'ri emas (+998 bilan boshlang)'
      }
      if (formData.additionalPhone && !validatePhoneNumber(formData.additionalPhone)) {
        errs.additionalPhone = 'Telefon raqami tog\'ri emas'
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Email xato'
      }
      if (!formData.region) {
        errs.region = 'Viloyatni tanlang'
      }
      if (!formData.district) {
        errs.district = 'Tumanini tanlang'
      }
      if (!formData.address) {
        errs.address = 'Manzilni kiriting'
      }
    }

    if (step === 2) {
      if (!formData.school) {
        errs.school = 'Maktab nomini kiriting'
      }
      if (!formData.graduationYear || formData.graduationYear < 2020) {
        errs.graduationYear = 'Bitirgan yilni tanlang'
      }
      if (!formData.averageScore || formData.averageScore < 2.0 || formData.averageScore > 5.0) {
        errs.averageScore = 'O\'rtacha bali 2.0 va 5.0 orasida bo\'lishi kerak'
      }
    }

    if (step === 3) {
      if (formData.departments.length === 0) {
        errs.departments = 'Kamida bir yo\'nalish tanlang'
      }
      if (formData.departments.length > 3) {
        errs.departments = 'Maksimal 3 ta yo\'nalish tanlashingiz mumkin'
      }
    }

    if (step === 4) {
      if (!formData.photo) {
        errs.photo = 'Rasm yuklang'
      }
      if (!formData.passportCopy) {
        errs.passportCopy = 'Pasport nusxasini yuklang'
      }
      if (!formData.certificateCopy) {
        errs.certificateCopy = 'Attestat nusxasini yuklang'
      }
    }

    if (step === 5) {
      if (!formData.consent) {
        errs.consent = 'Rozilik berish majburiy'
      }
    }

    return errs
  }, [formData, step])

  const isStepValid = Object.keys(errors).length === 0
  const getFieldError = (fieldName: string) => errors[fieldName]

  return { errors, isStepValid, getFieldError }
}
