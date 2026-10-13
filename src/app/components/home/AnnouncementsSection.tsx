import { Link } from 'react-router';
import { Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { announcementService } from '../../services/announcementService';
import { Announcement } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
      }
    }
  }
];

export function AnnouncementsSection() {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAllAnnouncements(1);
        const list: Announcement[] = Array.isArray(data) ? data : (data?.results || []);
        if (list.length > 0) {
          setAnnouncements(list.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const displayList = announcements.length > 0 ? announcements : defaultAnnouncements;

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14" data-aos="fade-up">
          <div>
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
              {t('home.announcements.badge', "E'LONLAR")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
              {t('home.announcements.title', "Muhim e'lonlar")}
            </h2>
          </div>
          <Link
            to="/announcements"
            className="hidden md:inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 hover:text-amber-600 transition-all font-black uppercase tracking-widest text-xs"
          >
            {t('home.announcements.allAnnouncements', "Barcha e'lonlar")}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((announcement, index) => {
            const translation = announcementService.getTranslation(announcement, i18n.language);
            const date = new Date(announcement.published_at).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ');
            
            return (
              <div
                key={announcement.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {announcement.image ? (
                    <ImageWithFallback
                      src={announcement.image}
                      alt={translation.title}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0a3674] to-[#042656] flex items-center justify-center">
                      <Megaphone size={48} className="text-white/20" />
                    </div>
                  )}
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg z-10 border border-white/20">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0a3674] dark:text-blue-400 uppercase tracking-widest">
                      <Calendar size={13} />
                      <span>{date}</span>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-[#0a3674] dark:text-blue-400">
                        <Megaphone size={18} />
                      </div>
                      {announcement.is_important && (
                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-gradient-to-r from-red-500 to-rose-600 px-3 py-1 rounded-full shadow-sm">
                          {t('announcements.important', 'MUHIM')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 leading-snug uppercase tracking-tight group-hover:text-[#0a3674] dark:group-hover:text-blue-400 transition-colors">
                      {translation.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed text-sm font-medium">
                      {translation.short_description}
                    </p>
                  </div>

                  <Link
                    to={`/announcements/${announcement.slug}`}
                    className="inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 group-hover:text-amber-600 font-black uppercase tracking-[0.2em] text-xs transition-colors mt-auto"
                  >
                    {t('home.moreBtn', "Batafsil ma'lumot")}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 font-black uppercase tracking-widest text-xs"
          >
            {t('home.announcements.allAnnouncements', "Barcha e'lonlar")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
