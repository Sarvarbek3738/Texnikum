import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { DEPARTMENTS_MOCK } from '../lib/constants'

export const HomePage = () => {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'uz') as any

  return (
    <div className="w-full">
      {/* HERO SECTION - Navy & Gold */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white overflow-hidden"> 
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admission">
                  <Button variant="secondary" size="lg" className="font-bold bg-yellow-500 text-blue-900 hover:bg-yellow-400">
                    {t('home.hero.cta1')} <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/departments">
                  <Button variant="outline" size="lg" className="border-yellow-400 text-yellow-300 hover:bg-yellow-500/10">
                    {t('home.hero.cta2')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-500/20">
              <img 
                src="/img/hero-building.png" 
                alt="Farg'ona 5-son Texnikum" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT TICKER */}
      <section className="py-4 bg-yellow-500 text-blue-900 font-semibold">
        <div className="container flex items-center gap-2 overflow-x-auto">
          <span className="font-bold">📢</span>
          <p>2026-yil qabuli boshlandi! Onlayn ariza topshirish: 1-oktyabr - 31-dekabr</p>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '👥', value: '1,250+', label: t('home.stats.students') },
              { icon: '👨‍🏫', value: '120+', label: t('home.stats.teachers') },
              { icon: '🎓', value: '9', label: t('home.stats.departments') },
              { icon: '🏛️', value: '45', label: t('home.stats.classrooms') },
              { icon: '🛏️', value: '300+', label: t('home.stats.dormitoryBeds') },
              { icon: '⭐', value: '5,000+', label: t('home.stats.graduates') },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border-2 border-blue-900">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-900">Texnikum haqida qisqacha</h2>
              <p className="text-lg text-gray-700 mb-4">
                Farg'ona shahar 5-son texnikumi 1987-yildan beri ta'lim bermoqda. Zamonaviy ta'lim metodlari va texnologiyalarni qo'llab, minglab talabalarni kasbga tayyor qilmoqda.
              </p>
              <div className="flex gap-6 mb-6">
                <div className="flex gap-3">
                  <CheckCircle className="text-yellow-600 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-bold text-blue-900">Davlat namunasi diplom</div>
                    <div className="text-sm text-gray-600">Qadr va e'tirof</div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-blue-900 text-white hover:bg-blue-950">To'liq o'qish →</Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-500/20">
              <img 
                src="/img/texnikum banner.png" 
                alt="Texnikum" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Biz bilan erishadigan maqsadlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Davlat diplomasi', desc: 'Qadr-qiymati turgan sertifikat' },
              { icon: '🤝', title: 'Dual ta\'lim', desc: 'Ishchi tajribaga ega bo\'ling' },
              { icon: '✈️', title: 'Xorijda stajirovka', desc: 'Xalqaro hamkorlik' },
              { icon: '📚', title: 'Oliy ta\'limga kirish', desc: 'Bakalavr dasturiga ruxsat' },
            ].map((benefit, idx) => (
              <div key={idx} className="p-6 bg-blue-50 rounded-xl border-2 border-blue-900 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-lg text-blue-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-20 bg-blue-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Yo'nalishlarni tanla</h2>
            <p className="text-lg text-blue-100">9 ta kasb yo'nalishi bilan tayyorlangan kadrlar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {DEPARTMENTS_MOCK.slice(0, 3).map((dept) => (
              <div key={dept.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-xl blur-xl opacity-0 group-hover:opacity-25 transition"></div>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border-2 border-yellow-500">
                  <div className="h-32 bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center">
                    <div className="text-6xl">📚</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">{dept.title[lang]}</h3>
                    <p className="text-sm text-gray-600 mb-4">{dept.summary[lang]}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dept.forms.map((form) => (
                        <span key={form} className={`text-xs px-2 py-1 rounded-full font-medium ${
                          form === 'day' ? 'bg-yellow-200 text-blue-900' : 'bg-orange-200 text-blue-900'
                        }`}>
                          {form === 'day' ? '☀️ Kunduzgi' : '🔄 Dual'}
                        </span>
                      ))}
                    </div>
                    <Button variant="primary" size="sm" className="w-full bg-blue-900 text-white hover:bg-blue-950">
                      Batafsil ko'rish
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-2 border-yellow-500 text-yellow-300 hover:bg-yellow-500/10">
              Barcha yo'nalishlar ({DEPARTMENTS_MOCK.length} ta) <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Qabul bosqichlari</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-yellow-500 to-blue-900 transform -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { num: 1, title: 'Hujjat yig\'ash', icon: '📋' },
                { num: 2, title: 'Ariza topshirish', icon: '✍️' },
                { num: 3, title: 'Sinovdan o\'tish', icon: '✅' },
                { num: 4, title: 'Qabul qilish', icon: '🎓' },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-20"></div>
                    <div className="relative w-16 h-16 mx-auto bg-white border-4 border-blue-900 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-2xl">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Hozir hujjat topshirish boslanmog'i!</h2>
          <p className="text-xl text-blue-100 mb-8">2026-yil qabuli. Siz ham bizning jamoa'ga qo'shiling!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admission">
              <Button variant="secondary" size="lg" className="text-lg font-bold bg-yellow-500 text-blue-900 hover:bg-yellow-600">
                Hujjat topshirish →
              </Button>
            </Link>
            <Link to="/departments">
              <Button variant="outline" size="lg" className="text-lg font-bold border-2 border-yellow-500 text-yellow-300 hover:bg-yellow-500/10">
                Yo'nalishlarni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
