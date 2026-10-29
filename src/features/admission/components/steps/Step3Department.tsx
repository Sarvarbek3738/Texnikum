import { useTranslation } from 'react-i18next'
import { ApplicationFormData } from '../../types'
import { Department } from '../../types'
import { FormField } from '../../../../components/ui/FormField'

interface Step3Props {
  formData: ApplicationFormData
  updateMultipleFields: (fields: Partial<ApplicationFormData>) => void
  getFieldError: (fieldName: string) => string | undefined
  departments: Department[]
}

export const Step3Department = ({
  formData,
  updateMultipleFields,
  getFieldError,
  departments,
}: Step3Props) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as any

  const handleDepartmentSelect = (deptId: number, priority: number) => {
    const existing = formData.departments.find((d) => d.id === deptId)
    if (existing) {
      updateMultipleFields({
        departments: formData.departments.filter((d) => d.id !== deptId),
      })
    } else {
      updateMultipleFields({
        departments: [...formData.departments, { id: deptId, priority }],
      })
    }
  }

  const handleFormChange = (form: 'day' | 'dual') => {
    updateMultipleFields({ formOfEducation: form })
  }

  const selectedDepartments = formData.departments.map((d) =>
    departments.find((dept) => dept.id === d.id)
  )

  return (
    <div className="space-y-6">
      {/* Form of Education */}
      <FormField label={t('admission.formOfEducation')} required>
        <div className="grid grid-cols-2 gap-4">
          {['day', 'dual'].map((form) => (
            <button
              key={form}
              onClick={() => handleFormChange(form as 'day' | 'dual')}
              className={`p-4 rounded-lg border-2 transition ${
                formData.formOfEducation === form
                  ? form === 'day'
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold mb-2">
                {form === 'day' ? t('admission.dayEducation') : t('admission.dualEducation')}
              </div>
              <div className="text-sm text-gray-600">
                {form === 'day' ? 'Kunduzgi o\'qish' : 'Dual ta\'lim'}
              </div>
            </button>
          ))}
        </div>
      </FormField>

      {/* Department Selection */}
      <FormField
        label={t('admission.selectDepartment')}
        error={getFieldError('departments')}
        required
      >
        <div className="space-y-3">
          {departments.map((dept) => {
            const isAvailable = dept.forms.includes(formData.formOfEducation)
            const isSelected = formData.departments.some((d) => d.id === dept.id)

            return (
              <div
                key={dept.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : isAvailable
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => isAvailable && handleDepartmentSelect(dept.id, 1)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-bold">{dept.title[lang]}</div>
                    <div className="text-sm text-gray-600 mt-1">{dept.summary[lang]}</div>
                    <div className="text-xs text-gray-500 mt-2">
                      Muddati: {dept.duration} | Daraja: {dept.level}
                    </div>
                  </div>
                  {!isAvailable && (
                    <div className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">
                      Mavjud emas
                    </div>
                  )}
                  {isSelected && (
                    <div className="text-blue-600 font-bold ml-2">✓</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </FormField>

      {/* Selected Departments Summary */}
      {formData.departments.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="font-bold mb-2">Tanlangan yo\'nalishlar:</div>
          <ul className="text-sm space-y-1">
            {selectedDepartments.map(
              (dept, idx) =>
                dept && (
                  <li key={dept.id}>
                    {idx + 1}. {dept.title[lang]}
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-gray-700">
          ⚠️ <strong>Eslatma:</strong> Siz 1-3 ta yo\'nalish tanlashingiz mumkin ustuvorlik bo\'yicha.
        </p>
      </div>
    </div>
  )
}
