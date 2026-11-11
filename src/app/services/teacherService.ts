import { TeacherResponse, Teacher, TeacherTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const teacherService = {
  async getAllTeachers(page = 1, pageSize = 100): Promise<TeacherResponse> {
    const response = await fetch(`${API_BASE_URL}/teachers/?page=${page}&page_size=${pageSize}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return response.json();
  },

  async getTeacherBySlug(slug: string): Promise<Teacher> {
    const response = await fetch(`${API_BASE_URL}/teachers/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch teacher detail');
    }
    return response.json();
  },

  getTranslation(teacher: Teacher, lang: string): TeacherTranslation {
    const translations = teacher?.translations || ({} as any);
    const targetLang = (lang === 'kr' || lang === 'uz_cyrl') ? 'uz_cyrl' : (lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'uz'));

    const chosen: any = (translations as any)[targetLang] || {};
    const uz: any = translations.uz || {};
    const uz_cyrl: any = translations.uz_cyrl || {};

    const resolveField = (field: keyof TeacherTranslation): string => {
      // 1. Target language value
      const targetVal = chosen[field];
      if (typeof targetVal === 'string' && targetVal.trim().length > 0) {
        return targetVal;
      }
      // 2. If cyrillic was requested, check uz_cyrl
      if (targetLang === 'uz_cyrl') {
        const cyrlVal = uz_cyrl[field];
        if (typeof cyrlVal === 'string' && cyrlVal.trim().length > 0) {
          return cyrlVal;
        }
      }
      // 3. Fallback to primary Uzbek (uz)
      const uzVal = uz[field];
      if (typeof uzVal === 'string' && uzVal.trim().length > 0) {
        return uzVal;
      }
      // 4. Fallback to any non-empty language
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
      subject: resolveField('subject'),
      bio: resolveField('bio'),
      achievements: resolveField('achievements'),
    };
  }
};
