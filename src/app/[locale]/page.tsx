import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { getProducts } from '@/lib/kaspi-api'
import { CATEGORIES } from '@/lib/categories'
import ProductCard from '@/components/ProductCard'
import { Truck, CreditCard, Shield, Wrench } from 'lucide-react'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { products } = await getProducts({ size: 6 })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {locale === 'kz' ? 'Үйіңіз үшін жиhаз' : 'Мебель для вашего дома'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            {locale === 'kz'
              ? 'Бүкіл Қазақстан бойынша жеткізумен сапалы жиhаздың кең таңдауы'
              : 'Широкий выбор качественной мебели с доставкой по всему Казахстану'}
          </p>
          <Link
            href={`/${locale}/catalog`}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors"
          >
            {locale === 'kz' ? 'Каталогты қарау' : 'Смотреть каталог'}
          </Link>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-amber-50 py-10 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <CreditCard className="text-amber-500" size={28} />,
              title: locale === 'kz' ? '0-0-24 бөліп төлеу' : 'Рассрочка 0-0-24',
              desc: locale === 'kz' ? 'Kaspi арқылы комиссиясыз' : 'Через Kaspi без комиссии',
            },
            {
              icon: <Truck className="text-amber-500" size={28} />,
              title: locale === 'kz' ? 'Қазақстан бойынша жеткізу' : 'Доставка по Казахстану',
              desc: locale === 'kz' ? 'Күн сайын 9:00 – 23:00' : 'Ежедневно 9:00 – 23:00',
            },
            {
              icon: <Shield className="text-amber-500" size={28} />,
              title: locale === 'kz' ? 'Сапа кепілдігі' : 'Гарантия качества',
              desc: locale === 'kz' ? 'Тексерілген өндірушілер' : 'Проверенные производители',
            },
            {
              icon: <Wrench className="text-amber-500" size={28} />,
              title: locale === 'kz' ? 'Тегін жинау' : 'Бесплатная сборка',
              desc: locale === 'kz' ? 'Жеткізу кезінде' : 'При доставке',
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              {item.icon}
              <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'kz' ? 'Санаттар' : 'Категории'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/catalog/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all text-center group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-700 group-hover:text-amber-700 leading-tight">
                {locale === 'kz' ? cat.nameKz : cat.nameRu}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'kz' ? 'Танымал тауарлар' : 'Популярные товары'}
          </h2>
          <Link
            href={`/${locale}/catalog`}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            {locale === 'kz' ? 'Барлығын көру →' : 'Смотреть все →'}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
