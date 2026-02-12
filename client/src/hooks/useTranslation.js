import { useLanguage } from '../contexts/LanguageContext'
import en from '../locales/en.json'
import vi from '../locales/vi.json'

const translations = { en, vi }

export function useTranslation() {
    const { language } = useLanguage()

    const t = (key, params) => {
        const keys = key.split('.')
        let value = translations[language]
        for (const k of keys) {
            value = value?.[k]
        }
        if (value == null) return key // fallback to key
        if (params) {
            return Object.entries(params).reduce(
                (str, [k, v]) => str.replace(`{{${k}}}`, v), value
            )
        }
        return value
    }

    // Date locale helper
    const dateLocale = language === 'vi' ? 'vi-VN' : 'en-US'

    return { t, language, dateLocale }
}
