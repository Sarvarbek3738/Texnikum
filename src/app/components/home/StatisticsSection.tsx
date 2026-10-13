import { Users, GraduationCap, Trophy, School, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { statisticService } from '../../services/statisticService';
import { StatItem } from '../../types';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, any> = {
  users: Users,
  'graduation-cap': GraduationCap,
  graduationCap: GraduationCap,
  trophy: Trophy,
  school: School,
  togaraklar: Trophy,
};

const defaultStatsList: StatItem[] = [
  { id: 1, value: '450+', translations: { uz: { label: "O'quvchilar soni" }, ru: { label: "Количество учащихся" } }, icon: 'users', sort_order: 1 },
  { id: 2, value: '45+', translations: { uz: { label: "Malakali o'qituvchilar" }, ru: { label: "Квалифицированные педагоги" } }, icon: 'graduation-cap', sort_order: 2 },
  { id: 3, value: '12', translations: { uz: { label: "Kasbiy ta'lim yo'nalishlari" }, ru: { label: "Направления обучения" } }, icon: 'school', sort_order: 3 },
  { id: 4, value: '15+', translations: { uz: { label: "Zamonaviy ustaxonalar" }, ru: { label: "Современные мастерские" } }, icon: 'trophy', sort_order: 4 },
];

export function StatisticsSection() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<StatItem[]>(defaultStatsList);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statisticService.getStatistics();
        const list: StatItem[] = Array.isArray(data) ? data : ((data as any)?.results || []);
        if (list.length > 0) {
          const sortedStats = [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          setStats(sortedStats);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayStats = stats.length > 0 ? stats : defaultStatsList;

  return (
    <section className="relative py-24 bg-[#0a2558] overflow-hidden" ref={ref}>
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc1NDU4MzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Statistika"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2558]/90 via-[#0a2558] to-gray-950"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20">
            {t('home.stats.subtitle', 'Faoliyatimiz raqamlarda')}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            {t('home.stats.title', 'Texnikumimiz raqamlarda')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {displayStats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Users;
            const translation = statisticService.getTranslation(stat, i18n.language);
            
            // Handle numeric values
            const valueStr = String(stat.value);
            const numericValue = parseInt(valueStr.replace(/\D/g, '')) || 0;
            const suffix = valueStr.replace(/[0-9]/g, '');

            return (
              <div
                key={stat.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 text-amber-400 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 shadow-xl border border-white/5">
                    <Icon size={28} />
                  </div>
                  
                  <div className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tighter">
                    {inView ? (
                      <CountUp end={numericValue} duration={2.5} suffix={suffix} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  
                  <div className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] opacity-90 group-hover:opacity-100 transition-opacity">
                    {translation.label || (stat.translations as any)?.[i18n.language]?.label || "Ko'rsatkich"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
