'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/categories'
import CartIcon from '@/components/CartIcon'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const otherLocale = locale === 'ru' ? 'kz' : 'ru'
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  function handleSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/catalog?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+7 (707) 479-47-53</span>
            <span className="text-gray-400 ml-4">Ежедневно 9:00 – 23:00</span>
          </div>
          <Link
            href={switchLocalePath}
            className="hover:text-amber-400 transition-colors font-medium"
          >
            {otherLocale === 'kz' ? 'Қазақша' : 'Русский'}
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 flex flex-col leading-none">
          <span className="text-2xl font-bold text-amber-600 tracking-tight">M<em>e</em>bio</span>
          <span className="text-xs text-gray-400">mebio.kz</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search')}
              className="w-full border border-gray-200 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-amber-500 bg-gray-50"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Cart */}
        <CartIcon />

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Category nav */}
      <nav className="border-t border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto">
            <li>
              <Link
                href={`/${locale}/catalog`}
                className="block py-3 px-3 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors whitespace-nowrap"
              >
                {t('catalog')}
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/${locale}/catalog/${cat.slug}`}
                  className="block py-3 px-3 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors whitespace-nowrap"
                >
                  {locale === 'kz' ? cat.nameKz : cat.nameRu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <ul className="py-2">
            <li>
              <Link
                href={`/${locale}/catalog`}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-amber-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('catalog')}
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/${locale}/catalog/${cat.slug}`}
                  className="block px-4 py-3 text-sm text-gray-600 hover:bg-amber-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.icon} {locale === 'kz' ? cat.nameKz : cat.nameRu}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/delivery`}
                className="block px-4 py-3 text-sm text-gray-600 hover:bg-amber-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('delivery')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
