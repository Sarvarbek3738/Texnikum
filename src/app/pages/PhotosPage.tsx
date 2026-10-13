import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skeleton } from '../components/ui/skeleton';

export function PhotosPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const photoGalleries = [
    {
      id: 1,
      title: t('photos.graduation'),
      date: '25 May, 2025',
      photos: [
        'https://images.unsplash.com/photo-1622030797403-fa221ce5d208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJla2lzdGFuJTIwc3R1ZGVudHMlMjBncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzc1NDU4MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1563290330-6a0d53b6e5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbXBldGl0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzc1NDU4ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      count: 45,
    },
    {
      id: 2,
      title: t('photos.olympiad'),
      date: '15 Mart, 2026',
      photos: [
        'https://images.unsplash.com/photo-1769201153045-98827f62996b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50cyUyMGdyb3VwJTIwcGhvdG98ZW58MXx8fHwxNzc1NDU4ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      count: 32,
    },
    {
      id: 3,
      title: t('photos.sports'),
      date: '10 Fevral, 2026',
      photos: [
        'https://images.unsplash.com/photo-1763639700458-38a0fd25335d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzcG9ydHMlMjBkYXklMjBldmVudHxlbnwxfHx8fDE3NzU0NTg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      count: 28,
    },
    {
      id: 4,
      title: t('photos.stem'),
      date: '5 Mart, 2026',
      photos: [
        'https://images.unsplash.com/photo-1747302864285-27e6a2dd82a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmFpciUyMHN0dWRlbnRzfGVufDF8fHx8MTc3NTQ1ODg3OXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3NTQwMjk5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      count: 38,
    },
  ];

  const allPhotos = photoGalleries.flatMap(gallery => gallery.photos);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-300">
      {/* Page Header */}
      <div className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block relative">
            <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 px-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-[0.2em]"
              >
                FOTO LAVHALAR
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12 bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))
            ) : (
              allPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 8) * 0.05 }}
                  className="aspect-square relative overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300 group cursor-default bg-white dark:bg-gray-800"
                >
                  <ImageWithFallback
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

