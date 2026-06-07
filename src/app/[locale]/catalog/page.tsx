import { getProducts } from '@/lib/kaspi-api'
import { CATEGORIES } from '@/lib/categories'
import { CATEGORY_META, CATEGORY_ICONS } from '@/lib/category-meta'
import ProductCard from '@/components/ProductCard'
import SortSelect from '@/components/SortSelect'
import CatalogFilters from '@/components/CatalogFilters'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; sort?: string; minPrice?: string; maxPrice?: string; inStock?: string }>
}) {
  const { locale } = await params
  const { q, sort, minPrice, maxPrice, inStock } = await searchParams
  const { products } = await getProducts({ size: 48 })
  const isKz = locale === 'kz'

  const filtered = products.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.brand.toLowerCase().includes(q.toLowerCase())) return false
    if (minPrice && p.price < Number(minPrice)) return false
    if (maxPrice && p.price > Number(maxPrice)) return false
    if (inStock === '1' && !p.inStock) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return 0
  })

  return (
    <div>
      {/* Шапка каталога */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold mb-1">
            {isKz ? 'Каталог' : 'Каталог мебели'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isKz ? '2000+ тауар қоймада бар' : '2000+ товаров в наличии с доставкой по Казахстану'}
          </p>
        </div>
      </div>

      {/* Категории */}
      {!q && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {isKz ? 'Санаттар бойынша' : 'По категориям'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat.slug] || {
                gradient: 'from-gray-500 to-gray-400',
                iconBg: 'bg-gray-100',
                textColor: 'text-gray-600',
                countRu: '',
                countKz: '',
              }
              const icon = CATEGORY_ICONS[cat.slug]
              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/catalog/${cat.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${meta.gradient}`} />
                  <div className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 ${meta.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${meta.textColor}`}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm leading-tight truncate">
                        {isKz ? cat.nameKz : cat.nameRu}
                      </div>
                      <div className={`text-xs font-medium ${meta.textColor}`}>
                        {isKz ? meta.countKz : meta.countRu}
                      </div>
                    </div>
                    <ArrowRight size={14} className="ml-auto flex-shrink-0 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Товары */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {q
                ? `${isKz ? 'Іздеу' : 'Поиск'}: ${q}`
                : isKz ? 'Барлық тауарлар' : 'Все товары'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isKz ? `${sorted.length} тауар табылды` : `Найдено ${sorted.length} товаров`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CatalogFilters locale={locale} minPrice={minPrice} maxPrice={maxPrice} inStock={inStock} />
            <SortSelect locale={locale} defaultValue={sort || ''} />
          </div>
        </div>

        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">{isKz ? 'Тауар табылмады' : 'Товары не найдены'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
