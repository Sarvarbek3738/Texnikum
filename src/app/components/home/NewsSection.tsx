import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsService } from '../../services/newsService';
import { NewsItem } from '../../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru, enUS } from 'date-fns/locale';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const defaultNewsList: NewsItem[] = [
  {
    id: 1,
    slug: 'qabul-2026-boshlandi',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date().toISOString(),
    views_count: 342,
    translations: {
      uz: {
        title: "2026-2027 o'quv yili uchun 9-sinf bitiruvchilaridan hujjatlar qabuli boshlandi",
        short_description: "Farg'ona shahar 5-son texnikumida kunduzgi va dual ta'lim shakllari bo'yicha yangi o'quv yiliga arizalar qabul qilinmoqda.",
        content: ""
      },
      ru: {
        title: "Начат прием документов выпускников 9-х классов на 2026-2027 учебный год",
        short_description: "В Техникуме №5 города Ферганы открыт прием заявлений на дневную и дуальную формы обучения на новый учебный год.",
        content: ""
      },
      en: {
        title: "Admission for 9th grade graduates opened for 2026-2027 academic year",
        short_description: "Applications for full-time and dual education programs are now open at Fergana City Technicum No. 5 for the new academic year.",
        content: ""
      }
    }
  },
  {
    id: 2,
    slug: 'it-va-elektromobil-ustaxonalari',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    views_count: 512,
    translations: {
      uz: {
        title: "Zamonaviy IT, kompyuter tarmoqlari va elektromobillar servisi ustaxonalari",
        short_description: "O'quvchilar nazariy bilimlarni mustahkamlashi uchun eng so'nggi rusumdagi kompyuter uskunalari va stendlar o'rnatildi.",
        content: ""
      },
      ru: {
        title: "Современные мастерские IT, компьютерных сетей и сервиса электромобилей",
        short_description: "Для закрепления практических навыков учащихся установлены современные компьютеры и диагностические стенды.",
        content: ""
      },
      en: {
        title: "Modern IT, computer networks, and electric vehicle service workshops",
        short_description: "Modern computer equipment and diagnostic test benches have been installed for students to consolidate practical skills.",
        content: ""
      }
    }
  },
  {
    id: 3,
    slug: 'dual-talim-amaliyoti',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    published_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    views_count: 289,
    translations: {
      uz: {
        title: "Dual ta'lim: O'quvchilar yetakchi sanoat korxonalarida amaliyot o'tamoqda",
        short_description: "Moda va tikuv, elektromontyorlik va qayta tiklanuvchi energiya yo'nalishlari o'quvchilari korxonalarda haq to'lanadigan ish o'rniga ega bo'ldi.",
        content: ""
      },
      ru: {
        title: "Дуальное обучение: Учащиеся проходят стажировку на ведущих предприятиях",
        short_description: "Учащиеся направлений швейного дела, электромонтажа и зеленой энергетики обеспечены оплачиваемыми рабочими местами.",
        content: ""
      },
      en: {
        title: "Dual education: Students undergo paid internships at leading industrial enterprises",
        short_description: "Students in fashion & sewing, electrical installation, and renewable energy programs are provided with paid workplaces at enterprises.",
        content: ""
      }
    }
  }
];

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(defaultNewsList);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getAllNews();
        const list: NewsItem[] = Array.isArray(data) ? data : (data?.results || []);
        if (list.length > 0) {
          setNews(list.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = i18n.language === 'en' ? enUS : (i18n.language === 'ru' ? ru : uz);
      return format(date, 'd MMMM, yyyy', { locale });
    } catch {
      return dateStr;
    }
  };

  const displayNews = news.length > 0 ? news : defaultNewsList;

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-900/50 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14" data-aos="fade-up">
          <div>
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
              {t('nav.news', 'YANGILIKLAR')}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
              {t('home.newsTitle', "So'nggi yangiliklar")}
            </h2>
          </div>
          <Link
            to="/news"
            className="hidden md:inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 hover:text-amber-600 transition-all font-black uppercase tracking-widest text-xs"
          >
            {t('home.allNews', 'Barcha yangiliklar')}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayNews.map((item, index) => {
            const translation = newsService.getTranslation(item, i18n.language);
            return (
              <article
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-950 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <ImageWithFallback
                    src={item.image}
                    alt={translation.title}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black text-white bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/20">
                    <Calendar size={13} />
                    <span>{formatDate(item.published_at)}</span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#0a3674] dark:group-hover:text-blue-400 transition-colors leading-snug uppercase tracking-tight">
                      {translation.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed text-sm font-medium">
                      {translation.short_description}
                    </p>
                  </div>

                  <Link
                    to={`/news/${item.slug}`}
                    className="inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 group-hover:text-amber-600 font-black uppercase tracking-[0.2em] text-xs transition-colors mt-auto"
                  >
                    {t('home.moreBtn', "Batafsil o'qish")}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[#0a3674] dark:text-blue-400 font-black uppercase tracking-widest text-xs"
          >
            {t('home.allNews', 'Barcha yangiliklar')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
