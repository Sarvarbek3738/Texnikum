import { GraduationCap, Globe, FlaskConical, BookOpen, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WhyUsSection() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: GraduationCap,
      title: 'home.whyUs.students',
      description: 'home.whyUs.studentsDesc',
    },
    {
      icon: Globe,
      title: 'home.whyUs.english',
      description: 'home.whyUs.englishDesc',
    },
    {
      icon: FlaskConical,
      title: 'home.whyUs.stem',
      description: 'home.whyUs.stemDesc',
    },
    {
      icon: BookOpen,
      title: 'home.whyUs.courses',
      description: 'home.whyUs.coursesDesc',
    },
    {
      icon: Building2,
      title: 'home.whyUs.cooperation',
      description: 'home.whyUs.cooperationDesc',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em]">
            {t('home.whyUs.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
            {t('home.whyUs.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto font-medium">
            {t('home.whyUs.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-[#0d89b1]/30"
              >
                <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-8 group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <Icon size={32} className="text-[#0d89b1] group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{t(reason.title)}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {t(reason.description)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
