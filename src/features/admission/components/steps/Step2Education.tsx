import { useTranslation } from 'react-i18next'
import { ApplicationFormData } from '../../types'
import { FormField, FormInput, FormSelect } from '../../../../components/ui/FormField'

interface Step2Props {
  formData: ApplicationFormData
  updateField: (field: keyof ApplicationFormData, value: any) => void
  getFieldError: (fieldName: string) => string | undefined
}

export const Step2Education = ({ formData, updateField, getFieldError }: Step2Props) => {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      {/* School Name */}
      <FormField label={t('admission.school')} error={getFieldError('school')} required>
        <FormInput
          type="text"
          value={formData.school}
          onChange={(e) => updateField('school', e.target.value)}
          placeholder="Maktab nomini kiriting"
        />
      </FormField>

      {/* Graduation Year */}
      <FormField label={t('admission.year')} error={getFieldError('graduationYear')} required>
        <FormSelect
          value={formData.graduationYear}
          onChange={(e) => updateField('graduationYear', parseInt(e.target.value))}
        >
          <option value="">Yilni tanlang</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </FormSelect>
      </FormField>

      {/* Average Score */}
      <FormField
        label={t('admission.averageScore')}
        error={getFieldError('averageScore')}
        required
      >
        <div className="flex gap-4 items-center">
          <FormInput
            type="number"
            min="2"
            max="5"
            step="0.1"
            value={formData.averageScore}
            onChange={(e) => updateField('averageScore', parseFloat(e.target.value))}
            placeholder="3.0"
            className="flex-1"
          />
          <span className="text-gray-600">/ 5.0</span>
        </div>
      </FormField>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          📋 <strong>Eslatma:</strong> Attestat o\'rtacha bali 2.0 va 5.0 orasida bo\'lishi kerak.
          Attestatdan yuqori ball mavjud bo\'lsa, shuni kiriting.
        </p>
      </div>

      {/* Expected Score Info */}
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-sm">
          ✅ <strong>Sizning ehtimoli:</strong> {formData.averageScore >= 3.5 ? 'Yuqori' : formData.averageScore >= 3 ? 'O\'rta' : 'Pastroq'}
        </p>
      </div>
    </div>
  )
}
