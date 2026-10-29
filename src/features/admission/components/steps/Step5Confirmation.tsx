import { useTranslation } from 'react-i18next'
import { ApplicationFormData } from '../../types'
import { FormField } from '../../../../components/ui/FormField'

interface Step5Props {
  formData: ApplicationFormData
  updateField: (field: keyof ApplicationFormData, value: any) => void
  getFieldError: (fieldName: string) => string | undefined
}

export const Step5Confirmation = ({
  formData,
  updateField,
  getFieldError,
}: Step5Props) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="p-6 bg-gray-50 rounded-lg space-y-4">
        <h3 className="font-bold text-lg mb-4">Kiritilgan ma\'lumotlar</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">F.I.Sh.</p>
            <p className="font-medium">{formData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Telefon</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pasport</p>
            <p className="font-medium">{formData.passportNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">PINFL</p>
            <p className="font-medium">{formData.pinfl}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Maktab</p>
            <p className="font-medium">{formData.school}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">O\'rtacha bali</p>
            <p className="font-medium">{formData.averageScore}</p>
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <FormField error={getFieldError('consent')}>
        <label className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100 transition">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => updateField('consent', e.target.checked)}
            className="mt-1 w-5 h-5"
          />
          <div className="text-sm">
            <p className="font-medium mb-1">
              Shaxsiy ma\'lumotlarning qayta ishlashiga rozilik beraman
            </p>
            <p className="text-gray-600">
              Texnikum shaxsiy ma\'lumotlarimni faqat ta\'lim jarayonida va aloqa uchun ishlatadi.
            </p>
          </div>
        </label>
      </FormField>

      {/* Terms */}
      <div className="p-4 bg-blue-50 rounded-lg text-sm space-y-2">
        <p>✅ Barcha kerakli ma\'lumotlarni to\'ldirib boshladim</p>
        <p>✅ Kiritilgan ma\'lumotlar to\'g\'ri va aniq</p>
        <p>✅ Shaxsiy ma\'lumotlarni qayta ishlashga roziman</p>
      </div>

      {/* Final Info */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>ℹ️ Ma\'lumot:</strong> Arizani yuborishdan keyin \"Ariza holatini tekshirish\"
          bo\'limidan holatini ko\'rishingiz mumkin.
        </p>
      </div>
    </div>
  )
}
