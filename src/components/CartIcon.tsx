'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { useLocale } from 'next-intl'

export default function CartIcon() {
  const locale = useLocale()
  const count = useCart((s) => s.count())

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
    >
      <ShoppingCart size={18} />
      <span className="hidden sm:inline">
        {locale === 'kz' ? 'Себет' : 'Корзина'}
      </span>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
