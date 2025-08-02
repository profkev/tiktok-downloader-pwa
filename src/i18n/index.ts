import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
]

function getInitialLocale(): string {
  // Check localStorage first
  const saved = localStorage.getItem('tiktok-downloader-locale')
  if (saved && SUPPORTED_LOCALES.some(locale => locale.code === saved)) {
    return saved
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0]
  if (SUPPORTED_LOCALES.some(locale => locale.code === browserLang)) {
    return browserLang
  }

  // Default to English
  return 'en'
}

const messages = {
  en,
  es,
  fr,
  // For languages not yet translated, fall back to English
  de: en,
  pt: en,
  it: en,
  ja: en,
  ko: en,
  zh: en,
  ar: en
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

export function setLocale(locale: string) {
  if (SUPPORTED_LOCALES.some(l => l.code === locale)) {
    i18n.global.locale.value = locale as any
    localStorage.setItem('tiktok-downloader-locale', locale)
    document.documentElement.lang = locale
  }
}