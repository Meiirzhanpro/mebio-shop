import { getProducts } from '@/lib/kaspi-api'
import { CATEGORIES } from '@/lib/categories'
import ProductCard from '@/components/ProductCard'
import SortSelect from '@/components/SortSelect'
import Link from 'next/link'

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; sort?: string }>
}) {
  const { locale } = await params
  const { q, sort } = await searchParams
  const { products } = await getProducts({ size: 48 })

  const filtered = q
    ? products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
      )
    : products

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return 0
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              {locale === 'kz' ? 'Санаттар' : 'Категории'}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}/catalog`}
                  className="block text-sm py-1.5 px-2 rounded hover:bg-amber-50 hover:text-amber-700 text-amber-600 font-medium"
                >
                  {locale === 'kz' ? 'Барлық тауарлар' : 'Все товары'}
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${locale}/catalog/${cat.slug}`}
                    className="block text-sm py-1.5 px-2 rounded hover:bg-amber-50 hover:text-amber-700 text-gray-600 transition-colors"
                  >
                    {cat.icon} {locale === 'kz' ? cat.nameKz : cat.nameRu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {q
                  ? `${locale === 'kz' ? 'Іздеу' : 'Поиск'}: ${q}`
                  : locale === 'kz' ? 'Барлық тауарлар' : 'Все товары'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {locale === 'kz' ? `${sorted.length} тауар табылды` : `Найдено ${sorted.length} товаров`}
              </p>
            </div>
            <SortSelect locale={locale} defaultValue={sort || ''} />
          </div>

          {/* Grid */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">{locale === 'kz' ? 'Тауар табылмады' : 'Товары не найдены'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
