// infrastructure/ui/utils/i18n.ts

import i18n from 'i18next'
import { useTranslation, initReactI18next } from 'react-i18next'
import enJSON from '../locales/en.json'
import esJSON from '../locales/es.json'
import { getItemStorage } from '../hooks/useLocalStorage'

export const languages = [
  {
    key: 'en',
    name: 'English',
  },
  {
    key: 'es',
    name: 'Español',
  },
]
export const key = 'language'
export const fallbackLanguage = languages[0]

export default function config() {
  const language = getItemStorage(key, fallbackLanguage)

  i18n.use(initReactI18next)
  i18n.init({
    resources: {
      en: { ...enJSON },
      es: { ...esJSON },
    },
    lng: language.key,
    debug: false,
  })
}

export { useTranslation, i18n, initReactI18next }
