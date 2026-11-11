import { SliderItem, SliderTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const sliderService = {
  async getSliders(): Promise<SliderItem[]> {
    const response = await fetch(`${API_BASE_URL}/sliders/`);
    if (!response.ok) {
      throw new Error('Failed to fetch sliders');
    }
    return response.json();
  },

  getTranslation(slider: SliderItem, lang: string): SliderTranslation {
    const translations = slider?.translations || ({} as any);
    const fallback: SliderTranslation = { title: '', description: '' };
    
    const targetLang = (lang === 'kr' || lang === 'uz_cyrl') ? 'uz_cyrl' : (lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'uz'));

    const chosen = (translations as any)[targetLang];
    if (chosen && typeof chosen.title === 'string' && chosen.title.trim().length > 0) {
      return chosen;
    }

    if (translations.uz && typeof translations.uz.title === 'string' && translations.uz.title.trim().length > 0) {
      return translations.uz;
    }

    if (translations.uz_cyrl && typeof translations.uz_cyrl.title === 'string' && translations.uz_cyrl.title.trim().length > 0) {
      return translations.uz_cyrl;
    }

    for (const key of ['ru', 'en', 'uz', 'uz_cyrl']) {
      const item = (translations as any)[key];
      if (item && typeof item.title === 'string' && item.title.trim().length > 0) {
        return item;
      }
    }
    
    return fallback;
  }
};
