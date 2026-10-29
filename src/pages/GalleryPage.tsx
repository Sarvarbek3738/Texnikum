import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

const MOCK_GALLERY = [
  { id: 1, src: 'https://via.placeholder.com/400x300?text=Tadbirlar', title: 'Tadbirlar', category: 'events' },
  { id: 2, src: 'https://via.placeholder.com/400x300?text=Binolar', title: 'Bino', category: 'infrastructure' },
  { id: 3, src: 'https://via.placeholder.com/400x300?text=Laboratoriya', title: 'Laboratoriya', category: 'infrastructure' },
  { id: 4, src: 'https://via.placeholder.com/400x300?text=Sportkomplek', title: 'Sport', category: 'sports' },
  { id: 5, src: 'https://via.placeholder.com/400x300?text=Yotoqxona', title: 'Yotoqxona', category: 'infrastructure' },
  { id: 6, src: 'https://via.placeholder.com/400x300?text=Oqituvchilar', title: 'O\'qituvchilar', category: 'people' },
]

export const GalleryPage = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'Barchasi' },
    { value: 'events', label: 'Tadbirlar' },
    { value: 'infrastructure', label: 'Bino' },
    { value: 'sports', label: 'Sport' },
    { value: 'people', label: 'Odamlar' },
  ]

  const filteredImages = MOCK_GALLERY.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  )

  return (
    <div>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t('common.gallery')}</h1>
          <p className="text-lg text-blue-100">Texnikum hayoti va tadbirlaridagi fotolar.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white font-bold">🔍 Ko\'rish</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages.find((img) => img.id === selectedImage)?.src}
              alt="Gallery"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:bg-black/40 p-2 rounded-lg transition"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => {
                  const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage)
                  if (currentIdx > 0) {
                    setSelectedImage(filteredImages[currentIdx - 1].id)
                  }
                }}
                className="text-white bg-black/50 hover:bg-black/80 px-6 py-2 rounded transition"
              >
                ← Oldingi
              </button>
              <button
                onClick={() => {
                  const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage)
                  if (currentIdx < filteredImages.length - 1) {
                    setSelectedImage(filteredImages[currentIdx + 1].id)
                  }
                }}
                className="text-white bg-black/50 hover:bg-black/80 px-6 py-2 rounded transition"
              >
                Keyingi →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
