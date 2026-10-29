import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { FormField, FormInput, FormTextArea } from '../components/ui/FormField'

export const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Forma:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t('common.contact')}</h1>
          <p className="text-lg text-blue-100">Biz bilan bog\'lanish. Har qanday savollar uchun.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Aloqa ma\'lumotlari</h2>

            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-1">Manzil</h3>
                <p className="text-gray-700">Farg\'ona ko\'chasi, 170-uy</p>
                <p className="text-gray-600">Farg\'ona shahar, O\'zbekiston</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-1">Telefon</h3>
                <p className="text-gray-700">
                  <a href="tel:+998945127553">+998-94-512-75-53</a>
                </p>
                <p className="text-gray-600">
                  <a href="tel:+998884132200">+998-88-413-22-00</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:info@texnikum5.uz">info@texnikum5.uz</a>
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-1">Ish vaqti</h3>
                <p className="text-gray-700">Dushanba - Juma: 08:00 - 17:00</p>
                <p className="text-gray-600">Shanba - Yakshanba: Yopiq</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold mb-4">Ijtimoiy tarmoqlar</h3>
              <div className="flex gap-4">
                {[
                  { name: 'Telegram', url: '#' },
                  { name: 'Instagram', url: '#' },
                  { name: 'YouTube', url: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Xabar yuborish</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">✅ Xabaringiz yuborildi!</p>
                <p className="text-sm text-green-600">Biz tez orada siz bilan bog\'lanamiz.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <FormField label="Ismingiz" required>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Familiya Ism"
                  required
                />
              </FormField>

              {/* Email */}
              <FormField label="Email" required>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.uz"
                  required
                />
              </FormField>

              {/* Phone */}
              <FormField label="Telefon" required>
                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  required
                />
              </FormField>

              {/* Message */}
              <FormField label="Xabar" required>
                <FormTextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Siz bilan bog\'lanishni xohlaymiz..."
                  rows={5}
                  required
                />
              </FormField>

              {/* Submit */}
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Yuborish
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Xarita</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-200">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=71.2,37.7,71.3,37.8&layer=mapnik&marker=37.75,71.25"
              style={{ border: 0 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Farg\'ona ko\'chasi, 170-uy
          </p>
        </div>
      </section>
    </div>
  )
}
