import { create } from 'zustand'
import { Language } from '../types'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  isMobile: boolean
  setIsMobile: (mobile: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'uz',
  setLanguage: (lang) => {
    set({ language: lang })
    localStorage.setItem('language', lang)
  },
  theme: 'light',
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
  },
  isMobile: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  isMenuOpen: false,
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
}))
