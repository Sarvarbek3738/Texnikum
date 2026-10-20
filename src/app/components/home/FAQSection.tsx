import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { faqService } from '../../services/faqService';
import { FAQItem } from '../../types';
import { HelpCircle } from 'lucide-react';

const defaultFaqsList: FAQItem[] = [
  {
    id: 1,
    sort_order: 1,
    is_active: true,
    translations: {
      uz: {
        question: "Farg'ona shahar 5-son texnikumiga qabul qanday tartibda amalga oshiriladi?",
        answer: "Texnikumga qabul 9-sinf bitiruvchilari uchun my.edu.uz portali orqali onlayn yoki texnikum binosidagi qabul komissiyasida bevosita hujjat topshirish yo'li bilan amalga oshiriladi."
      },
      ru: {
        question: "Как осуществляется прием в Техникум №5 города Ферганы?",
        answer: "Прием выпускников 9-х классов осуществляется онлайн через государственный портал my.edu.uz или непосредственно в приемной комиссии в здании техникума."
      },
      en: {
        question: "How is admission to Fergana City Technicum No. 5 conducted?",
        answer: "Admission for 9th grade graduates is carried out online through the state portal my.edu.uz or directly at the admissions committee in the technicum building."
      }
    }
  },
  {
    id: 2,
    sort_order: 2,
    is_active: true,
    translations: {
      uz: {
        question: "Texnikumda qanday ta'lim shakllari va yo'nalishlar mavjud?",
        answer: "Texnikumimizda 2 xil ta'lim shakli mavjud: 1) Kunduzgi ta'lim (8 ta yo'nalish: IT, kompyuter tarmoqlari, moda va tikuv, elektromontyor, kimyoviy tolalar, elektromobillar servisi, turar joy infratuzilmasi, sartarosh). 2) Dual ta'lim (4 ta yo'nalish: tikuvchilik, elektromontyor, elektromobillar servisi, qayta tiklanuvchi energiya)."
      },
      ru: {
        question: "Какие формы и направления обучения есть в техникуме?",
        answer: "Обучение ведется по двум формам: Дневная (8 направлений: IT, сети, швейное дело, электромонтаж, химволокно, электромобили, инфраструктура, стилистика) и Дуальная (4 направления: швейное дело, электромонтаж, электромобили, возобновляемая энергетика)."
      },
      en: {
        question: "What education forms and fields of study are available at the technicum?",
        answer: "Our technicum offers 2 forms of education: 1) Full-time education (8 specialties: IT, computer networks, fashion & sewing, electrical installation, chemical fibers, EV service, residential infrastructure, hairstyling). 2) Dual education (4 specialties: sewing, electrical installation, EV service, renewable energy)."
      }
    }
  },
  {
    id: 3,
    sort_order: 3,
    is_active: true,
    translations: {
      uz: {
        question: "Dual ta'lim shaklining afzalligi nimada?",
        answer: "Dual ta'limda o'quvchi nazariyani texnikumda o'qiydi va amaliy kunlari korxonalarda haq to'lanadigan ish o'rnida ishlaydi. Bitirganda ham diplom, ham 1-2 yillik rasmiy mehnat staji va tajribaga ega bo'ladi."
      },
      ru: {
        question: "В чем преимущество дуального образования?",
        answer: "При дуальном обучении учащиеся совмещают учебу с оплачиваемой практикой на реальных предприятиях и выпускаются с официальным трудовым стажем."
      },
      en: {
        question: "What are the advantages of the dual education system?",
        answer: "In dual education, students learn theory at the technicum and work in paid practical positions at enterprises on practice days. Upon graduation, they receive both a state diploma and 1-2 years of official work experience."
      }
    }
  },
  {
    id: 4,
    sort_order: 4,
    is_active: true,
    translations: {
      uz: {
        question: "Texnikum manzili qayerda va qanday bog'lanish mumkin?",
        answer: "Manzil: Farg'ona shahar, Farg'ona ko'chasi 170-uy (eski Neft va gaz sanoati kolleji binosi). Ma'lumot uchun telefonlar: 94-512-75-53, 88-413-22-00."
      },
      ru: {
        question: "Где находится техникум и как связаться?",
        answer: "Адрес: г. Фергана, ул. Ферганская, 170 (бывш. колледж Нефти и газа). Телефоны для справок: 94-512-75-53, 88-413-22-00."
      },
      en: {
        question: "Where is the technicum located and how can I get in touch?",
        answer: "Address: Fergana city, Fergana street 170 (former Oil and Gas Industry College building). Information hotlines: +998 94 512 75 53, +998 88 413 22 00."
      }
    }
  }
];

export function FAQSection() {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqsList);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await faqService.getFAQs();
        const list: FAQItem[] = Array.isArray(data) ? data : ((data as any)?.results || []);
        const activeFaqs = list
          .filter(faq => faq.is_active)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        if (activeFaqs.length > 0) {
          setFaqs(activeFaqs);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqsList;

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-black mb-5 uppercase tracking-[0.2em] shadow-md shadow-orange-500/20">
            <HelpCircle size={14} />
            {t('faq.badge', "Ko'p beriladigan savollar")}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
            {t('faq.title', 'Savollaringiz bormi?')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium mt-4">
            {t('faq.subtitle', 'Biz sizga yordam berishga tayyormiz')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <Accordion type="single" collapsible className="space-y-4 md:space-y-5">
            {displayFaqs.map((faq, index) => {
              const translation = faqService.getTranslation(faq, i18n.language);
              return (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="bg-slate-50 dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-gray-800 px-6 md:px-10 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-black text-gray-900 dark:text-white hover:text-[#0a3674] dark:hover:text-blue-400 py-6 text-base sm:text-xl leading-snug uppercase tracking-tight hover:no-underline border-none">
                    <span className="flex items-start gap-4">
                      <span className="text-amber-500 dark:text-amber-400 font-extrabold shrink-0">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span className="flex-grow">{translation.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pb-6 text-sm sm:text-base font-medium border-t border-gray-100 dark:border-gray-800 pt-4">
                    {translation.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
