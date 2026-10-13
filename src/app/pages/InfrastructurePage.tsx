import { Loader2, Home, ChevronRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function InfrastructurePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-gray-500 hover:text-[#0d89b1] transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>{t('nav.home')}</span>
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.infrastructure')}</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
          >
            {t('nav.infrastructure').toUpperCase()}
          </motion.h1>
        </div>
      </div>

      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Building2 className="text-emerald-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              {t('common.notFound', 'Hozircha ma\'lumotlar mavjud emas')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Bu bo'limda litseyning moddiy-texnik bazasi haqida to'liq ma'lumot beriladi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
