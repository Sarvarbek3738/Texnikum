import { Calendar, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { announcementService } from '../services/announcementService';
import { Announcement } from '../types';
import { motion } from 'framer-motion';
import { Skeleton } from '../components/ui/skeleton';

const defaultAnnouncements: Announcement[] = [
  {
    id: 1,
    slug: 'qabul-komissiyasi-2026',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date().toISOString(),
    is_important: true,
    translations: {
      uz: {
        title: "2026-2027 o'quv yili uchun qabul komissiyasi to'liq tarkibda ish boshladi",
        short_description: "Texnikum binosida abituriyentlar va ota-onalar uchun qabul bo'yicha konsultatsiya xonalari tashkil etildi.",
        content: ""
      },
      ru: {
        title: "Приемная комиссия на 2026-2027 учебный год начала работу в полном составе",
        short_description: "В здании техникума организованы консультационные кабинеты для абитуриентов и их родителей.",
        content: ""
      },
      en: {
        title: "The Admissions Committee for 2026-2027 has commenced operations in full",
        short_description: "Advisory and consultation rooms have been established in the technicum campus for applicants and parents.",
        content: ""
      }
    }
  },
  {
    id: 2,
    slug: 'my-edu-uz-ariza-topshirish',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_important: true,
    translations: {
      uz: {
        title: "my.edu.uz portali orqali ariza topshirish bo'yicha qadam-baqadam yo'riqnoma",
        short_description: "9-sinf bitiruvchilari my.edu.uz portali orqali qulay va tezkor ro'yxatdan o'tishlari mumkin.",
        content: ""
      },
      ru: {
        title: "Пошаговая инструкция по подаче заявления через портал my.edu.uz",
        short_description: "Выпускники 9-х классов могут пройти удобную и быструю онлайн-регистрацию через государственный портал.",
        content: ""
      },
      en: {
        title: "Step-by-step guide to applying via the my.edu.uz state portal",
        short_description: "9th grade graduates can complete convenient and fast online registration through the state portal.",
        content: ""
      }
    }
  },
  {
    id: 3,
    slug: 'ochiq-eshiklar-kuni',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    is_important: false,
    translations: {
      uz: {
        title: "9-sinf o'quvchilari va ota-onalar uchun 'Ochiq eshiklar kuni' bo'lib o'tadi",
        short_description: "Texnikumning zamonaviy ustaxonalari, laboratoriyalari va o'qituvchilari bilan yaqindan tanishing.",
        content: ""
      },
      ru: {
        title: "День открытых дверей для выпускников 9-х классов и их родителей",
        short_description: "Познакомьтесь с современными мастерскими, лабораториями и преподавателями техникума.",
        content: ""
      },
      en: {
        title: "Open Doors Day for 9th grade students and parents",
        short_description: "Get acquainted with the technicum's modern workshops, laboratories, and teaching faculty.",
        content: ""
      }
    }
  }
];

export function AnnouncementsPage() {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAllAnnouncements(1);
        const list = Array.isArray(data) ? data : (data?.results || []);
        if (list.length > 0) {
          setAnnouncements(list);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const displayAnnouncements = announcements.length > 0 ? announcements : defaultAnnouncements;
  const dateLocale = i18n.language === 'en' ? 'en-US' : (i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0a3674] to-[#0a3674] text-white py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight uppercase">
              {t('home.announcements.allAnnouncements', 'Barcha e\'lonlar')}
            </h1>
            <p className="text-base md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('announcements.pageSubtitle', "Texnikumimiz bo'yicha muhim e'lonlar va rasmiy xabarlar")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Announcements Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-950 rounded-3xl overflow-hidden shadow-xl p-0 h-full flex flex-col">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <div className="p-8 flex flex-col flex-grow">
                    <Skeleton className="h-8 w-full mb-4" />
                    <Skeleton className="h-8 w-2/3 mb-6" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5 mb-8" />
                    <div className="mt-auto">
                      <Skeleton className="h-6 w-24 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              displayAnnouncements.map((announcement, index) => {
                const translation = announcementService.getTranslation(announcement, i18n.language);
                const date = new Date(announcement.published_at).toLocaleDateString(dateLocale);

                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100 dark:border-gray-800 flex flex-col h-full"
                  >
                    {/* Image/Header Section */}
                    <div className="relative h-64 overflow-hidden">
                      {announcement.image ? (
                        <img
                          src={announcement.image}
                          alt={translation.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0a3674] to-[#0a3674] flex items-center justify-center">
                          <Megaphone size={64} className="text-white/20" />
                        </div>
                      )}
                      
                      {/* Badge for Important/New */}
                      {announcement.is_important && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg z-20">
                          {t('announcements.important', 'MUHIM')}
                        </div>
                      )}

                      <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-black bg-white/90 dark:bg-gray-950/90 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-full uppercase tracking-[0.2em] border border-white/20 shadow-lg z-20">
                        <Calendar size={14} className="text-[#0a3674]" />
                        <span>{date}</span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <p className="text-white text-sm font-bold line-clamp-2">
                          {translation.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight uppercase tracking-tight group-hover:text-[#0a3674] transition-colors">
                        {translation.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed text-base font-medium">
                        {translation.short_description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <Link
                          to={`/announcements/${announcement.slug}`}
                          className="inline-flex items-center gap-2 text-[#0a3674] font-black uppercase tracking-[0.2em] text-xs hover:gap-4 transition-all group/link"
                        >
                          {t('home.announcements.details', 'Batafsil')}
                          <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                        
                        {(announcement.views_count ?? 0) > 0 && (
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            {announcement.views_count} views
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

