import { getProducts } from '@/lib/kaspi-api'
import { CATEGORIES } from '@/lib/categories'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const { products } = await getProducts({ category: cat.nameRu, size: 48 })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              {locale === 'kz' ? 'Санаттар' : 'Категории'}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}/catalog`}
                  className="block text-sm py-1.5 px-2 rounded hover:bg-amber-50 text-gray-600 transition-colors"
                >
                  {locale === 'kz' ? 'Барлық тауарлар' : 'Все товары'}
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/${locale}/catalog/${c.slug}`}
                    className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                      c.slug === category
                        ? 'bg-amber-100 text-amber-700 font-medium'
                        : 'hover:bg-amber-50 hover:text-amber-700 text-gray-600'
                    }`}
                  >
                    {c.icon} {locale === 'kz' ? c.nameKz : c.nameRu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {locale === 'kz' ? cat.nameKz : cat.nameRu}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {locale === 'kz' ? `${products.length} тауар` : `${products.length} товаров`}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">{locale === 'kz' ? 'Тауар табылмады' : 'Товары не найдены'}</p>
              <Link href={`/${locale}/catalog`} className="mt-4 inline-block text-amber-600 hover:underline">
                {locale === 'kz' ? '← Барлық тауарлар' : '← Все товары'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
