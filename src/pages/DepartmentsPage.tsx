import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { DEPARTMENTS_MOCK } from '../lib/constants'

export const DepartmentsPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as any
  const [formFilter, setFormFilter] = useState<'day' | 'dual' | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredDepts = DEPARTMENTS_MOCK.filter((dept) => {
    if (formFilter === 'all') return true
    return dept.forms.includes(formFilter)
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t('common.departments')}</h1>
          <p className="text-lg text-blue-100">
            9 ta kasb yo\'nalishi bilan tayyorlangan kadrlar.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'all' as const, label: 'Barchasi' },
              { value: 'day' as const, label: t('admission.dayEducation') },
              { value: 'dual' as const, label: t('admission.dualEducation') },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFormFilter(filter.value)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  formFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 hover:border-gray-400'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Jami: {filteredDepts.length} ta yo\'nalish
          </p>
        </div>
      </section>

      {/* Departments List */}
      <section className="py-12">
        <div className="container">
          <div className="space-y-4">
            {filteredDepts.map((dept) => (
              <div key={dept.id} className="bg-white border rounded-lg shadow hover:shadow-lg transition">
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expandedId === dept.id ? null : dept.id)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{dept.title[lang]}</h3>
                      <div className="flex gap-2">
                        {dept.forms.map((form) => (
                          <span
                            key={form}
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              form === 'day'
                                ? 'bg-yellow-400 text-gray-900'
                                : 'bg-orange-500 text-white'
                            }`}
                          >
                            {form === 'day'
                              ? t('admission.dayEducation')
                              : t('admission.dualEducation')}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{dept.summary[lang]}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      ⏱️ {dept.duration} | 📚 {dept.level} | 🗣️ {dept.language.join(', ')}
                    </div>
                  </div>
                  <ChevronDown
                    className={`ml-4 transition ${expandedId === dept.id ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>

                {/* Expanded Content */}
                {expandedId === dept.id && (
                  <div className="border-t bg-gray-50 p-6 space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="font-bold mb-2">Tavsif</h4>
                      <div className="text-gray-700">
                        <p>{dept.summary[lang]}</p>
                      </div>
                    </div>

                    {/* Subjects */}
                    {dept.subjects.length > 0 && (
                      <div>
                        <h4 className="font-bold mb-3">O\'qitiladigan fanlar</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {dept.subjects.map((subject, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-white rounded border flex justify-between"
                            >
                              <span>{subject.uz}</span>
                              <span className="text-gray-500">{subject.hours}h</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Careers */}
                    {dept.careers.length > 0 && (
                      <div>
                        <h4 className="font-bold mb-2">Kasblar</h4>
                        <div className="flex flex-wrap gap-2">
                          {dept.careers.map((career, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm"
                            >
                              {career.uz}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Curriculum Download */}
                    {dept.curriculumFile && (
                      <div>
                        <Button variant="outline" size="sm">
                          📥 O\'quv rejasini yuklab olish
                        </Button>
                      </div>
                    )}

                    {/* Apply Button */}
                    <div className="pt-4 border-t">
                      <Button variant="primary" size="lg" className="w-full">
                        {t('departments.applyNow')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kunduzgi ta\'lim',
                desc: '8 ta yo\'nalish. Haftaning 6 kuni dars. Sertifikat va diplom.',
              },
              {
                title: 'Dual ta\'lim',
                desc: '4 ta yo\'nalish. Yarim vaqt maktab, yarim vaqt fabrika.',
              },
              {
                title: 'Imkoniyatlar',
                desc: 'Oliy ta\'limga kirish, xorijda stajirovka, ish joyi.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
