import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { useApplicationForm } from '../hooks/useApplicationForm'
import { useApplicationValidation } from '../hooks/useApplicationValidation'
import { ADMISSION_STEPS, DEPARTMENTS_MOCK } from '../../../lib/constants'
import { Step1PersonalInfo } from './steps/Step1PersonalInfo'
import { Step2Education } from './steps/Step2Education'
import { Step3Department } from './steps/Step3Department'
import { Step4ParentInfo } from './steps/Step4ParentInfo'
import { Step5Confirmation } from './steps/Step5Confirmation'

export const ApplicationForm = () => {
  const { t } = useTranslation()
  const { formData, currentStep, updateField, updateMultipleFields, nextStep, prevStep } =
    useApplicationForm()
  const { isStepValid, getFieldError } = useApplicationValidation(formData, currentStep)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStepValid) return

    if (currentStep < 5) {
      nextStep()
    } else {
      // Submit form
      console.log('Ariza yuborilmoqda:', formData)
      alert(`Ariza muvaffaqiyatli yuborildi!\nAriza raqami: APP-${Date.now()}`)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            formData={formData}
            updateField={updateField}
            getFieldError={getFieldError}
          />
        )
      case 2:
        return (
          <Step2Education
            formData={formData}
            updateField={updateField}
            getFieldError={getFieldError}
          />
        )
      case 3:
        return (
          <Step3Department
            formData={formData}
            updateMultipleFields={updateMultipleFields}
            getFieldError={getFieldError}
            departments={DEPARTMENTS_MOCK}
          />
        )
      case 4:
        return (
          <Step4ParentInfo
            formData={formData}
            updateField={updateField}
            getFieldError={getFieldError}
          />
        )
      case 5:
        return (
          <Step5Confirmation
            formData={formData}
            updateField={updateField}
            getFieldError={getFieldError}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {ADMISSION_STEPS.map((step) => (
            <div
              key={step.number}
              className={`flex-1 text-center mx-1 ${
                step.number === currentStep
                  ? 'border-b-4 border-blue-600 pb-2'
                  : step.number < currentStep
                  ? 'border-b-4 border-green-500 pb-2'
                  : 'border-b border-gray-300 pb-2'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <p className="text-xs font-medium">{t(`admission.${step.key}`)}</p>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          {t(`admission.${ADMISSION_STEPS[currentStep - 1].key}`)}
        </h2>

        <div className="min-h-96 mb-8">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-8 pt-8 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-2" size={20} />
            {t('common.back')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={!isStepValid}
          >
            {currentStep === 5 ? t('admission.submit') : t('common.next')}
            {currentStep < 5 && <ChevronRight className="ml-2" size={20} />}
          </Button>
        </div>
      </form>

      {/* Draft Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        💾 Sizning ariza qoralama auto-save qilinmoqda
      </div>
    </div>
  )
}
