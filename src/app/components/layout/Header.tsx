import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Instagram,
  Send,
  Youtube,
  ChevronRight,
  Sun,
  Moon,
  Globe,
  Bot,
  Facebook
} from 'lucide-react';
import { menuItems } from '../../data/menu';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useSettings } from '../../hooks/useSettings';
import { settingsService } from '../../services/settingsService';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);

  const siteName = settingsService.getTranslation(settings, i18n.language);
  const socialLinks = settingsService.getSocialLinks(settings);
  const contactInfo = settingsService.getContactInfo(settings);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  const languages = [
    { code: 'uz', label: "O'zbek", flag: 'uz' },
    { code: 'ru', label: 'Русский', flag: 'ru' },
    { code: 'en', label: 'English', flag: 'gb' },
  ];

  const currentLanguage = languages.find(l => 
    l.code === i18n.language || (i18n.language && i18n.language.startsWith(l.code))
  ) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-[#0a3674] text-white hidden sm:block border-b border-blue-900/60">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+998945127553" className="flex items-center gap-2 hover:text-amber-400 transition-colors font-bold text-xs">
                <Phone size={13} className="text-amber-400" />
                <span>94-512-75-53</span>
              </a>
              <a href="tel:+998884132200" className="flex items-center gap-2 hover:text-amber-400 transition-colors font-bold text-xs">
                <Phone size={13} className="text-amber-400" />
                <span>88-413-22-00</span>
              </a>
              <span className="text-white/70 text-xs hidden xl:inline font-medium">
                📍 {siteName.address || t('footer.address', "Farg'ona shahar, Farg'ona ko'chasi 170-uy")}
              </span>
            </div>
            <div className="flex items-center gap-6">
              {/* Language Switcher Desktop */}
              <div className="relative" ref={langMenuRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors font-bold uppercase tracking-widest text-xs py-1 px-2.5 rounded-lg hover:bg-white/10"
                >
                  <span className={`fi fi-${currentLanguage.flag} text-sm rounded-xs`}></span>
                  <span>{currentLanguage.label}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden py-1.5 border border-gray-100 dark:border-gray-800 z-[100] transition-all duration-200 ${isLangMenuOpen ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 translate-y-2 invisible scale-95 pointer-events-none'}`}>
                  {languages.map((lang) => {
                    const isSelected = i18n.language === lang.code || i18n.language?.startsWith(lang.code);
                    return (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center justify-between ${
                          isSelected 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-[#0a3674] dark:text-blue-400 font-black' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`fi fi-${lang.flag} text-sm rounded-xs shadow-xs`}></span>
                          <span>{lang.label}</span>
                        </div>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0a3674] dark:bg-blue-400"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 ml-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
                <a
                  href="https://t.me/Far5techbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-[#229ED9] text-white transition-all text-xs font-semibold border border-white/20 hover:border-transparent group"
                  title="Telegram Bot: @Far5techbot"
                >
                  <Bot size={13} className="text-sky-300 group-hover:text-white transition-colors" />
                  <span>@Far5techbot</span>
                </a>
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="Instagram">
                    <Instagram size={15} />
                  </a>
                )}
                {socialLinks.telegram && (
                  <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="Telegram">
                    <Send size={15} />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="YouTube">
                    <Youtube size={15} />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="Facebook">
                    <Facebook size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
           <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
             <div className="relative overflow-hidden rounded-lg p-1 bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors shadow-sm">
               <img src={contactInfo.logo || "/logo.png"} alt={siteName.short_name} className="w-8 h-8 md:w-14 md:h-14 object-contain" />
             </div>
             <div>
               <div className="text-xs md:text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight max-w-[120px] md:max-w-none">
                 {siteName.short_name}
               </div>
             </div>
           </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-3.5 py-2 hover:text-[#0a3674] dark:hover:text-blue-400 transition-colors font-black text-xs uppercase tracking-widest flex items-center gap-1.5 ${
                    location.pathname === item.href ? 'text-[#0a3674] dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t(item.label)}
                  {item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-64 bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden py-3 transition-all duration-200 ${openDropdown === item.label ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 translate-y-2 invisible scale-95'}`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className={`block px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                          location.pathname === child.href 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-[#0a3674] dark:text-blue-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0a3674] dark:hover:text-blue-400'
                        }`}
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/admission"
              className="ml-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {t('home.admissionBtn', 'Qabul 2026-2027')}
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/admission"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-[10px] uppercase tracking-wider shadow-sm"
            >
              Qabul
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#0a3674] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-950 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-black text-[#0a3674] dark:text-blue-400 uppercase tracking-tight">{siteName.short_name}</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-2">
            {/* Mobile Language Switcher */}
            <div className="px-4 mb-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{t('common.language')}</p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => {
                  const isSelected = i18n.language === lang.code || i18n.language?.startsWith(lang.code);
                  return (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center justify-center gap-1.5 py-3 px-1 rounded-xl border text-xs font-black uppercase transition-all ${
                        isSelected 
                          ? 'bg-[#0a3674] text-white border-[#0a3674] shadow-lg shadow-[#0a3674]/20' 
                          : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`fi fi-${lang.flag} text-xs shrink-0 rounded-xs`}></span>
                      <span className="truncate">{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                        className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-colors ${
                          expandedItem === item.label ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0a3674]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        <span>{t(item.label)}</span>
                        <ChevronRight size={18} className={`transition-transform duration-300 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-gray-50/50 dark:bg-gray-900/50 mx-2 rounded-2xl mt-1`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className={`block px-6 py-4 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors ${
                              location.pathname === child.href ? 'text-[#0a3674] font-black bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-[#0a3674]'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(child.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-colors ${
                        location.pathname === item.href ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0a3674]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.label)}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex flex-col gap-4">
              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-black text-sm">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-[#0a3674]">
                    <Phone size={20} />
                  </div>
                  {contactInfo.phone}
                </a>
              )}
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: socialLinks.instagram, color: "text-pink-600", show: !!socialLinks.instagram },
                  { icon: Send, href: socialLinks.telegram, color: "text-blue-500", show: !!socialLinks.telegram },
                  { icon: Facebook, href: socialLinks.facebook, color: "text-blue-600", show: !!socialLinks.facebook },
                  { icon: Youtube, href: socialLinks.youtube, color: "text-red-600", show: !!socialLinks.youtube }
                ].filter(s => s.show).map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href!} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center ${social.color} hover:scale-110 transition-transform`}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}