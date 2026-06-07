'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-store'
import { useRouter } from 'next/navigation'

interface Props {
  locale: string
}

export default function CartView({ locale }: Props) {
  const { items, remove, setQty, total } = useCart()
  const router = useRouter()
  const isKz = locale === 'kz'

  function fmt(price: number) {
    return price.toLocaleString('ru-RU') + ' ₸'
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isKz ? 'Себет бос' : 'Корзина пуста'}
        </h1>
        <p className="text-gray-400 mb-8">
          {isKz ? 'Каталогқа өтіп, тауарлар таңдаңыз' : 'Перейдите в каталог и выберите товары'}
        </p>
        <Link
          href={`/${locale}/catalog`}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {isKz ? 'Каталогқа өту' : 'В каталог'}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {isKz ? 'Себет' : 'Корзина'}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.sku}
              className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 items-center"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={28} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/${locale}/product/${product.id}`}>
                  <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-amber-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-base font-bold text-gray-900 mt-1">
                  {fmt(product.price * quantity)}
                </p>
              </div>

              {/* Qty + remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <button
                  onClick={() => remove(product.sku)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQty(product.sku, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-lg text-gray-500"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQty(product.sku, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-lg text-gray-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-800 text-lg mb-4">
              {isKz ? 'Жиынтық' : 'Итого'}
            </h2>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              {items.map(({ product, quantity }) => (
                <div key={product.sku} className="flex justify-between gap-2">
                  <span className="line-clamp-1 flex-1">{product.name}</span>
                  <span className="flex-shrink-0">{quantity} × {fmt(product.price)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>{isKz ? 'Барлығы' : 'Итого'}</span>
                <span>{fmt(total())}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {isKz ? 'Жеткізусіз' : 'Без учёта доставки'}
              </p>
            </div>

            <button
              onClick={() => router.push(`/${locale}/checkout`)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              {isKz ? 'Тапсырыс беру' : 'Оформить заказ'}
            </button>

            <Link
              href={`/${locale}/catalog`}
              className="block text-center mt-3 text-sm text-gray-400 hover:text-amber-600 transition-colors"
            >
              {isKz ? '← Каталогқа оралу' : '← Продолжить покупки'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
