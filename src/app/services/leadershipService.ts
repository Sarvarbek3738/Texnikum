import { LeadershipMember, LeadershipTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const leadershipService = {
  async getManagement(): Promise<LeadershipMember[]> {
    const response = await fetch(`${API_BASE_URL}/management/`);
    if (!response.ok) {
      throw new Error('Failed to fetch management data');
    }
    return response.json();
  },

  getTranslation(member: LeadershipMember, lang: string): LeadershipTranslation {
    const translations = member?.translations || ({} as any);
    const targetLang = (lang === 'kr' || lang === 'uz_cyrl') ? 'uz_cyrl' : (lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'uz'));

    const chosen: any = (translations as any)[targetLang] || {};
    const uz: any = translations.uz || {};
    const uz_cyrl: any = translations.uz_cyrl || {};

    const resolveField = (field: keyof LeadershipTranslation): string => {
      const targetVal = chosen[field];
      if (typeof targetVal === 'string' && targetVal.trim().length > 0) {
        return targetVal;
      }
      if (targetLang === 'uz_cyrl') {
        const cyrlVal = uz_cyrl[field];
        if (typeof cyrlVal === 'string' && cyrlVal.trim().length > 0) {
          return cyrlVal;
        }
      }
      const uzVal = uz[field];
      if (typeof uzVal === 'string' && uzVal.trim().length > 0) {
        return uzVal;
      }
      for (const k of ['ru', 'en', 'uz_cyrl', 'uz']) {
        const candidate = (translations as any)[k];
        if (candidate && typeof candidate[field] === 'string' && candidate[field].trim().length > 0) {
          return candidate[field];
        }
      }
      return '';
    };

    return {
      position: resolveField('position'),
      reception_hours: resolveField('reception_hours'),
      bio: resolveField('bio'),
    };
  }
};
