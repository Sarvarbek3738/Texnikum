import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { sliderService } from '../../services/sliderService';
import { SliderItem } from '../../types';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getImageUrl } from '../../../config/api';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await sliderService.getSliders();
        const list: SliderItem[] = Array.isArray(data) ? data : ((data as any)?.results || []);
        setSliders(list.filter(s => s.is_active).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
      } catch (error) {
        console.error('Error fetching sliders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // Show immediate fallback/default content while loading or if no sliders
  if (loading || sliders.length === 0) {
    return (
      <section className="relative h-[85vh] md:h-[95vh] min-h-[620px] overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/texnikum_jamoa.jpg"
            alt="Farg'ona shahar 5-son texnikumi"
            className="w-full h-full object-cover transform-gpu slide-zoom-image"
            priority={true}
          />
          {/* Deep Navy/Royal Blue atmospheric gradient matching the poster */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2558]/95 via-[#0a2558]/75 to-transparent z-[1]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gray-950 to-transparent z-[2]"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-3xl text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-6 md:mb-8 uppercase tracking-[0.25em] shadow-xl shadow-orange-500/25 border border-amber-300/30"
            >
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
              {t('home.heroBadge', '9-sinf bitiruvchilari uchun')}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] uppercase text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              {t('home.heroTitle', "FARG'ONA SHAHAR 5-SON TEXNIKUMI")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-amber-400 font-black text-lg sm:text-2xl md:text-3xl mb-6 uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              {t('home.heroSubtitle', "yangi 2026-2027 o'quv yili uchun O'QISHGA TAKLIF ETADI!")}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 md:mb-10 max-w-2xl bg-[#041a3d]/70 backdrop-blur-md p-5 md:p-6 rounded-2xl border-l-4 border-amber-500 border-y border-r border-white/10 shadow-2xl"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t('home.heroDesc', "Siz bu yerda kunduzgi va dual ta'lim shakllarida zamonaviy IT, elektrotexnika, elektromobillar servisi va qayta tiklanuvchi energiya sohalarida nufuzli kasb egasi bo'lishingiz mumkin.")}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <Link
                to="/admission"
                className="group/btn relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl shadow-orange-500/30"
              >
                {t('home.admissionBtn', 'Qabul 2026-2027')}
                <ChevronRight size={20} className="md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#specialties"
                className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 bg-[#0a3674]/80 backdrop-blur-xl text-white rounded-xl hover:bg-[#0a3674] transition-all duration-300 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm border border-blue-400/30 shadow-xl"
              >
                {t('nav.programs', "Yo'nalishlar")}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[85vh] md:h-[95vh] min-h-[620px] overflow-hidden bg-slate-950 group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={sliders.length > 1}
        className="h-full w-full hero-swiper"
      >
        {sliders.map((slider, index) => {
          const translation = sliderService.getTranslation(slider, i18n.language);
          const imageUrl = getImageUrl(slider.image);
          return (
            <SwiperSlide key={slider.id} className="w-full h-full relative">
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full overflow-hidden">
                  <ImageWithFallback
                    src={imageUrl}
                    alt={translation.title}
                    className="w-full h-full object-cover transform-gpu slide-zoom-image"
                    priority={index === 0}
                  />
                </div>
                {/* Clean directional gradient on left side behind text, photo remains bright and clear on right and center */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent z-[1]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-[2]"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl text-white">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-6 md:mb-8 uppercase tracking-[0.25em] shadow-xl shadow-orange-500/25 border border-amber-300/30">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                    {t('home.heroBadge', '9-sinf bitiruvchilari uchun')}
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    <span className="block text-white">
                      {translation.title}
                    </span>
                  </h1>
                  
                  <div className="mb-8 md:mb-10 max-w-2xl bg-[#041a3d]/70 backdrop-blur-md p-5 md:p-6 rounded-2xl border-l-4 border-amber-500 border-y border-r border-white/10 shadow-2xl">
                    <p className="text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {translation.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <Link
                      to="/admission"
                      className="group/btn relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl shadow-orange-500/30"
                    >
                      {t('home.admissionBtn', 'Qabul 2026-2027')}
                      <ChevronRight size={20} className="md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    <a
                      href="#specialties"
                      className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 bg-[#0a3674]/80 backdrop-blur-xl text-white rounded-xl hover:bg-[#0a3674] transition-all duration-300 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm border border-blue-400/30 shadow-xl"
                    >
                      {t('nav.programs', "Yo'nalishlar")}
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Controls Wrapper */}
        <div className="absolute bottom-10 left-0 right-0 z-30 container mx-auto px-4 flex items-center justify-between pointer-events-none">
          {/* Custom Pagination Container */}
          <div className="custom-pagination flex gap-3 md:gap-4 pointer-events-auto"></div>
          
          {/* Custom Navigation Container */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <button className="swiper-button-prev-custom group w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#0a3674] hover:border-[#0a3674] transition-all duration-300">
              <ChevronRight size={28} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button className="swiper-button-next-custom group w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#0a3674] hover:border-[#0a3674] transition-all duration-300">
              <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </Swiper>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3 opacity-50 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0a3674] to-transparent animate-bounce"></div>
      </div>

      {/* Decorative Bottom Gradient for Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-20 pointer-events-none"></div>

      <style>{`
        .slide-zoom-image {
          animation: slide-zoom 15s infinite alternate ease-in-out;
        }
        @keyframes slide-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        .custom-bullet {
          width: 40px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          display: inline-block;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .custom-bullet { width: 60px; height: 4px; }
        }
        .custom-bullet-active {
          background: rgba(255, 255, 255, 0.5);
          width: 60px;
        }
        @media (min-width: 768px) {
          .custom-bullet-active { width: 100px; }
        }
        .custom-bullet-active::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #0a3674;
          animation: progress-line 6s linear forwards;
          transform-origin: left;
        }
        @keyframes progress-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
