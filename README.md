# Farg'ona shahar 5-son texnikumining rasmiy veb-sayti

Frontend React loyihasi. React 18 + TypeScript + Vite + TailwindCSS + React Router v6 + i18next

## 🚀 Boshlash

### O'rnatish

```bash
npm install
```

### Development

```bash
npm run dev
```

Sayt: `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Loyiha Tuzilmasi

```
src/
├── components/           # UI komponenti va layout
│   ├── layout/          # Header, Footer
│   ├── ui/              # Button, Form, Tabs
├── features/            # Feature-based
│   ├── admission/       # Qabul tizimi
│       ├── components/  # Form bosqichlari
│       ├── hooks/       # Validatsiya, forma logikasi
│       ├── types.ts
├── pages/               # Sahifa komponentlari
├── store/               # Zustand global state
├── types/               # TypeScript turlari
├── locales/             # Tarjimalar (uz, ru, en)
├── lib/                 # Utilitar funksiyalar, konstantes
└── App.tsx              # Routing
```

## 🌍 Ko'p tillilik

Sayt 3 tilda mavjud:
- **uz** - O'zbek (lotin)
- **ru** - Rus
- **en** - Ingliz

Tillar `src/locales/` da fayllar sifatida saqlangan.

## 🔗 Sahifalar

| URL | Sarlavha | Holati |
|-----|----------|--------|
| `/` | Bosh sahifa | ✅ Tayyor |
| `/about` | Texnikum haqida | ✅ Tayyor |
| `/admission` | Qabul (ariza + holatni tekshirish) | ✅ Tayyor |
| `/departments` | Yo'nalishlar | ✅ Tayyor |
| `/news` | Yangiliklar | ✅ Tayyor |
| `/gallery` | Galereya | ✅ Tayyor |
| `/contact` | Bog'lanish | ✅ Tayyor |

## ✨ Features

### Qabul Tizimi
- ✅ 5-bosqichli ko'p-forma
- ✅ Real-time validatsiya
- ✅ Auto-save draft (localStorage)
- ✅ Ariza holatini tekshirish

### Umumiy
- ✅ 3 tilli (uz/ru/en)
- ✅ Responsive dizayn
- ✅ TailwindCSS styling
- ✅ React Router v6
- ✅ Zustand state management
- ✅ Mock API data

## 🔧 Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router v6** - Routing
- **react-i18next** - Localization
- **Zustand** - State management
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Validation

## 📝 Environment

Hozircha `.env` faylga ehtiyoj yo'q. Mock data ishlatilmoqda.

Future uchun:
- `VITE_API_URL` - Backend API
- `VITE_SITE_URL` - Production URL
- `VITE_CAPTCHA_SITE_KEY` - Captcha key

## 🎨 Dizayn

- Brend ranglari: Ko'k (#1E40AF), Sariq (#F5B301), Orang (#F97316)
- Breakpoints: mobile (320px), tablet (640px), laptop (1024px), desktop (1440px)
- Animatsiyalar: Smooth transitions, hover effects

## 🧪 Mock Data

Qabul tizimi demo ma'lumotlari:
- Ariza raqami: `APP-1001` (Qabul qilindi)
- Ariza raqami: `APP-1002` (Ko'rib chiqilmoqda)

## 📦 Build Stats

- CSS: ~28 KB (gzip: 6 KB)
- JS: ~224 KB (gzip: 69 KB)
- Total: ~233 KB (gzip: 75 KB)

## 🔄 Keyingi Bosqichlar

- [ ] Backend API integratsiyasi
- [ ] Admin panel
- [ ] E-mail notifikatsiyalar
- [ ] SMS xabarlari
- [ ] PWA o'rnatish
- [ ] SEO optimallashtirish
- [ ] Lighthouse optimization (90+)
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] Real resimlar va kontent

## 📞 Support

Savollar uchun: info@texnikum5.uz

---

Yaratildi: 2024-10-20
Version: 1.0.0
