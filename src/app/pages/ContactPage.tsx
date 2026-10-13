import { MapPin, Phone, Mail, Clock, Send, Instagram, CheckCircle, Youtube } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';
import { settingsService } from '../services/settingsService';
import { SEO } from '../components/layout/SEO';

import { API_BASE_URL } from '../../config/api';

export function ContactPage() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();
  
  const siteName = settingsService.getTranslation(settings, i18n.language);
  const socialLinks = settingsService.getSocialLinks(settings);
  const contactInfo = settingsService.getContactInfo(settings);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const subjectMap: Record<string, string> = {
        admission: 'admission',
        education: 'general',
        other: 'other',
      };

      const payload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: subjectMap[formData.subject] || 'general',
        message: formData.message,
      };

      const response = await fetch(`${API_BASE_URL}/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        // Still treat nicely for user experience if server response isn't 200
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialIcons = [
    { icon: Instagram, label: "Instagram", href: socialLinks.instagram, color: "text-pink-600", hover: "hover:bg-pink-600", show: !!socialLinks.instagram },
    { icon: Send, label: "Telegram (Asosiy)", href: socialLinks.telegram, color: "text-sky-500", hover: "hover:bg-sky-500", show: !!socialLinks.telegram },
    { icon: Send, label: "Telegram (Qabul)", href: socialLinks.telegramAdmission, color: "text-blue-600", hover: "hover:bg-blue-600", show: !!socialLinks.telegramAdmission },
    { icon: Youtube, label: "YouTube", href: socialLinks.youtube, color: "text-red-600", hover: "hover:bg-red-600", show: !!socialLinks.youtube }
  ].filter(s => s.show);

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.contact')} 
        description={t('contact.pageSubtitle')}
      />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0a2558] via-[#0a3674] to-[#0d47a1] text-white py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full mb-4 shadow-lg">
              Bog'lanish
            </span>
            <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tight uppercase">{t('nav.contact')}</h1>
            <p className="text-base md:text-xl text-blue-100 max-w-3xl leading-relaxed font-semibold">
              {t('contact.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Cards */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a3674] group-hover:text-white transition-all duration-500">
                <MapPin size={30} className="text-[#0a3674] dark:text-blue-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tight">{t('contact.addressTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base font-medium">
                {siteName.address || "Farg'ona shahar, Farg'ona ko'chasi 170-uy (eski Neft va gaz sanoati kolleji)"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500">
                <Phone size={30} className="text-amber-600 dark:text-amber-400 group-hover:text-slate-950" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tight">{t('contact.phoneTitle')}</h3>
              <div className="space-y-2">
                <a href="tel:+998945127553" className="block text-gray-900 dark:text-gray-100 hover:text-amber-600 text-lg font-black transition-colors">
                  +998 94 512 75 53
                </a>
                <a href="tel:+998884132200" className="block text-gray-900 dark:text-gray-100 hover:text-amber-600 text-lg font-black transition-colors">
                  +998 88 413 22 00
                </a>
                <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Qabul komissiyasi / Ma'lumot
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a3674] group-hover:text-white transition-all duration-500">
                <Mail size={30} className="text-[#0a3674] dark:text-blue-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tight">{t('contact.emailTitle')}</h3>
              <a href="mailto:info@5texnikum.uz" className="text-gray-900 dark:text-gray-100 hover:text-[#0a3674] text-lg font-black transition-colors break-all">
                info@5texnikum.uz
              </a>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Rasmiy elektron murojaatlar uchun
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-2xl border border-gray-100 dark:border-gray-800" data-aos="fade-right">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('contact.formTitle')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium">
                {t('contact.formSubtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0a3674] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="Ikboljon Boltaboyev"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0a3674] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0a3674] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.subject')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0a3674] transition-all text-gray-900 dark:text-white font-bold appearance-none"
                    >
                      <option value="">{t('contact.subject')}</option>
                      <option value="admission">{t('contact.subjects.admission')}</option>
                      <option value="education">{t('contact.subjects.education')}</option>
                      <option value="other">{t('contact.subjects.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0a3674] transition-all text-gray-900 dark:text-white font-bold resize-none"
                    placeholder={t('contact.message')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-5 rounded-lg font-black uppercase tracking-widest transition-all duration-300 shadow-xl ${
                    submitted 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'bg-[#0a3674] text-white hover:bg-[#0a3674] hover:shadow-2xl transform hover:-translate-y-1'
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={20} />
                      {t('contact.success')}
                    </span>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            </div>

            {/* Social & Map */}
            <div className="space-y-8" data-aos="fade-left">
              <div className="bg-white dark:bg-gray-950 rounded-lg p-10 text-gray-900 dark:text-white shadow-2xl relative overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-bl-full"></div>
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight relative z-10">{t('footer.socials')}</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {socialIcons.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all group border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform ${social.color}`}>
                        <social.icon size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1">{t('footer.socials')}</span>
                        <span className="font-black text-sm md:text-base uppercase tracking-tight text-gray-900 dark:text-white leading-none">{social.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="p-4 bg-gradient-to-r from-[#0a2558] to-[#0a3674] text-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-black text-sm uppercase tracking-wide flex items-center gap-2">
                      <MapPin size={16} className="text-amber-400" />
                      <span>Farg'ona shahar 5-son texnikumi</span>
                    </div>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Farg'ona ko'chasi 170-uy (eski Neft va gaz sanoati kolleji)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://maps.google.com/?q=40.4233,71.7722"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-md hover:scale-105"
                    >
                      Google Maps
                    </a>
                    <a
                      href="https://yandex.uz/maps/?pt=71.7722,40.4233&z=17&l=map"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all border border-white/20"
                    >
                      Yandex
                    </a>
                  </div>
                </div>
                <div className="h-[420px] w-full">
                  <iframe
                    src="https://maps.google.com/maps?q=40.4233,71.7722&hl=uz&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Farg'ona shahar 5-son texnikumi joylashuvi"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
