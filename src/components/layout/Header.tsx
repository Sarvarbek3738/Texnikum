import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { LANGUAGES } from '../../lib/constants'
import logoImg from '../../assets/Fargona_5_son_texnikum_logo.svg'

export const Header = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const currentLang = i18n.language as any
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    useAppStore.setState({ language: lang as any })
  }

  const navItems = [
    { path: '/', label: 'Asosiy sahifa' },
    { path: '/about', label: 'Texnikum haqida' },
    { path: '/departments', label: 'Yo\'nalishlar' },
    { path: '/admission', label: 'Qabul' },
    { path: '/gallery', label: 'Galereya' },
    { path: '/contact', label: 'Bog\'lanish' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <div className="w-12 lg:w-14 h-12 lg:h-14 relative flex-shrink-0">
              <img src={logoImg} alt="Farg'ona 5-son Texnikumi" className="w-full h-full" />
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-xs lg:text-sm font-bold text-blue-900 leading-tight">Farg'ona 5-son</span>
              <span className="text-xs text-gray-600 leading-tight">texnikum</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 ml-12">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors pb-1 whitespace-nowrap ${
                    isActive
                      ? 'text-yellow-600 border-b-2 border-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Language Selector */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex gap-3 items-center">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`text-sm font-medium uppercase transition-colors px-2 py-1 rounded ${
                    currentLang === lang
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button & Language */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`text-xs font-medium uppercase transition-colors px-1.5 py-0.5 rounded ${
                    currentLang === lang
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded transition ${
                    isActive
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
