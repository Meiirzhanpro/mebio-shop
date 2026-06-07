import { getProduct } from '@/lib/kaspi-api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Truck, CreditCard, Shield } from 'lucide-react'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  function formatPrice(price: number) {
    return price.toLocaleString('ru-RU') + ' ₸'
  }

  const monthlyKaspi = Math.round(product.price / 24)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-amber-600">
          {locale === 'kz' ? 'Басты бет' : 'Главная'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/catalog`} className="hover:text-amber-600">
          {locale === 'kz' ? 'Каталог' : 'Каталог'}
        </Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {locale === 'kz'
                ? `немесе 0-0-24 бойынша айына ${formatPrice(monthlyKaspi)}`
                : `или ${formatPrice(monthlyKaspi)}/мес в рассрочку 0-0-24`}
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock
                ? locale === 'kz' ? 'Қоймада бар' : 'В наличии'
                : locale === 'kz' ? 'Қоймада жоқ' : 'Нет в наличии'}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              {locale === 'kz' ? 'Себетке' : 'В корзину'}
            </button>
            <button className="flex-1 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3.5 rounded-xl transition-colors">
              {locale === 'kz' ? 'Бөліп төлеу' : 'В рассрочку'}
            </button>
          </div>

          {/* Benefits */}
          <div className="space-y-3 border-t pt-6">
            {[
              {
                icon: <Truck size={18} className="text-amber-500" />,
                text: locale === 'kz' ? 'Қазақстан бойынша жеткізу' : 'Доставка по всему Казахстану',
              },
              {
                icon: <CreditCard size={18} className="text-amber-500" />,
                text: locale === 'kz' ? 'Kaspi арқылы 0-0-24 бөліп төлеу' : 'Рассрочка Kaspi 0-0-6, 0-0-12, 0-0-24',
              },
              {
                icon: <Shield size={18} className="text-amber-500" />,
                text: locale === 'kz' ? 'Сапа кепілдігі' : 'Гарантия качества',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="mt-6 text-xs text-gray-400 space-y-1">
            <div>{locale === 'kz' ? 'Артикул' : 'Артикул'}: {product.sku}</div>
            <div>{locale === 'kz' ? 'Санат' : 'Категория'}: {product.category}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {locale === 'kz' ? 'Сипаттама' : 'Описание'}
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      )}
    </div>
  )
}
