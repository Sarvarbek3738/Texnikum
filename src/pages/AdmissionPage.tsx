import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { ApplicationForm } from '../features/admission/components/ApplicationForm'
import { ApplicationStatus } from '../features/admission/components/ApplicationStatus'

export const AdmissionPage = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('apply')

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t('common.admission')}</h1>
          <p className="text-lg text-blue-100">
            2026–2027 o\'quv yili qabuli. Onlayn ariza topshirish tizimi.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="apply">{t('admission.apply')}</TabsTrigger>
              <TabsTrigger value="status">{t('admission.status')}</TabsTrigger>
            </TabsList>

            <TabsContent value="apply">
              <ApplicationForm />
            </TabsContent>

            <TabsContent value="status">
              <ApplicationStatus />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Ko\'p beriladigan savollar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Qachon ariza topshira olaman?',
                a: '9-sinf bitiruvchilari 2026-yil 1 oktyabr - 31 dekabr orasida ariza topshira oladi.',
              },
              {
                q: 'Qaysi hujjatlar kerak?',
                a: 'Rasm (3x4), pasport nusxasi, attestat nusxasi va ota-ona ma\'lumoti kerak.',
              },
              {
                q: 'Ariza bepul ekanmi?',
                a: 'Ha, ariza topshirish va ro\'yxatdan o\'tish bepul.',
              },
              {
                q: 'Men xavfsiz izolamim?',
                a: 'Shaxsiy ma\'lumotlaringiz HTTPS orqali shifrlangan. Rozilik bermaguningizcha faqat texnikum tomonidan ishlatiladi.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
