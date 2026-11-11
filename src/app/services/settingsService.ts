export interface SiteTranslations {
  short_name: string;
  full_name: string;
  address: string;
}

export interface SiteSettings {
  id: number;
  translations: {
    uz: SiteTranslations;
    ru: SiteTranslations;
  };
  established_year: number;
  phone: string;
  email: string;
  website: string;
  logo: string;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

import { API_BASE_URL } from '../../config/api';

export const settingsService = {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/`);
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  getTranslation(settings: SiteSettings | null, lang: string): SiteTranslations {
    const isRu = lang === 'ru' || lang.startsWith('ru');
    const isEn = lang === 'en' || lang.startsWith('en');

    const fallback: SiteTranslations = {
      short_name: isRu ? 'Техникум №5' : isEn ? 'Technicum No. 5' : '5-son Texnikumi',
      full_name: isRu 
        ? 'Техникум №5 города Ферганы' 
        : isEn
        ? 'Fergana City Technicum No. 5'
        : "Farg'ona shahar 5-son texnikumi",
      address: isRu
        ? 'г. Фергана, ул. Ферганская, 170 (бывш. колледж Нефти и газа)'
        : isEn
        ? 'Fergana city, Fergana street 170 (former Oil and Gas Industry College)'
        : "Farg'ona shahar, Farg'ona ko'chasi 170-uy (eski Neft va gaz sanoati kolleji)"
    };

    if (!settings || !settings.translations) {
      return fallback;
    }

    // Map kr to uz since API doesn't have kr translations
    const apiLang = lang === 'kr' ? 'uz' : isEn ? 'en' : isRu ? 'ru' : 'uz';
    const chosen = (settings.translations as any)[apiLang];
    if (chosen && chosen.short_name) {
      return chosen;
    }
    return settings.translations.uz || fallback;
  },

  getSocialLinks(settings: SiteSettings | null) {
    const admissionChannel = 'https://t.me/Fargona5SonTexnikum';
    const instagramOfficial = 'https://www.instagram.com/fargona_5_texnikum';
    const facebookOfficial = 'https://www.facebook.com/people/Fargona-shahar-5-son-texnikumi/61587701660813/';

    if (!settings) {
      return {
        telegram: 'https://t.me/Fargona5SonTexnikum',
        instagram: instagramOfficial,
        facebook: facebookOfficial,
        youtube: 'https://www.youtube.com/@Far5technicum',
        telegramAdmission: admissionChannel
      };
    }

    return {
      telegram: settings.telegram || 'https://t.me/Fargona5SonTexnikum',
      instagram: settings.instagram || instagramOfficial,
      facebook: settings.facebook || facebookOfficial,
      youtube: settings.youtube || 'https://www.youtube.com/@Far5technicum',
      telegramAdmission: admissionChannel
    };
  },

  getContactInfo(settings: SiteSettings | null) {
    if (!settings) {
      return {
        phone: '+998 88 413 22 00',
        phoneSecondary: '+998 94 512 75 53',
        email: 'far5technikum@gmail.com',
        website: 'https://5texnikum.uz',
        established_year: 1998,
        logo: '/logo.png'
      };
    }

    return {
      phone: settings.phone || '+998 88 413 22 00',
      phoneSecondary: '+998 94 512 75 53',
      email: settings.email || 'far5technikum@gmail.com',
      website: settings.website || 'https://5texnikum.uz',
      established_year: settings.established_year || 1998,
      logo: settings.logo || '/logo.png'
    };
  }
};

// Default settings for fallback
export const defaultSettings: SiteSettings = {
  id: 1,
  translations: {
    uz: {
      short_name: "5-son Texnikumi",
      full_name: "Farg'ona shahar 5-son texnikumi",
      address: "Farg'ona shahar, Farg'ona ko'chasi 170-uy (eski Neft va gaz sanoati kolleji)"
    },
    ru: {
      short_name: "Техникум №5",
      full_name: "Техникум №5 города Ферганы",
      address: "г. Фергана, ул. Ферганская, 170 (бывш. колледж Нефти и газа)"
    }
  },
  established_year: 1998,
  phone: "+998 88 413 22 00",
  email: "far5technikum@gmail.com",
  website: "https://5texnikum.uz",
  logo: "/logo.png",
  telegram: null,
  instagram: null,
  facebook: null,
  youtube: null
};
