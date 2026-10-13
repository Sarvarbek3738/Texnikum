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
    if (!settings) {
      return {
        short_name: lang === 'ru' ? 'Политехнический техникум №5' : '5-son Politexnika Texnikumi',
        full_name: lang === 'ru' 
          ? 'Политехнический техникум №5 Ферганской области' 
          : "Farg'ona viloyati 5-sonli politexnika texnikumi",
        address: lang === 'ru'
          ? 'Ферганская область, г. Фергана, ул. Саноат, 5'
          : "Farg'ona viloyati, Farg'ona shahri, Sanoat ko'chasi, 5-uy"
      };
    }

    const fallback: SiteTranslations = {
      short_name: lang === 'ru' ? 'Политехнический техникум №5' : '5-son Politexnika Texnikumi',
      full_name: lang === 'ru' 
        ? 'Политехнический техникум №5 Ферганской области' 
        : "Farg'ona viloyati 5-sonli politexnika texnikumi",
      address: lang === 'ru'
        ? 'Ферганская область, г. Фергана, ул. Саноат, 5'
        : "Farg'ona viloyati, Farg'ona shahri, Sanoat ko'chasi, 5-uy"
    };

    if (!settings.translations) {
      return fallback;
    }

    // Map kr to uz since API doesn't have kr translations
    const apiLang = lang === 'kr' ? 'uz' : lang;
    return settings.translations[apiLang as keyof typeof settings.translations] || settings.translations.uz || fallback;
  },

  getSocialLinks(settings: SiteSettings | null) {
    const admissionChannel = 'https://t.me/texnikum5_uz';
    const instagramOfficial = 'https://www.instagram.com/texnikum5_uz';

    if (!settings) {
      return {
        telegram: 'https://t.me/texnikum5_uz',
        instagram: instagramOfficial,
        facebook: null,
        youtube: 'https://youtube.com',
        telegramAdmission: admissionChannel
      };
    }

    return {
      telegram: settings.telegram || 'https://t.me/texnikum5_uz',
      instagram: settings.instagram || instagramOfficial,
      facebook: null,
      youtube: settings.youtube || 'https://youtube.com',
      telegramAdmission: admissionChannel
    };
  },

  getContactInfo(settings: SiteSettings | null) {
    if (!settings) {
      return {
        phone: '+998 73 244 05 05',
        email: 'info@5texnikum.uz',
        website: 'https://5texnikum.uz',
        established_year: 1998
      };
    }

    return {
      phone: settings.phone || '+998 73 244 05 05',
      email: settings.email || 'info@5texnikum.uz',
      website: settings.website || 'https://5texnikum.uz',
      established_year: settings.established_year || 1998,
      logo: settings.logo || '/logoicon.png'
    };
  }
};

// Default settings for fallback
export const defaultSettings: SiteSettings = {
  id: 1,
  translations: {
    uz: {
      short_name: "5-son Politexnika Texnikumi",
      full_name: "Farg'ona viloyati 5-sonli politexnika texnikumi",
      address: "Farg'ona viloyati, Farg'ona shahri, Sanoat ko'chasi, 5-uy"
    },
    ru: {
      short_name: "Политехнический техникум №5",
      full_name: "Политехнический техникум №5 Ферганской области",
      address: "Ферганская область, г. Фергана, ул. Саноат, 5"
    }
  },
  established_year: 1998,
  phone: "+998 73 244 05 05",
  email: "info@5texnikum.uz",
  website: "https://5texnikum.uz",
  logo: "/logoicon.png",
  telegram: null,
  instagram: null,
  facebook: null,
  youtube: null
};
