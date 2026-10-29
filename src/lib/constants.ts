export const LANGUAGES = ['uz', 'ru', 'en'] as const
export const DEFAULT_LANGUAGE = 'uz'

export const DEPARTMENTS_MOCK = [
  {
    id: 1,
    slug: 'raqamli-axborot-ustasi',
    title: { uz: "Raqamli axborotlarni qayta ishlash ustasi", ru: "Мастер обработки цифровой информации", en: "Master of Digital Information Processing" },
    summary: { uz: "Kompyuter va raqamli texnologiyalarning asoslari", ru: "Основы компьютерных и цифровых технологий", en: "Basics of Computer and Digital Technologies" },
    description: { uz: "<p>Raqamli axborotlarni qayta ishlash sohasida mutaxassislik</p>", ru: "<p>Специальность в области обработки цифровой информации</p>", en: "<p>Specialization in digital information processing</p>" },
    forms: ['day'],
    duration: "2 yil 10 oy",
    level: "3-daraja",
    language: ['uz', 'ru'],
    subjects: [
      { uz: "Kompyuter asoslari", ru: "Основы компьютера", en: "Computer Basics", hours: 120 },
      { uz: "Dasturiy ta'minot", ru: "Программное обеспечение", en: "Software", hours: 150 },
    ],
    curriculumFile: "/files/raqamli-curriculum.pdf",
    careers: [{ uz: "IT mutaxassis", ru: "IT специалист", en: "IT Specialist" }],
    coverImage: "/images/departments/raqamli-axborot.webp",
    gallery: [],
    icon: "Monitor",
  },
  {
    id: 2,
    slug: 'kompyuter-tarmoqlari-it',
    title: { uz: "Kompyuter tarmoqlari va IT-servisi", ru: "Компьютерные сети и ИТ-услуги", en: "Computer Networks and IT Services" },
    summary: { uz: "Tarmoq administratori va IT tarafdori", ru: "Администратор сетей и ИТ-поддержка", en: "Network Administrator and IT Support" },
    description: { uz: "<p>Kompyuter tarmoqlari va IT xizmatlarining boshqaruvi</p>", ru: "<p>Управление компьютерными сетями и ИТ-услугами</p>", en: "<p>Management of computer networks and IT services</p>" },
    forms: ['day'],
    duration: "2 yil 10 oy",
    level: "3-daraja",
    language: ['uz', 'ru'],
    subjects: [
      { uz: "Tarmoq texnologiyasi", ru: "Сетевые технологии", en: "Network Technology", hours: 180 },
    ],
    curriculumFile: "/files/kompyuter-tarmoq-curriculum.pdf",
    careers: [{ uz: "Tarmoq admini", ru: "Администратор сети", en: "Network Admin" }],
    coverImage: "/images/departments/kompyuter-tarmoq.webp",
    gallery: [],
    icon: "Network",
  },
  {
    id: 3,
    slug: 'moda-tikuv',
    title: { uz: "Moda va tikuv ishlab chiqarish texnologiyasi", ru: "Технология производства моды и швейного производства", en: "Fashion and Sewing Production Technology" },
    summary: { uz: "Moda dizayni va tikuv", ru: "Дизайн моды и пошив", en: "Fashion Design and Sewing" },
    description: { uz: "<p>Zamonaviy moda va tikuv texnologiyasi</p>", ru: "<p>Современные технологии моды и пошива</p>", en: "<p>Modern fashion and sewing technologies</p>" },
    forms: ['day', 'dual'],
    duration: "2 yil 10 oy",
    level: "3-daraja",
    language: ['uz', 'ru'],
    subjects: [
      { uz: "Moda dizayni", ru: "Дизайн моды", en: "Fashion Design", hours: 200 },
    ],
    curriculumFile: "/files/moda-curriculum.pdf",
    careers: [{ uz: "Tikuvchi", ru: "Портной", en: "Tailor" }],
    coverImage: "/images/departments/moda-tikuv.webp",
    gallery: [],
    icon: "Scissors",
  },
]

export const NEWS_CATEGORIES = [
  { value: 'news', label_uz: 'Yangilik', label_ru: 'Новость', label_en: 'News' },
  { value: 'announcement', label_uz: 'E\'lon', label_ru: 'Объявление', label_en: 'Announcement' },
  { value: 'event', label_uz: 'Tadbir', label_ru: 'Событие', label_en: 'Event' },
  { value: 'achievement', label_uz: 'Yutuq', label_ru: 'Достижение', label_en: 'Achievement' },
]

export const ADMISSION_STEPS = [
  { number: 1, key: 'personal_info', uz: 'Shaxsiy ma\'lumot', ru: 'Личная информация', en: 'Personal Information' },
  { number: 2, key: 'education', uz: 'Ta\'lim', ru: 'Образование', en: 'Education' },
  { number: 3, key: 'department', uz: 'Yo\'nalish', ru: 'Направление', en: 'Department' },
  { number: 4, key: 'documents', uz: 'Hujjatlar', ru: 'Документы', en: 'Documents' },
  { number: 5, key: 'confirm', uz: 'Tasdiqlash', ru: 'Подтверждение', en: 'Confirmation' },
]

export const STAFF_DEPARTMENTS = [
  { value: 'all', uz: 'Barchasi', ru: 'Все', en: 'All' },
  { value: 'admin', uz: 'Umumtanim', ru: 'Общеобразовательные', en: 'General' },
  { value: 'lang', uz: 'Tillar', ru: 'Языки', en: 'Languages' },
  { value: 'special', uz: 'Maxsus fanlar', ru: 'Специальные предметы', en: 'Special Subjects' },
]
