import { CheckCircle, Award, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Award,
      title: t('home.features.quality'),
      description: t('home.features.qualityDesc'),
    },
    {
      icon: Users,
      title: t('home.features.teachers'),
      description: t('home.features.teachersDesc'),
    },
    {
      icon: BookOpen,
      title: t('home.features.subjects'),
      description: t('home.features.subjectsDesc'),
    },
    {
      icon: CheckCircle,
      title: t('home.features.result'),
      description: t('home.features.resultDesc'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative" data-aos="fade-right">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/texnikum_jamoa.jpg"
                alt="Farg'ona shahar 5-son texnikumi ustoz va xodimlari"
                className="w-full h-[480px] md:h-[520px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#0a3674] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800">
              <div className="text-center text-white">
                <div className="text-5xl font-black mb-2 tracking-tighter text-amber-400">26+</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] opacity-90">{t('home.yearsExperience', 'Yillik tajriba')}</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div data-aos="fade-left">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-6 uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
              {t('home.aboutTitle')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
              {t('home.aboutSubtitle')}
            </h2>
            <div className="p-4 md:p-5 bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-[#0a3674] rounded-r-xl mb-6 shadow-sm">
              <p className="text-xs font-black uppercase text-[#0a3674] dark:text-blue-400 tracking-wider mb-1">
                {t('home.decreeTitle', 'Asos hujjat:')}
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                {t('home.decreeText', "Farg'ona shahar 5-son texnikumi O'zbekiston Respublikasining professional ta'lim tizimini rivojlantirish to'g'risidagi davlat qarorlari asosida faoliyat yuritadi.")}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base md:text-lg font-medium">
              {t('home.aboutDesc')}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-5 group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-white dark:bg-gray-800 shadow-lg group-hover:bg-[#0a3674] group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:rotate-6">
                        <Icon size={26} className="text-[#0a3674] dark:text-blue-400 group-hover:text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white mb-1 uppercase tracking-wider text-sm">{feature.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0a3674] text-white rounded-xl hover:bg-[#082856] transition-all duration-300 font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {t('home.readMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
