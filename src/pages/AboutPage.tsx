import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'

export const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t('common.about')}</h1>
          <p className="text-lg text-blue-100">Texnikum haqida ma'lumot</p>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Tarix</h2>
          <p className="text-gray-700 mb-4">
            Texnikumimiz 1987-yilda tashkil topgan. Ko'p yildan so'ng, zamonaviy ta'lim beruvchi tuzilmaga aylanib, minglab talabalarni kasbga tayyor qilmoqda.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Raqamlarda</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '1,250+', label: 'Talabalar' },
              { number: '120+', label: 'Pedagoglar' },
              { number: '9', label: 'Yonalishlar' },
              { number: '5,000+', label: 'Bitiruvchilar' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
