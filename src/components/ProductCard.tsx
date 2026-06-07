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
}

export default function ProductCard({ product }: Props) {
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

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/${locale}/product/${product.id}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">{t('out_of_stock')}</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/${locale}/product/${product.id}`}>
          <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {product.inStock ? t('in_stock') : t('out_of_stock')}
            </div>
          </div>
          <button
            onClick={handleAdd}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 text-white ${added ? 'bg-green-500' : 'bg-amber-500 hover:bg-amber-600'}`}
            title={t('add_to_cart')}
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>

        {/* Kaspi badge */}
        <div className="mt-2 text-xs text-gray-400">
          {locale === 'kz' ? '0-0-24 бөліп төлеу' : 'Рассрочка 0-0-24'}
        </div>
      </div>
    </div>
  )
}
