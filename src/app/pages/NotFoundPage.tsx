import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-[#0d89b1] mb-4 tracking-tighter">404</h1>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
            {t('notFound.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            {t('notFound.desc')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0d89b1] text-white rounded-lg hover:bg-[#0d89b1] transition-all font-black uppercase tracking-widest shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Home size={20} />
            {t('notFound.homeBtn')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-black uppercase tracking-widest border border-gray-300 dark:border-gray-700 shadow-md"
          >
            <ArrowLeft size={20} />
            {t('notFound.backBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
