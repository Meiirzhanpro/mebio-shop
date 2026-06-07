import Link from 'next/link'
import { getProducts } from '@/lib/kaspi-api'
import { CATEGORIES } from '@/lib/categories'
import ProductCard from '@/components/ProductCard'
import { Truck, CreditCard, Shield, Wrench, Star, Phone } from 'lucide-react'

const CATEGORY_COLORS: Record<string, string> = {
  divany: 'from-orange-100 to-orange-50',
  krovati: 'from-blue-100 to-blue-50',
  shkafy: 'from-emerald-100 to-emerald-50',
  gostinye: 'from-purple-100 to-purple-50',
  prikhozhe: 'from-yellow-100 to-yellow-50',
  kuhni: 'from-red-100 to-red-50',
  detskie: 'from-pink-100 to-pink-50',
  ofis: 'from-gray-100 to-gray-50',
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { products } = await getProducts({ size: 8 })
  const isKz = locale === 'kz'

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[560px] flex items-center"
        style={{
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
        }}
      >
        {/* Декоративные круги */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              {isKz ? (
                <>
                  Кеңістікті <span className="text-amber-400">өзгертетін</span>
                  <br />
                  жиhаз
                </>
              ) : (
                <>
                  Мебель, которая{' '}
                  <span className="text-amber-400">меняет</span>
                  <br />
                  пространство
                </>
              )}
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {isKz
                ? 'Kaspi арқылы 0-0-24 бөліп төлеу. Бүкіл Қазақстан бойынша тегін жеткізу.'
                : 'Рассрочка 0-0-24 через Kaspi. Бесплатная доставка по всему Казахстану.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/catalog`}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                {isKz ? 'Каталогты қарау' : 'Смотреть каталог'}
              </Link>
              <a
                href="tel:+77074794753"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base transition-all duration-200 border border-white/20"
              >
                <Phone size={18} />
                {isKz ? 'Қоңырау шалу' : 'Позвонить'}
              </a>
            </div>

            {/* Быстрые цифры */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                { num: '500+', label: isKz ? 'Тауар' : 'Товаров' },
                { num: '10 000+', label: isKz ? 'Клиент' : 'Клиентов' },
                { num: isKz ? '5 жыл' : '5 лет', label: isKz ? 'нарықта' : 'на рынке' },
              ].map((stat) => (
                <div key={stat.num}>
                  <div className="text-2xl font-bold text-amber-400">{stat.num}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kaspi рассрочка баннер */}
      <section className="bg-gradient-to-r from-[#ef3124] to-[#c0392b] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black tracking-tight">
              0 – 0 – 24
            </div>
            <div>
              <div className="font-bold text-lg">
                {isKz ? 'Kaspi бөліп төлеу' : 'Рассрочка Kaspi'}
              </div>
              <div className="text-red-200 text-sm">
                {isKz
                  ? 'Комиссиясыз, бастапқы жарнасыз'
                  : 'Без переплат и первоначального взноса'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-xl">
                {isKz ? 'Тез бекіту' : 'Быстрое одобрение'}
              </div>
              <div className="text-red-200">
                {isKz ? '2 минутта' : 'За 2 минуты'}
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">
                {isKz ? 'Онлайн' : 'Онлайн'}
              </div>
              <div className="text-red-200">
                {isKz ? 'Тіркеусіз' : 'Без визита в банк'}
              </div>
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="bg-white text-red-600 font-bold px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm whitespace-nowrap"
            >
              {isKz ? 'Бөліп алу' : 'Купить в рассрочку'}
            </Link>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Truck className="text-amber-500" size={30} />,
              title: isKz ? 'Қазақстан бойынша жеткізу' : 'Доставка по Казахстану',
              desc: isKz ? 'Күн сайын 9:00 – 23:00' : 'Ежедневно 9:00 – 23:00',
            },
            {
              icon: <Wrench className="text-amber-500" size={30} />,
              title: isKz ? 'Тегін жинау' : 'Бесплатная сборка',
              desc: isKz ? 'Шеберлер жеткізумен' : 'Мастера при доставке',
            },
            {
              icon: <Shield className="text-amber-500" size={30} />,
              title: isKz ? 'Сапа кепілдігі' : 'Гарантия качества',
              desc: isKz ? 'Тексерілген өндірушілер' : 'Проверенные производители',
            },
            {
              icon: <CreditCard className="text-amber-500" size={30} />,
              title: isKz ? '0-0-24 бөліп төлеу' : 'Рассрочка 0-0-24',
              desc: isKz ? 'Kaspi арқылы комиссиясыз' : 'Через Kaspi без комиссии',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Категории */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-bold text-gray-900">
            {isKz ? 'Санаттар' : 'Категории'}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => {
            const gradient = CATEGORY_COLORS[cat.slug] || 'from-gray-100 to-gray-50'
            return (
              <Link
                key={cat.id}
                href={`/${locale}/catalog/${cat.slug}`}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-b ${gradient} hover:shadow-md border border-transparent hover:border-amber-200 transition-all duration-200 text-center group hover:-translate-y-0.5`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-amber-700 leading-tight">
                  {isKz ? cat.nameKz : cat.nameRu}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Популярные товары */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isKz ? 'Танымал тауарлар' : 'Популярные товары'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isKz ? 'Ең көп сатып алынатын тауарлар' : 'Самые покупаемые позиции'}
              </p>
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              {isKz ? 'Барлығын көру' : 'Смотреть все'} →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} badge={i === 0 ? 'hit' : i === 1 ? 'new' : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Блок доверия */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {isKz ? 'Клиенттер пікірлері' : 'Отзывы покупателей'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              name: 'Айгерим С.',
              text: isKz
                ? 'Диванды тез жеткізді, жинауды да өздері жасады. Сапасы өте жақсы!'
                : 'Диван доставили быстро, собрали сами. Качество отличное, рекомендую!',
              rating: 5,
              product: isKz ? 'TURAN HOME диван' : 'Диван TURAN HOME',
            },
            {
              name: 'Дмитрий К.',
              text: isKz
                ? 'Kaspi арқылы бөліп төлеп алдым, өте ыңғайлы. Жиhаз сапалы.'
                : 'Купил в рассрочку через Kaspi, очень удобно. Мебель качественная.',
              rating: 5,
              product: isKz ? 'Жатын бөлме жиынтығы' : 'Спальный гарнитур',
            },
            {
              name: 'Мадина Т.',
              text: isKz
                ? 'Кеңес берді, дұрыс таңдауға көмектесті. Жеткізу уақытында болды.'
                : 'Помогли с выбором, проконсультировали. Доставка вовремя, всё отлично.',
              rating: 5,
              product: isKz ? 'Ас үй жиhазы' : 'Кухонный гарнитур',
            },
          ].map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                <div className="text-xs text-gray-400">{review.product}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA баннер */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">
            {isKz ? 'Сұрақтарыңыз бар ма?' : 'Остались вопросы?'}
          </h2>
          <p className="text-gray-400 mb-8">
            {isKz
              ? 'Біздің менеджерлер сізге қуанышпен көмектеседі'
              : 'Наши менеджеры с радостью помогут вам с выбором'}
          </p>
          <a
            href="tel:+77074794753"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            <Phone size={22} />
            +7 (707) 479-47-53
          </a>
          <p className="text-gray-500 text-sm mt-4">
            {isKz ? 'Күн сайын 9:00 – 23:00' : 'Ежедневно с 9:00 до 23:00'}
          </p>
        </div>
      </section>
    </div>
  )
}
