import { Department } from '../types';

import { API_BASE_URL } from '../../config/api';

export const departmentService = {
  async getAllDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/departments/`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }
    return response.json();
  },

  async getDepartmentBySlug(slug: string): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch department detail');
    }
    return response.json();
  },

  getTranslation(department: Department, lang: string) {
    const translations = department?.translations || ({} as any);
    const targetLang = (lang === 'kr' || lang === 'uz_cyrl') ? 'uz_cyrl' : (lang === 'ru' ? 'ru' : (lang === 'en' ? 'en' : 'uz'));

    const chosen = (translations as any)[targetLang] || {};
    const uz = translations.uz || {};
    const uz_cyrl = translations.uz_cyrl || {};

    const resolveField = (field: 'name' | 'description'): string => {
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
      name: resolveField('name'),
      description: resolveField('description'),
    };
  }
};
