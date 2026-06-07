'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { ShoppingCart, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart-store'
import { useState } from 'react'

interface Props {
  product: Product
  badge?: 'hit' | 'new' | 'sale'
}

export default function ProductCard({ product, badge }: Props) {
  const locale = useLocale()
  const t = useTranslations('product')
  const add = useCart((s) => s.add)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function formatPrice(price: number) {
    return price.toLocaleString('ru-RU') + ' ₸'
  }

  function monthlyPrice(price: number) {
    return Math.ceil(price / 24).toLocaleString('ru-RU') + ' ₸'
  }

  const badgeConfig = {
    hit: { label: locale === 'kz' ? 'Хит' : 'Хит', bg: 'bg-red-500' },
    new: { label: locale === 'kz' ? 'Жаңа' : 'Новинка', bg: 'bg-emerald-500' },
    sale: { label: locale === 'kz' ? 'Жеңілдік' : 'Скидка', bg: 'bg-amber-500' },
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      {/* Image */}
      <Link
        href={`/${locale}/product/${product.id}`}
        className="block relative aspect-square bg-gray-50 overflow-hidden"
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <svg
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Бейдж */}
        {badge && (
          <div
            className={`absolute top-2 left-2 ${badgeConfig[badge].bg} text-white text-xs font-bold px-2 py-0.5 rounded-lg`}
          >
            {badgeConfig[badge].label}
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-lg shadow-sm">
              {t('out_of_stock')}
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/${locale}/product/${product.id}`}>
          {product.brand && (
            <p className="text-xs text-gray-400 mb-0.5 font-medium">{product.brand}</p>
          )}
          <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-3 space-y-2">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <div
                className={`text-xs font-medium mt-0.5 ${product.inStock ? 'text-emerald-600' : 'text-red-400'}`}
              >
                {product.inStock ? t('in_stock') : t('out_of_stock')}
              </div>
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 text-white shadow-sm ${
                added
                  ? 'bg-emerald-500 scale-95'
                  : product.inStock
                    ? 'bg-amber-500 hover:bg-amber-600 hover:shadow-md hover:shadow-amber-200'
                    : 'bg-gray-300 cursor-not-allowed'
              }`}
              title={t('add_to_cart')}
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>

          {/* Kaspi рассрочка */}
          <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-2 py-1.5">
            <span className="text-red-500 font-bold text-xs">0–0–24</span>
            <span className="text-gray-500 text-xs">
              {locale === 'kz' ? 'бөліп' : 'рассрочка'} ~{monthlyPrice(product.price)}
              {locale === 'kz' ? '/ай' : '/мес'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
