import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <span className="text-2xl font-bold text-amber-500">Mebio</span>
          <p className="mt-1 text-xs text-amber-400">mebio.kz</p>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            {locale === 'kz'
              ? 'Бүкіл Қазақстан бойынша жеткізумен сапалы жиhаз'
              : 'Качественная мебель с доставкой по всему Казахстану'}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            {locale === 'kz' ? 'Навигация' : 'Навигация'}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/catalog`} className="hover:text-amber-400 transition-colors">{t('catalog')}</Link></li>
            <li><Link href={`/${locale}/delivery`} className="hover:text-amber-400 transition-colors">{t('delivery')}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-amber-400 transition-colors">{t('about')}</Link></li>
            <li><Link href={`/${locale}/contacts`} className="hover:text-amber-400 transition-colors">{t('contacts')}</Link></li>
          </ul>
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            {locale === 'kz' ? 'Төлем' : 'Оплата'}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Kaspi Pay</li>
            <li>{locale === 'kz' ? '0-0-24 бөліп төлеу' : 'Рассрочка 0-0-24'}</li>
            <li>Visa / Mastercard</li>
            <li>{locale === 'kz' ? 'Қолма-қол' : 'Наличные'}</li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            {t('contacts')}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-amber-500 flex-shrink-0" />
              <span>+7 (707) 479-47-53</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="text-amber-500 flex-shrink-0" />
              <span>{t('work_hours')}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              <span>{locale === 'kz' ? 'Қазақстан бойынша' : 'По всему Казахстану'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Mebio (mebio.kz). {t('rights')}
      </div>
    </footer>
  )
}
