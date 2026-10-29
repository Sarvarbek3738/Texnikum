import { useTranslation } from 'react-i18next'
import { ApplicationFormData } from '../../types'
import { FormField } from '../../../../components/ui/FormField'
import { Upload, File } from 'lucide-react'

interface Step4Props {
  formData: ApplicationFormData
  updateField: (field: keyof ApplicationFormData, value: any) => void
  getFieldError: (fieldName: string) => string | undefined
}

export const Step4ParentInfo = ({ formData, updateField, getFieldError }: Step4Props) => {
  const { t } = useTranslation()

  const handleFileChange = (field: 'photo' | 'passportCopy' | 'certificateCopy', file: File | undefined) => {
    updateField(field, file)
  }

  return (
    <div className="space-y-6">
      {/* Photo */}
      <FormField
        label="Rasm (3x4)"
        error={getFieldError('photo')}
        required
        hint="JPG, PNG - maksimal 2MB"
      >
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('photo', e.target.files?.[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className="text-gray-400" />
            <p className="text-sm font-medium">
              {formData.photo ? formData.photo.name : 'Rasmni yuklang'}
            </p>
            <p className="text-xs text-gray-500">yoki bosib uloq</p>
          </div>
        </div>
      </FormField>

      {/* Passport Copy */}
      <FormField
        label="Pasport nusxasi"
        error={getFieldError('passportCopy')}
        required
        hint="PDF, JPG, PNG - maksimal 5MB"
      >
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange('passportCopy', e.target.files?.[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2">
            <File size={32} className="text-gray-400" />
            <p className="text-sm font-medium">
              {formData.passportCopy ? formData.passportCopy.name : 'Pasport nusxasini yuklang'}
            </p>
            <p className="text-xs text-gray-500">yoki bosib uloq</p>
          </div>
        </div>
      </FormField>

      {/* Certificate Copy */}
      <FormField
        label="Attestat nusxasi"
        error={getFieldError('certificateCopy')}
        required
        hint="PDF, JPG, PNG - maksimal 5MB"
      >
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange('certificateCopy', e.target.files?.[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2">
            <File size={32} className="text-gray-400" />
            <p className="text-sm font-medium">
              {formData.certificateCopy ? formData.certificateCopy.name : 'Attestat nusxasini yuklang'}
            </p>
            <p className="text-xs text-gray-500">yoki bosib uloq</p>
          </div>
        </div>
      </FormField>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          📄 <strong>Eslatma:</strong> Barcha hujjatlar raqamli shaklda bo'lishi kerak. Skanerlangan yoki suratga olgan hujjatlar qabul qilinadi.
        </p>
      </div>
    </div>
  )
}
