import { FAQItem, FAQTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const faqService = {
  async getFAQs(): Promise<FAQItem[]> {
    const response = await fetch(`${API_BASE_URL}/faqs/`);
    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }
    return response.json();
  },

  getTranslation(faq: FAQItem, lang: string): FAQTranslation {
    const translations = faq?.translations || ({} as any);
    const fallback: FAQTranslation = { question: '', answer: '' };
    
    // Map i18n codes to API codes
    const targetLang = (lang === 'kr' || lang === 'uz_cyrl') ? 'uz_cyrl' : (lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'uz'));

    const chosen = (translations as any)[targetLang];
    if (chosen && typeof chosen.question === 'string' && chosen.question.trim().length > 0) {
      return chosen;
    }

    // Fallback to uz if current translation is missing or empty
    if (translations.uz && typeof translations.uz.question === 'string' && translations.uz.question.trim().length > 0) {
      return translations.uz;
    }

    // Fallback to uz_cyrl if available
    if (translations.uz_cyrl && typeof translations.uz_cyrl.question === 'string' && translations.uz_cyrl.question.trim().length > 0) {
      return translations.uz_cyrl;
    }

    // Try any non-empty language
    for (const key of ['ru', 'en', 'uz', 'uz_cyrl']) {
      const item = (translations as any)[key];
      if (item && typeof item.question === 'string' && item.question.trim().length > 0) {
        return item;
      }
    }
    
    return fallback;
  }
};
