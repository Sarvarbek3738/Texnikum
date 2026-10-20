import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru, enUS } from 'date-fns/locale';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';

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

export function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await newsService.getAllNews(page);
        const items = Array.isArray(data) ? data : (data?.results || []);
        if (page === 1) {
          setNews(items.length > 0 ? items : defaultNewsList);
        } else {
          setNews(prev => [...prev, ...items]);
        }
        setHasMore(!!data?.next);
      } catch (error) {
        console.error('Error fetching news:', error);
        if (page === 1) {
          setNews(defaultNewsList);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = i18n.language === 'en' ? enUS : (i18n.language === 'ru' ? ru : uz);
      return format(date, 'd MMMM, yyyy', { locale });
    } catch (e) {
      return dateStr;
    }
  };

  const displayNews = news.length > 0 ? news : defaultNewsList;

  return (
    <div className="min-h-screen">
      <SEO 
        title={t('nav.news')} 
        description={t('home.heroDesc')}
      />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0a3674] to-[#0a3674] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.news')}</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {t('home.heroDesc', "Texnikumimiz faoliyati va kasbiy yutuqlar haqida so'nggi yangiliklardan xabardor bo'ling")}
          </p>
        </div>
      </div>

      {/* News Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayNews.map((item) => {
              const translation = newsService.getTranslation(item, i18n.language);
              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={translation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(item.published_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0a3674] transition-colors">
                      {translation.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {translation.short_description}
                    </p>

                    <Link
                      to={`/news/${item.slug}`}
                      className="inline-flex items-center gap-2 text-[#0a3674] font-semibold hover:gap-3 transition-all"
                    >
                      {t('home.moreBtn', 'Batafsil o\'qish')}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
            
            {loading && Array.from({ length: page === 1 ? 6 : 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg p-0">
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-32 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {!loading && hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-8 py-3 bg-[#0a3674] text-white rounded-xl font-bold hover:bg-[#0a3674] transition-colors shadow-lg"
              >
                {t('common.loadMore', 'Yana yuklash')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

