import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { FormInput, FormField } from '../../../components/ui/FormField'

interface ApplicationStatus {
  trackingNumber: string
  status: 'pending' | 'approved' | 'rejected' | 'reviewing'
  fullName: string
  department: string
  submittedAt: string
  updates: Array<{
    date: string
    message: string
  }>
}

const MOCK_APPLICATIONS: Record<string, ApplicationStatus> = {
  'APP-1001': {
    trackingNumber: 'APP-1001',
    status: 'approved',
    fullName: 'Abdullayev Abdulla Abdullo',
    department: 'Raqamli axborotlarni qayta ishlash ustasi',
    submittedAt: '2024-10-01',
    updates: [
      { date: '2024-10-01', message: 'Ariza qabul qilindi' },
      { date: '2024-10-10', message: 'Hujjatlar tekshirilmoqda' },
      { date: '2024-10-15', message: 'Sinov natijalari e\'lon qilindi' },
      { date: '2024-10-20', message: 'Siz qabul qildingiz!' },
    ],
  },
  'APP-1002': {
    trackingNumber: 'APP-1002',
    status: 'reviewing',
    fullName: 'Qo\'shjonova Gulxona Olim',
    department: 'Moda va tikuv texnologiyasi',
    submittedAt: '2024-10-05',
    updates: [
      { date: '2024-10-05', message: 'Ariza qabul qilindi' },
      { date: '2024-10-10', message: 'Hujjatlar tekshirilmoqda' },
    ],
  },
}

export const ApplicationStatus = () => {
  const { t } = useTranslation()
  const [searchTrackingNumber, setSearchTrackingNumber] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [foundApplication, setFoundApplication] = useState<ApplicationStatus | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = () => {
    setSearchAttempted(true)
    // Mock search - in real app would call API
    const app = MOCK_APPLICATIONS[searchTrackingNumber.toUpperCase()]
    setFoundApplication(app || null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-600" size={24} />
      case 'rejected':
        return <AlertCircle className="text-red-600" size={24} />
      case 'reviewing':
        return <Clock className="text-yellow-600" size={24} />
      default:
        return <Clock className="text-gray-600" size={24} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200'
      case 'rejected':
        return 'bg-red-50 border-red-200'
      case 'reviewing':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">{t('admission.status')}</h2>

        <div className="space-y-4">
          <FormField label="Ariza raqami" required>
            <FormInput
              type="text"
              placeholder="APP-1001 (masalan)"
              value={searchTrackingNumber}
              onChange={(e) => setSearchTrackingNumber(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </FormField>

          <FormField label="Telefon" required>
            <FormInput
              type="tel"
              placeholder="+998901234567"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </FormField>

          <Button
            onClick={handleSearch}
            className="w-full"
          >
            <Search className="mr-2" size={20} />
            {t('common.search')}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchAttempted && !foundApplication && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h3 className="font-bold text-lg mb-2">Ariza topilmadi</h3>
          <p className="text-gray-700">
            Berilgan ma\'lumotlar bo\'yicha ariza topilmadi. Iltimos ariza raqami va telefonni
            tekshirib ko\'ring.
          </p>
        </div>
      )}

      {foundApplication && (
        <div className={`rounded-lg border-2 p-8 ${getStatusColor(foundApplication.status)}`}>
          {/* Status Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(foundApplication.status)}
                <h3 className="text-2xl font-bold">
                  {foundApplication.status === 'approved'
                    ? '✅ Qabul qildingiz!'
                    : foundApplication.status === 'rejected'
                    ? '❌ Rad etildi'
                    : '⏳ Ko\'rib chiqilmoqda'}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Ariza raqami</p>
              <p className="font-bold">{foundApplication.trackingNumber}</p>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">F.I.Sh.</p>
                <p className="font-medium">{foundApplication.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Yo\'nalish</p>
                <p className="font-medium">{foundApplication.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Yuborilgan sana</p>
                <p className="font-medium">{foundApplication.submittedAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Holati</p>
                <p className="font-medium capitalize">{foundApplication.status}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="font-bold mb-4">Arizaning tarixi</h4>
            <div className="space-y-3">
              {foundApplication.updates.map((update, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    {idx < foundApplication.updates.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium">{update.message}</p>
                    <p className="text-sm text-gray-600">{update.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm">
              ℹ️ <strong>Eslatma:</strong> Agar holat o\'zgarsa, siz SMS va email orqali
              bildirishnomasini olasiz.
            </p>
          </div>
        </div>
      )}

      {/* Demo Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>🧪 Demo ma\'lumotlar:</strong>
        </p>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Ariza raqami: APP-1001 (Qabul qilindi)</li>
          <li>• Ariza raqami: APP-1002 (Ko\'rib chiqilmoqda)</li>
        </ul>
      </div>
    </div>
  )
}
