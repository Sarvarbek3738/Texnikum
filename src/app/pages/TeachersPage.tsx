import { 
  Mail, 
  Phone, 
  Award, 
  User, 
  Search, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Eye, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { teacherService } from '../services/teacherService';
import { departmentService } from '../services/departmentService';
import { Teacher, Department } from '../types';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function TeachersPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'uz';

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected teacher for detailed modal
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersData, deptsData] = await Promise.all([
          teacherService.getAllTeachers(1, 200),
          departmentService.getAllDepartments().catch(() => []),
        ]);

        const list: Teacher[] = Array.isArray(teachersData) 
          ? teachersData 
          : (teachersData?.results || []);

        const activeTeachers = list
          .filter(teacher => teacher.is_active)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

        setTeachers(activeTeachers);
        setDepartments(Array.isArray(deptsData) ? deptsData.filter(d => d.is_active) : []);
      } catch (error) {
        console.error('Error fetching teachers or departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter teachers based on search query, department, and category
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const translation = teacherService.getTranslation(teacher, currentLang);
      
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        teacher.full_name?.toLowerCase().includes(query) ||
        translation.position?.toLowerCase().includes(query) ||
        translation.subject?.toLowerCase().includes(query) ||
        teacher.department_name?.toLowerCase().includes(query) ||
        translation.bio?.toLowerCase().includes(query);

      // Department filter match
      const matchesDept = selectedDeptId === 'all' || 
        String(teacher.department) === selectedDeptId;

      // Category filter match
      const matchesCategory = selectedCategory === 'all' || 
        teacher.category === selectedCategory;

      return matchesSearch && matchesDept && matchesCategory;
    });
  }, [teachers, searchQuery, selectedDeptId, selectedCategory, currentLang]);

  // Copy helper
  const handleCopy = (text: string, type: 'phone' | 'email') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(text);
    if (type === 'phone') {
      toast.success(t('teachers.copiedPhone', 'Telefon raqami nusxalandi!'));
    } else {
      toast.success(t('teachers.copiedEmail', 'Email manzili nusxalandi!'));
    }
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // Helper for Category badge styling
  const getCategoryBadge = (category?: string, categoryDisplay?: string) => {
    const cat = (category || '').toLowerCase();
    const display = categoryDisplay || (
      cat === 'highest' ? 'Oliy toifa' :
      cat === 'first' ? 'Birinchi toifa' :
      cat === 'second' ? 'Ikkinchi toifa' : 'Toifasiz'
    );

    if (cat === 'highest' || cat.includes('oliy')) {
      return {
        label: display,
        className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/60 font-bold',
        icon: Sparkles
      };
    }
    if (cat === 'first' || cat.includes('birinchi')) {
      return {
        label: display,
        className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-700/60 font-bold',
        icon: Award
      };
    }
    if (cat === 'second' || cat.includes('ikkinchi')) {
      return {
        label: display,
        className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 font-bold',
        icon: Award
      };
    }
    return {
      label: display || "Toifasiz",
      className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium',
      icon: Award
    };
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = teachers.length;
    const higherCategory = teachers.filter(t => t.category === 'highest' || t.category === 'first').length;
    const withBio = teachers.filter(t => {
      const trans = teacherService.getTranslation(t, currentLang);
      return Boolean(trans.bio);
    }).length;

    return { total, higherCategory, withBio };
  }, [teachers, currentLang]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDeptId('all');
    setSelectedCategory('all');
  };

  const isFiltered = searchQuery !== '' || selectedDeptId !== 'all' || selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.teachers')} 
        description={t('teachers.pageSubtitle')}
      />

      {/* Page Hero Header */}
      <div className="bg-gradient-to-r from-[#0a3674] via-[#0d4590] to-[#0a3674] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              {t('teachers.activeStatus', 'Texnikum pedagogik tarkibi')}
            </span>
            <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tight uppercase">
              {t('nav.teachers')}
            </h1>
            <p className="text-base md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl">
              {t('teachers.pageSubtitle')}
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mt-8 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{stats.total}</p>
                  <p className="text-xs text-white/80 font-medium">{t('teachers.totalTeachers', 'Jami pedagoglar')}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{stats.higherCategory}</p>
                  <p className="text-xs text-white/80 font-medium">Oliy va 1-toifali</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{departments.length || 3}</p>
                  <p className="text-xs text-white/80 font-medium">{t('teachers.department', 'Kafedralar')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Search & Filter Toolbar */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="md:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('teachers.searchPlaceholder', "Ustozning ismi, fani yoki lavozimi bo'yicha qidirish...")}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3674] dark:text-white transition-all placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Department Filter */}
              <div className="md:col-span-4">
                <div className="relative">
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    aria-label={t('teachers.allDepartments', 'Barcha kafedralar')}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-2xl text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a3674] appearance-none cursor-pointer"
                  >
                    <option value="all">{t('teachers.allDepartments', 'Barcha kafedralar')}</option>
                    {departments.map((dept) => {
                      const deptTranslation = departmentService.getTranslation(dept, currentLang);
                      const deptName = deptTranslation.name || (dept as any).name_uz || `Kafedra #${dept.id}`;
                      return (
                        <option key={dept.id} value={String(dept.id)}>
                          {deptName}
                        </option>
                      );
                    })}
                  </select>
                  <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label={t('teachers.allCategories', 'Barcha toifalar')}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-2xl text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a3674] appearance-none cursor-pointer"
                  >
                    <option value="all">{t('teachers.allCategories', 'Barcha toifalar')}</option>
                    <option value="highest">Oliy toifa</option>
                    <option value="first">Birinchi toifa</option>
                    <option value="second">Ikkinchi toifa</option>
                    <option value="none">Toifasiz</option>
                  </select>
                  <Award className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Filter Status & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {filteredTeachers.length} {t('teachers.years', 'nafar')}
                </span>
                <span>{t('teachers.filteredCount', "ustoz ko'rsatilmoqda")}</span>
              </div>

              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t('teachers.resetFilters', 'Filtrlarni tozalash')}
                </button>
              )}
            </div>
          </div>

          {/* Teachers Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center">
                  <Skeleton className="w-28 h-28 rounded-full mb-6" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <Skeleton className="h-28 w-full rounded-2xl" />
                </div>
              ))}
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#0a3674] dark:text-blue-300 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('teachers.notFound', "O'qituvchi topilmadi")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t('teachers.notFoundDesc', "Qidiruv parametrlarini o'zgartirib ko'ring yoki filtrlarni tozalang.")}
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a3674] text-white rounded-xl text-sm font-semibold hover:bg-[#0b7396] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t('teachers.resetFilters', 'Filtrlarni tozalash')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredTeachers.map((teacher, index) => {
                const translation = teacherService.getTranslation(teacher, currentLang);
                const categoryBadge = getCategoryBadge(teacher.category, teacher.category_display);
                const CategoryIcon = categoryBadge.icon;

                // Academic degree / rank items
                const certs = [teacher.academic_degree, teacher.academic_rank].filter(
                  (item): item is string =>
                    typeof item === 'string' &&
                    item.trim().length > 0 &&
                    item.trim().toLowerCase() !== "yo'q" &&
                    item.trim().toLowerCase() !== "none"
                );

                return (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                    className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col group relative"
                  >
                    {/* Top Status Bar: Category & Experience Badges */}
                    <div className="p-5 pb-0 flex items-center justify-between gap-2 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${categoryBadge.className}`}>
                        <CategoryIcon className="w-3.5 h-3.5" />
                        {categoryBadge.label}
                      </span>

                      {typeof teacher.experience_years === 'number' && teacher.experience_years > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                          <Briefcase className="w-3 h-3 text-emerald-500" />
                          <span>{teacher.experience_years} {t('teachers.years', 'yil')}</span>
                        </span>
                      )}
                    </div>

                    {/* Centered Circular Avatar */}
                    <div className="pt-6 pb-4 flex justify-center items-center">
                      <div className="relative">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-800 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center">
                          {teacher.photo ? (
                            <ImageWithFallback
                              src={teacher.photo}
                              alt={teacher.full_name}
                              className="w-full h-full object-cover object-top"
                              style={{ objectPosition: 'center top' }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-[#0a3674] dark:text-blue-300">
                              <User className="w-14 h-14 opacity-50" />
                            </div>
                          )}
                        </div>

                        {/* Online active dot */}
                        <div 
                          className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900 shadow" 
                          title="Faol o'qituvchi"
                        />
                      </div>
                    </div>

                    {/* Main Information */}
                    <div className="px-6 pb-6 flex flex-col flex-grow text-center">
                      {/* Name */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight mb-2 group-hover:text-[#0a3674] dark:group-hover:text-blue-400 transition-colors">
                        {teacher.full_name}
                      </h3>

                      {/* Position */}
                      {translation.position && (
                        <p className="text-sm font-semibold text-[#0a3674] dark:text-blue-400 mb-4 line-clamp-1">
                          {translation.position}
                        </p>
                      )}

                      {/* Chips: Department, Subject, Degree */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                        {teacher.department_name && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            <Building2 className="w-3 h-3 text-[#0a3674] dark:text-blue-400" />
                            <span className="truncate max-w-[150px]">{teacher.department_name}</span>
                          </span>
                        )}

                        {translation.subject && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-[#0a3674] dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                            <BookOpen className="w-3 h-3 text-blue-500" />
                            <span className="truncate max-w-[150px]">{translation.subject}</span>
                          </span>
                        )}

                        {certs.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40">
                            <GraduationCap className="w-3 h-3 text-purple-500" />
                            <span className="truncate max-w-[150px]">{certs[0]}</span>
                          </span>
                        )}
                      </div>

                      {/* Bio Snippet if exists */}
                      {translation.bio ? (
                        <div className="mb-4 px-3.5 py-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-left">
                          <p className="text-xs text-gray-600 dark:text-gray-300 italic line-clamp-2 leading-relaxed">
                            "{translation.bio}"
                          </p>
                        </div>
                      ) : null}

                      {/* Achievements badge if exists */}
                      {translation.achievements ? (
                        <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>{t('teachers.achievements', 'Yutuqlari mavjud')}</span>
                        </div>
                      ) : null}

                      {/* Contact row & Quick Actions */}
                      <div className="mt-auto space-y-2 text-left bg-gray-50 dark:bg-gray-800/50 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs">
                        {/* Phone */}
                        {teacher.phone ? (
                          <a
                            href={`tel:${teacher.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group/link truncate"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="font-semibold tracking-tight truncate">{teacher.phone}</span>
                          </a>
                        ) : null}

                        {/* Email */}
                        {teacher.email ? (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors group/link truncate"
                          >
                            <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span className="font-medium tracking-tight truncate">{teacher.email}</span>
                          </a>
                        ) : null}

                        {!teacher.phone && !teacher.email && (
                          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 italic">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{teacher.department_name || "5-son texnikum o'qituvchisi"}</span>
                          </div>
                        )}
                      </div>

                      {/* Batafsil Button */}
                      <button
                        onClick={() => setSelectedTeacher(teacher)}
                        className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0a3674] to-[#1252a5] hover:from-[#082958] hover:to-[#0a3674] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t('teachers.viewProfile', "Batafsil ma'lumot")}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Detailed Teacher Modal */}
      <AnimatePresence>
        {selectedTeacher && (() => {
          const translation = teacherService.getTranslation(selectedTeacher, currentLang);
          const categoryBadge = getCategoryBadge(selectedTeacher.category, selectedTeacher.category_display);
          const CategoryIcon = categoryBadge.icon;

          const certs = [selectedTeacher.academic_degree, selectedTeacher.academic_rank].filter(
            (item): item is string =>
              typeof item === 'string' &&
              item.trim().length > 0 &&
              item.trim().toLowerCase() !== "yo'q" &&
              item.trim().toLowerCase() !== "none"
          );

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header Banner */}
                <div className="bg-gradient-to-r from-[#0a3674] to-[#1252a5] p-6 md:p-8 text-white relative">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Large Photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white/30 bg-white/10 shrink-0 flex items-center justify-center shadow-lg">
                      {selectedTeacher.photo ? (
                        <ImageWithFallback
                          src={selectedTeacher.photo}
                          alt={selectedTeacher.full_name}
                          className="w-full h-full object-cover object-top"
                          style={{ objectPosition: 'center top' }}
                        />
                      ) : (
                        <User className="w-14 h-14 text-white/60" />
                      )}
                    </div>

                    {/* Name & Titles */}
                    <div className="text-center sm:text-left flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${categoryBadge.className}`}>
                          <CategoryIcon className="w-3.5 h-3.5" />
                          {categoryBadge.label}
                        </span>

                        {typeof selectedTeacher.experience_years === 'number' && selectedTeacher.experience_years > 0 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                            <Briefcase className="w-3 h-3 text-amber-300" />
                            <span>{selectedTeacher.experience_years} {t('teachers.years', 'yil tajriba')}</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1">
                        {selectedTeacher.full_name}
                      </h2>

                      {translation.position && (
                        <p className="text-white/90 text-sm font-semibold mb-2">
                          {translation.position}
                        </p>
                      )}

                      {selectedTeacher.department_name && (
                        <p className="text-xs text-white/75 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{selectedTeacher.department_name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-6">

                  {/* Quick Action Contact Row */}
                  {(selectedTeacher.phone || selectedTeacher.email) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTeacher.phone && (
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                          <a
                            href={`tel:${selectedTeacher.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300 hover:underline min-w-0"
                          >
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Telefon</p>
                              <p className="text-xs font-black truncate">{selectedTeacher.phone}</p>
                            </div>
                          </a>
                          <button
                            onClick={() => handleCopy(selectedTeacher.phone!, 'phone')}
                            className="p-2 rounded-xl text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 transition-colors"
                            title={t('teachers.copy', 'Nusxa olish')}
                          >
                            {copiedItem === selectedTeacher.phone ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}

                      {selectedTeacher.email && (
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                          <a
                            href={`mailto:${selectedTeacher.email}`}
                            className="flex items-center gap-3 text-blue-800 dark:text-blue-300 hover:underline min-w-0"
                          >
                            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Email</p>
                              <p className="text-xs font-black truncate">{selectedTeacher.email}</p>
                            </div>
                          </a>
                          <button
                            onClick={() => handleCopy(selectedTeacher.email!, 'email')}
                            className="p-2 rounded-xl text-blue-700 dark:text-blue-300 hover:bg-blue-200/50 dark:hover:bg-blue-900/50 transition-colors"
                            title={t('teachers.copy', 'Nusxa olish')}
                          >
                            {copiedItem === selectedTeacher.email ? (
                              <Check className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                        {t('teachers.department', 'Kafedra')}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {selectedTeacher.department_name || "Mavjud emas"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                        {t('teachers.subject', "O'qitadigan fani")}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {translation.subject || "Umumkasbiy fan"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                        {t('teachers.experience', 'Ish staji')}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {selectedTeacher.experience_years ? `${selectedTeacher.experience_years} yil` : "Yangi mutaxassis"}
                      </p>
                    </div>
                  </div>

                  {/* Biography Section */}
                  {translation.bio ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                        <User className="w-4 h-4 text-[#0a3674] dark:text-blue-400" />
                        <span>{t('teachers.aboutTeacher', "O'qituvchi haqida (Tarjimayi hol)")}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 leading-relaxed text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {translation.bio}
                      </div>
                    </div>
                  ) : null}

                  {/* Achievements Section */}
                  {translation.achievements ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>{t('teachers.teacherAchievements', "Yutuqlar va mukofotlar")}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-sm text-amber-900 dark:text-amber-200 whitespace-pre-line">
                        {translation.achievements}
                      </div>
                    </div>
                  ) : null}

                  {/* Qualifications & Degrees Section */}
                  {certs.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                        <span>{t('teachers.qualification', "Malaka va ilmiy unvonlar")}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {certs.map((c, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 text-xs font-semibold"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Close button in modal footer */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                      onClick={() => setSelectedTeacher(null)}
                      className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('teachers.close', 'Yopish')}
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
