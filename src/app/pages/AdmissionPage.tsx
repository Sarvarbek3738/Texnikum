import { Calendar, FileText, Users, CheckCircle, ExternalLink, Award, BookOpen, Download, Send, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { admissionService } from '../services/admissionService';
import { AdmissionCurrentResponse } from '../types';
import { SEO } from '../components/layout/SEO';
import { SpecialtiesSection } from '../components/home/SpecialtiesSection';

export function AdmissionPage() {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const [data, setData] = useState<AdmissionCurrentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const admissionData = await admissionService.getCurrentAdmission();
        setData(admissionData);
      } catch (error) {
        console.error('Error fetching admission data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, []);

  const steps = [
    {
      icon: FileText,
      title: isRu ? "Регистрация на портале my.edu.uz" : "my.edu.uz portalidan ro'yxatdan o'tish",
      description: isRu ? "Подайте онлайн-заявление в Техникум №5 города Ферганы через государственный портал." : "my.edu.uz portaliga kirib, Farg'ona shahar 5-son texnikumiga onlayn ariza topshiring.",
    },
    {
      icon: Calendar,
      title: isRu ? "Выбор времени и направления" : "Yo'nalish va vaqtni tanlash",
      description: isRu ? "Выберите желаемое направление (дневное или дуальное) и ознакомьтесь с графиком." : "Kunduzgi yoki dual ta'lim shakli bo'yicha mutaxassislikni tanlang va qabul xabarnomasini oling.",
    },
    {
      icon: Users,
      title: isRu ? "Вступительные испытания / Собеседование" : "Saralash sinovlari yoki suhbat",
      description: isRu ? "Пройдите тестирование или профессиональное собеседование в аудиториях техникума." : "Texnikum binosida o'tkaziladigan test sinovlari yoki kasbiy suhbatdan o'ting.",
    },
    {
      icon: CheckCircle,
      title: isRu ? "Подтверждение зачисления" : "Natijalarni bilish va qabul",
      description: isRu ? "После публикации рейтингов подтвердите поступление и принесите оригиналы документов." : "Reyting natijalari e'lon qilingach, texnikumga qabul qilinganingizni tasdiqlang.",
    },
  ];

  const info = data?.admission_info;
  const subjects = data?.subjects || [];
  const documents = data?.documents || [
    { id: 1, document_file: '#', is_required: true, translations: { uz: { document_name: "9-sinf shahodatnomasi (attestat) nusxasi", note: "Asl nusxasi qabul tasdiqlanganda taqdim etiladi" }, ru: { document_name: "Аттестат за 9-й класс", note: "Оригинал при зачислении" } } },
    { id: 2, document_file: '#', is_required: true, translations: { uz: { document_name: "Tug'ilganlik haqida guvohnoma yoki ID-karta nusxasi", note: "O'quvchining shaxsini tasdiqlovchi hujjat" }, ru: { document_name: "Свидетельство о рождении или ID-карта", note: "Копия документа, удостоверяющего личность" } } },
    { id: 3, document_file: '#', is_required: true, translations: { uz: { document_name: "086-U shaklidagi tibbiy ma'lumotnoma", note: "Yashash joyidagi poliklinikadan olingan" }, ru: { document_name: "Медицинская справка формы 086-У", note: "Из поликлиники по месту жительства" } } },
    { id: 4, document_file: '#', is_required: true, translations: { uz: { document_name: "3x4 o'lchamdagi 6 dona rangli fotosurat", note: "Oq fonda olingan sifatli rasm" }, ru: { document_name: "6 цветных фотографий 3х4", note: "На белом фоне" } } },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={isRu ? "Прием 2026-2027" : "Qabul 2026-2027"} 
        description={isRu ? "Порядок приема и направления обучения в Техникум №5 города Ферганы" : "Farg'ona shahar 5-son texnikumiga qabul tartibi va yo'nalishlar"}
      />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0a2558] via-[#0a3674] to-[#041a3d] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-6 uppercase tracking-[0.25em] shadow-xl shadow-orange-500/25 border border-amber-300/30">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
              {isRu ? "Для выпускников 9-х классов" : "9-sinf bitiruvchilari uchun"}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-[1.1]">
              {isRu ? "Прием 2026-2027" : "Qabul 2026-2027"}
            </h1>

            <p className="text-amber-400 font-extrabold text-lg sm:text-2xl md:text-3xl mb-6 uppercase tracking-wide">
              {isRu ? "Техникум №5 города Ферганы приглашает на обучение!" : "Farg'ona shahar 5-son texnikumi o'qishga taklif etadi!"}
            </p>

            <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-medium">
              {isRu 
                ? "Государственное профессиональное образование по дневной и дуальной форме обучения на основе грантов и контрактов."
                : "Kunduzgi va dual ta'lim shakllari bo'yicha zamonaviy talabgir kasblar, davlat grantlari hamda ishlab chiqarish korxonalarida haq to'lanadigan amaliyot o'rinlari."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quota Stats Section */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border-2 border-blue-100 dark:border-gray-800 text-center"
            >
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                {isRu ? "Общая квота приема" : "Umumiy qabul kvotasi"}
              </div>
              <div className="text-5xl font-black text-[#0a3674] dark:text-blue-400">
                {info?.total_quota || 360}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wider">
                {isRu ? "12 направлений" : "12 ta yo'nalish bo'yicha"}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border-2 border-amber-100 dark:border-gray-800 text-center"
            >
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                {isRu ? "Государственный грант (бесплатно)" : "Davlat granti (bepul)"}
              </div>
              <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                {info?.grant_quota || 180}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wider">
                {isRu ? "Со стипендией" : "Stipendiya bilan ta'minlanadi"}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border-2 border-blue-100 dark:border-gray-800 text-center"
            >
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                {isRu ? "Форма обучения" : "Ta'lim shakli"}
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">
                {isRu ? "Дневная & Дуальная" : "Kunduzgi & Dual ta'lim"}
              </div>
              <div className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wider">
                {isRu ? "Практика на производстве" : "Ish haqi to'lanadigan amaliyot"}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded 12 Specialties from the Poster */}
      <SpecialtiesSection />

      {/* Important Dates Section */}
      <section className="py-20 bg-slate-50 dark:bg-gray-900/40 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8" data-aos="fade-right">
                <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
                  {isRu ? "Важные даты" : "Muhim sanalar"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                  {isRu ? "Сроки приема документов" : "Qabul jarayoni muddatlari"}
                </h2>
                
                <div className="space-y-4">
                  {[
                    { label: isRu ? "Прием документов онлайн" : "Hujjatlar qabuli (my.edu.uz)", value: "1-iyun — 20-iyul", icon: FileText, color: 'text-blue-600' },
                    { label: isRu ? "Вступительные испытания / Собеседование" : "Saralash sinovlari / suhbat", value: "1-avgust — 5-avgust", icon: Calendar, color: 'text-amber-600' },
                    { label: isRu ? "Объявление результатов зачисления" : "Natijalar e'lon qilinishi", value: "10-avgust", icon: Award, color: 'text-emerald-600' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-[#0a3674] transition-all">
                      <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center shadow-inner ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</div>
                        <div className="text-lg font-black text-gray-900 dark:text-white uppercase">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps overview */}
              <div className="flex-1" data-aos="fade-left">
                <div className="bg-gradient-to-br from-[#0a3674] to-[#042656] rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-amber-400">
                    {isRu ? "Этапы поступления" : "Qabul bosqichlari"}
                  </h3>
                  <div className="space-y-6 relative z-10">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 sm:gap-6">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black flex-shrink-0 border border-white/20 text-amber-400">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-black uppercase tracking-wider text-sm mb-1">{step.title}</h4>
                          <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
                {isRu ? "Пакет документов" : "Hujjatlar ro'yxati"}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                {isRu ? "Необходимые документы" : "Kerakli hujjatlar"}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {documents.map((doc: any) => {
                const docName = isRu 
                  ? (doc.translations?.ru?.document_name || doc.translations?.uz?.document_name)
                  : doc.translations?.uz?.document_name;
                const docNote = isRu 
                  ? (doc.translations?.ru?.note || doc.translations?.uz?.note)
                  : doc.translations?.uz?.note;

                return (
                  <div
                    key={doc.id}
                    className="bg-slate-50 dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#0a3674] dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={22} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1">
                        {docName}
                      </h4>
                      {docNote && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {docNote}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Online Apply CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0a3674] to-[#042656] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/30">
              <ExternalLink size={32} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              {isRu ? "Подайте заявку через my.edu.uz" : "my.edu.uz portali orqali ariza topshiring"}
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
              {isRu 
                ? "Официальная онлайн-подача документов в государственные техникумы осуществляется через единый портал my.edu.uz."
                : "Davlat texnikumlariga rasmiy qabul arizalari O'zbekiston Respublikasining yagona my.edu.uz portali orqali qabul qilinadi."}
            </p>

            <a
              href="https://my.edu.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs sm:text-sm shadow-2xl hover:-translate-y-1 transition-all"
            >
              <span>{isRu ? "Перейти на my.edu.uz" : "MY.EDU.UZ PORTALIGA O'TISH"}</span>
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
