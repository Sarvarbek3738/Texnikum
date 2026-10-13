import { 
  Binary, 
  Network, 
  Scissors, 
  Zap, 
  FlaskConical, 
  Car, 
  Building2, 
  SunMedium, 
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function SpecialtiesSection() {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const kunduzgiList = [
    {
      id: 1,
      title: isRu ? "Мастер цифровой обработки информации" : "Raqamli axborotlarni qayta ishlash ustasi",
      desc: isRu ? "Компьютерные технологии, обработка баз данных и офисные программы" : "Zamonaviy IT, ma'lumotlar bazasi va dasturiy ta'minot bilan ishlash",
      icon: Binary,
      color: "bg-blue-600 text-white",
      border: "hover:border-blue-500"
    },
    {
      id: 2,
      title: isRu ? "Компьютерные сети и IT-сервис" : "Kompyuter tarmoqlari va IT-servisi",
      desc: isRu ? "Настройка сетевого оборудования, системное администрирование и безопасность" : "Tarmoq qurilmalari, tizim ma'murligi va texnik IT xizmat ko'rsatish",
      icon: Network,
      color: "bg-indigo-600 text-white",
      border: "hover:border-indigo-500"
    },
    {
      id: 3,
      title: isRu ? "Технология швейного производства и моды" : "Moda va tikuv ishlab chiqarish texnologiyasi",
      desc: isRu ? "Моделирование одежды, дизайн и современное швейное производство" : "Kiyim modellashtirish, bichish-tikish va zamonaviy to'qimachilik dizayni",
      icon: Scissors,
      color: "bg-pink-600 text-white",
      border: "hover:border-pink-500"
    },
    {
      id: 4,
      title: isRu ? "Электромонтер" : "Elektromontyor",
      desc: isRu ? "Монтаж, ремонт и обслуживание электрических сетей и установок" : "Sanoat va maishiy elektr tarmoqlari, xavfsizlik va avtomatika tizimlari",
      icon: Zap,
      color: "bg-amber-600 text-white",
      border: "hover:border-amber-500"
    },
    {
      id: 5,
      title: isRu ? "Оператор производства химических волокон" : "Kimyoviy tolalar ishlab chiqarish operatori",
      desc: isRu ? "Технологические процессы химической промышленности и полимеров" : "Zamonaviy kimyo va polimer sanoatida texnologik liniyalarni boshqarish",
      icon: FlaskConical,
      color: "bg-emerald-600 text-white",
      border: "hover:border-emerald-500"
    },
    {
      id: 6,
      title: isRu ? "Сервис электробусов, электромобилей и электроскутеров" : "Elektrobus, elektromobillar va elektroskuterlar servisi",
      desc: isRu ? "Диагностика, ремонт аккумуляторов и силовых систем электротранспорта" : "Zamonaviy elektr transport vositalari, akkumulyator va invertorlar diagnostikasi",
      icon: Car,
      color: "bg-cyan-600 text-white",
      border: "hover:border-cyan-500"
    },
    {
      id: 7,
      title: isRu ? "Сервис жилой инфраструктуры" : "Turar joy infratuzilmasi servisi",
      desc: isRu ? "Обслуживание инженерных систем современных жилых комплексов" : "Zamonaviy turar-joy majmualari va kommunal infratuzilmaga xizmat ko'rsatish",
      icon: Building2,
      color: "bg-purple-600 text-white",
      border: "hover:border-purple-500"
    },
    {
      id: 8,
      title: isRu ? "Парикмахер (модельер)" : "Sartarosh (modeler)",
      desc: isRu ? "Стилистика, моделирование причесок и индустрия красоты" : "Soch turmaklash, zamonaviy stilistika va go'zallik sanoati xizmatlari",
      icon: Scissors,
      color: "bg-rose-600 text-white",
      border: "hover:border-rose-500"
    }
  ];

  const dualList = [
    {
      id: 101,
      title: isRu ? "Технология швейного производства и моды" : "Moda va tikuv ishlab chiqarish texnologiyasi",
      desc: isRu ? "Обучение на производстве в партнерских швейных фабриках" : "Yetakchi tikuvchilik va to'qimachilik korxonalarida amaliyot bilan birga o'qish",
      icon: Scissors,
      color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    },
    {
      id: 102,
      title: isRu ? "Электромонтер" : "Elektromontyor",
      desc: isRu ? "Практические навыки на предприятиях энергетической отрасли" : "Energetika va ishlab chiqarish korxonalarida amaliy ish o'rniga ega bo'lish",
      icon: Zap,
      color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    },
    {
      id: 103,
      title: isRu ? "Сервис электробусов, электромобилей и электроскутеров" : "Elektrobus, elektromobillar va elektroskuterlar servisi",
      desc: isRu ? "Стажировка в специализированных сервисных центрах электротранспорта" : "Elektr transporti avtoservislarida real texnikada amaliyot o'tash",
      icon: Car,
      color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    },
    {
      id: 104,
      title: isRu ? "Обслуживание источников возобновляемой энергии" : "Qayta tiklanuvchi energiya manbaalariga xizmat ko'rsatish",
      desc: isRu ? "Монтаж и эксплуатация солнечных и ветровых электростанций" : "Quyosh panellari, shamol generatorlari va yashil energetika stansiyalari montaji",
      icon: SunMedium,
      color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    }
  ];

  return (
    <section id="specialties" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0a3674]/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#ea580c] to-[#f59e0b] text-white text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-orange-500/20 mb-5"
          >
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
            {isRu ? "Для выпускников 9-х классов" : "9-sinf bitiruvchilari uchun"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-[1.15] mb-6"
          >
            <span className="text-[#0a3674] dark:text-blue-400">{isRu ? "Направления обучения" : "Ta'lim Yo'nalishlari"}</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl text-amber-600 dark:text-amber-400 font-extrabold mt-2">
              {isRu ? "2026-2027 учебный год" : "2026-2027 o'quv yili uchun"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto"
          >
            {isRu 
              ? "Выберите престижную и востребованную профессию в дневной или дуальной форме обучения!"
              : "Siz Farg'ona shahar 5-son texnikumida quyidagi zamonaviy va yuqori daromadli kasbiy yo'nalishlarda tahsil olishingiz mumkin."}
          </motion.p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start max-w-7xl mx-auto">
          
          {/* Left Column: KUNDUZGI TA'LIM SHAKLI (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-blue-100 dark:border-blue-950/60 relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0a3674] text-white shadow-lg shadow-blue-900/20">
                <CheckCircle2 size={20} className="text-amber-400" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
                  {isRu ? "Дневная форма обучения" : "KUNDUZGI TA'LIM SHAKLIDA"}
                </span>
              </div>
              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0a3674] dark:text-blue-300 uppercase tracking-widest">
                8 {isRu ? "направлений" : "ta yo'nalish"}
              </span>
            </div>

            {/* List of 8 Kunduzgi directions */}
            <div className="grid sm:grid-cols-2 gap-4">
              {kunduzgiList.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-slate-100 dark:border-gray-700/60 hover:border-[#0a3674]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0a3674] dark:text-blue-400 block mb-0.5">
                          0{item.id}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-[#0a3674] dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed pl-1">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: DUAL TA'LIM SHAKLI (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-amber-200 dark:border-amber-950/60 relative overflow-hidden">
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
                  <Sparkles size={20} className="text-white" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
                    {isRu ? "Дуальная форма обучения" : "DUAL TA'LIM SHAKLIDA"}
                  </span>
                </div>
                <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 uppercase tracking-widest">
                  4 {isRu ? "направления" : "ta yo'nalish"}
                </span>
              </div>

              {/* Dual List */}
              <div className="space-y-4">
                {dualList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group p-4 sm:p-5 rounded-2xl bg-amber-50/40 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-amber-100 dark:border-gray-700/60 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-amber-200/50 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  💡 {isRu ? "Что такое дуальное обучение?" : "Dual ta'lim nima?"}
                </span>
                {isRu 
                  ? "Теоретические занятия проходят в техникуме, а практические дни — прямо на производстве с официальным трудоустройством и зарплатой."
                  : "Nazariy bilimlar texnikumda o'rganiladi, amaliyot esa to'g'ridan-to'g'ri hamkor korxona va fabrikalarda oylik maosh to'lanadigan ish o'rni bilan olib boriladi."}
              </div>
            </div>

            {/* Poster Quick Contact Card */}
            <div className="bg-gradient-to-br from-[#0a3674] to-[#042656] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                  {isRu ? "КОНТАКТЫ ДЛЯ ПРИЕМА" : "BOG'LANISH VA MANZIL"}
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-semibold text-white/90 leading-relaxed">
                    <strong>{isRu ? "Наш адрес:" : "Bizning manzilimiz:"}</strong><br />
                    Farg'ona shahar, Farg'ona ko'chasi 170-uy <br />
                    <span className="text-amber-300 font-bold">({isRu ? "бывш. колледж Нефти и газа" : "eski Neft va gaz sanoati kolleji"})</span>
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <Phone size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/70 block">{isRu ? "Телефоны для справок:" : "Telefon raqamlar:"}</span>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1 font-black text-sm sm:text-base">
                      <a href="tel:+998945127553" className="hover:text-amber-400 transition-colors">
                        94-512-75-53
                      </a>
                      <a href="tel:+998884132200" className="hover:text-amber-400 transition-colors">
                        88-413-22-00
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    to="/admission"
                    className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
                  >
                    {isRu ? "Подать заявку на поступление" : "Qabulga ariza topshirish"}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
