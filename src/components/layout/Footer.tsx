import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4">{t('common.appName')}</h3>
            <p className="text-gray-300 text-sm">Farg'ona shahar 5-son texnikumi rasmiy veb-sayti</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-400">{t('common.home')}</Link></li>
              <li><Link to="/admission" className="hover:text-yellow-400">{t('common.admission')}</Link></li>
              <li><Link to="/departments" className="hover:text-yellow-400">{t('common.departments')}</Link></li>
              <li><Link to="/news" className="hover:text-yellow-400">{t('common.news')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('common.contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +998-94-512-75-53</li>
              <li>📞 +998-88-413-22-00</li>
              <li>📧 info@texnikum5.uz</li>
              <li>📍 Farg'ona ko'chasi, 170-uy</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Ijtimoiy tarmoqlar</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-400">Telegram</a>
              <a href="#" className="hover:text-yellow-400">Instagram</a>
              <a href="#" className="hover:text-yellow-400">YouTube</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Farg'ona 5-son texnikumi. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white">Maxfiylik siyosati</Link>
              <Link to="/terms" className="hover:text-white">Foydalanish shartlari</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
