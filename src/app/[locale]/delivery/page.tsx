import { Truck, CreditCard, Banknote, Smartphone } from 'lucide-react'

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isKz = locale === 'kz'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isKz ? 'Жеткізу және төлем' : 'Доставка и оплата'}
      </h1>

      {/* Delivery */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="text-amber-500" size={28} />
          <h2 className="text-xl font-bold text-gray-800">
            {isKz ? 'Жеткізу' : 'Доставка'}
          </h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-gray-600">
          <p>{isKz ? 'Бүкіл Қазақстан бойынша жеткіземіз.' : 'Доставляем по всему Казахстану.'}</p>
          <p>{isKz ? 'Жұмыс уақыты: күн сайын 9:00 – 23:00.' : 'Режим работы: ежедневно с 9:00 до 23:00.'}</p>
          <p>{isKz ? 'Жеткізу мерзімі мен құны қалаға байланысты.' : 'Сроки и стоимость доставки зависят от города.'}</p>
          <p>{isKz ? 'Тапсырыс бергеннен кейін менеджер байланысады.' : 'После оформления заказа менеджер свяжется с вами.'}</p>
        </div>
      </section>

      {/* Payment */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isKz ? 'Төлем тәсілдері' : 'Способы оплаты'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Smartphone className="text-amber-500" size={28} />,
              title: 'Kaspi Pay',
              desc: isKz ? '0-0-6, 0-0-12, 0-0-24 бөліп төлеу\nКомиссиясыз' : 'Рассрочка 0-0-6, 0-0-12, 0-0-24\nБез комиссии',
            },
            {
              icon: <CreditCard className="text-amber-500" size={28} />,
              title: isKz ? 'Банк картасы' : 'Банковская карта',
              desc: 'Visa, Mastercard',
            },
            {
              icon: <Banknote className="text-amber-500" size={28} />,
              title: isKz ? 'Қолма-қол' : 'Наличные',
              desc: isKz ? 'Тауар алған кезде' : 'При получении товара',
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3">
              {item.icon}
              <div className="font-semibold text-gray-800">{item.title}</div>
              <div className="text-sm text-gray-500 whitespace-pre-line">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
