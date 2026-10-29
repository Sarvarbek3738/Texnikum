import { useTranslation } from 'react-i18next'
import { ApplicationFormData } from '../../types'
import { FormField, FormInput, FormSelect } from '../../../../components/ui/FormField'

interface Step1Props {
  formData: ApplicationFormData
  updateField: (field: keyof ApplicationFormData, value: any) => void
  getFieldError: (fieldName: string) => string | undefined
}

const UZREGIONS = ['Farg\'ona', 'Toshkent', 'Samarqand', 'Xiva', 'Andijon']

export const Step1PersonalInfo = ({ formData, updateField, getFieldError }: Step1Props) => {
  const { t } = useTranslation()

  const handlePhoneChange = (value: string) => {
    let formatted = value.replace(/\D/g, '')
    if (!formatted.startsWith('998')) {
      formatted = '998' + formatted
    }
    if (formatted.length > 12) {
      formatted = formatted.slice(0, 12)
    }
    const withPlus = '+' + formatted
    updateField('phone', withPlus)
  }

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <FormField label={t('admission.fullName')} error={getFieldError('fullName')}>
        <FormInput
          type="text"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          placeholder="Familiya Ism Otasining ismi"
        />
      </FormField>

      {/* Birth Date */}
      <FormField label={t('admission.birthDate')} error={getFieldError('birthDate')}>
        <FormInput
          type="date"
          value={formData.birthDate}
          onChange={(e) => updateField('birthDate', e.target.value)}
        />
      </FormField>

      {/* Gender */}
      <FormField label={t('admission.gender')} error={getFieldError('gender')}>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              checked={formData.gender === 'male'}
              onChange={(e) => updateField('gender', e.target.value as any)}
            />
            {t('admission.male')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={formData.gender === 'female'}
              onChange={(e) => updateField('gender', e.target.value as any)}
            />
            {t('admission.female')}
          </label>
        </div>
      </FormField>

      {/* Passport Number */}
      <FormField label={t('admission.passportNumber')} error={getFieldError('passportNumber')}>
        <FormInput
          type="text"
          value={formData.passportNumber}
          onChange={(e) =>
            updateField('passportNumber', e.target.value.toUpperCase().slice(0, 9))
          }
          placeholder="AA1234567"
          maxLength={9}
        />
      </FormField>

      {/* PINFL */}
      <FormField label={t('admission.pinfl')} error={getFieldError('pinfl')}>
        <FormInput
          type="text"
          value={formData.pinfl}
          onChange={(e) => updateField('pinfl', e.target.value.slice(0, 14))}
          placeholder="14 raqamli PINFL"
          maxLength={14}
        />
      </FormField>

      {/* Phone */}
      <FormField label={t('admission.phone')} error={getFieldError('phone')} required>
        <FormInput
          type="tel"
          value={formData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="+998 90 123 45 67"
        />
      </FormField>

      {/* Additional Phone */}
      <FormField
        label={t('admission.phone') + ' (qo\'shimcha)'}
        error={getFieldError('additionalPhone')}
      >
        <FormInput
          type="tel"
          value={formData.additionalPhone || ''}
          onChange={(e) => updateField('additionalPhone', e.target.value)}
          placeholder="+998 90 123 45 67"
        />
      </FormField>

      {/* Email */}
      <FormField label={t('admission.email')} error={getFieldError('email')}>
        <FormInput
          type="email"
          value={formData.email || ''}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="example@mail.uz"
        />
      </FormField>

      {/* Region */}
      <FormField label="Viloyat" error={getFieldError('region')} required>
        <FormSelect
          value={formData.region}
          onChange={(e) => updateField('region', e.target.value)}
        >
          <option value="">Viloyatni tanlang</option>
          {UZREGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </FormSelect>
      </FormField>

      {/* District */}
      <FormField label="Tuman" error={getFieldError('district')} required>
        <FormInput
          type="text"
          value={formData.district}
          onChange={(e) => updateField('district', e.target.value)}
          placeholder="Tuman nomini kiriting"
        />
      </FormField>

      {/* Address */}
      <FormField label={t('admission.address')} error={getFieldError('address')} required>
        <FormInput
          type="text"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          placeholder="Ko'cha, uy raqami, bino"
        />
      </FormField>
    </div>
  )
}
