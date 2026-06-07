'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-store'
import { CheckCircle, CreditCard, Banknote, Smartphone } from 'lucide-react'

interface Props {
  locale: string
}

const CITIES = [
  'Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Ақтөбе',
  'Тараз', 'Павлодар', 'Өскемен', 'Семей', 'Атырау',
  'Қостанай', 'Петропавл', 'Орал', 'Ақтау', 'Көкшетау',
  'Талдықорған', 'Түркістан', 'Қызылорда',
]

export default function CheckoutForm({ locale }: Props) {
  const isKz = locale === 'kz'
  const { items, total, clear } = useCart()
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [payment, setPayment] = useState<'kaspi' | 'card' | 'cash'>('kaspi')
  const [form, setForm] = useState({
    name: '', phone: '', city: '', address: '', comment: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function fmt(price: number) {
    return price.toLocaleString('ru-RU') + ' ₸'
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = isKz ? 'Атыңызды енгізіңіз' : 'Введите имя'
    if (!form.phone.trim()) e.phone = isKz ? 'Телефон нөмірін енгізіңіз' : 'Введите телефон'
    if (!form.city) e.city = isKz ? 'Қаланы таңдаңыз' : 'Выберите город'
    if (!form.address.trim()) e.address = isKz ? 'Мекенжайды енгізіңіз' : 'Введите адрес'
    return e
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    // Здесь будет отправка заказа через API
    clear()
    setDone(true)
  }

  if (items.length === 0 && !done) {
    router.push(`/${locale}/cart`)
    return null
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 flex flex-col items-center text-center">
        <CheckCircle size={72} className="text-green-500 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {isKz ? 'Тапсырыс қабылданды!' : 'Заказ принят!'}
        </h1>
        <p className="text-gray-500 mb-8">
          {isKz
            ? 'Менеджер жақын арада байланысады'
            : 'Менеджер свяжется с вами в ближайшее время'}
        </p>
        <a
          href={`/${locale}`}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {isKz ? 'Басты бетке' : 'На главную'}
        </a>
      </div>
    )
  }

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {isKz ? 'Тапсырысты рәсімдеу' : 'Оформление заказа'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Left: форма */}
        <div className="flex-1 space-y-6">
          {/* Контактные данные */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">
              {isKz ? 'Байланыс деректері' : 'Контактные данные'}
            </h2>
            {field(isKz ? 'Аты-жөні' : 'Имя и фамилия', 'name', 'text', isKz ? 'Аты-жөніңізді енгізіңіз' : 'Введите имя и фамилию')}
            {field(isKz ? 'Телефон' : 'Телефон', 'phone', 'tel', '+7 (___) ___-__-__')}
          </div>

          {/* Доставка */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">
              {isKz ? 'Жеткізу мекенжайы' : 'Адрес доставки'}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isKz ? 'Қала' : 'Город'}
              </label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 bg-white ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">{isKz ? 'Қаланы таңдаңыз' : 'Выберите город'}</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            {field(isKz ? 'Мекенжай' : 'Адрес', 'address', 'text', isKz ? 'Көше, үй, пәтер' : 'Улица, дом, квартира')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isKz ? 'Комментарий' : 'Комментарий к заказу'}
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={3}
                placeholder={isKz ? 'Қосымша ақпарат...' : 'Дополнительная информация...'}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
          </div>

          {/* Оплата */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              {isKz ? 'Төлем тәсілі' : 'Способ оплаты'}
            </h2>
            <div className="space-y-3">
              {([
                { id: 'kaspi', icon: <Smartphone size={20} />, label: 'Kaspi Pay', desc: isKz ? '0-0-24 бөліп төлеу' : 'Рассрочка 0-0-24' },
                { id: 'card',  icon: <CreditCard size={20} />, label: isKz ? 'Банк картасы' : 'Банковская карта', desc: 'Visa / Mastercard' },
                { id: 'cash',  icon: <Banknote size={20} />,   label: isKz ? 'Қолма-қол' : 'Наличные', desc: isKz ? 'Тауар алған кезде' : 'При получении' },
              ] as const).map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${payment === opt.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={payment === opt.id}
                    onChange={() => setPayment(opt.id)}
                    className="accent-amber-500"
                  />
                  <span className="text-amber-500">{opt.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                    <div className="text-xs text-gray-400">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: сводка */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4">
              {isKz ? 'Тапсырыс' : 'Ваш заказ'}
            </h2>
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              {items.map(({ product, quantity }) => (
                <div key={product.sku} className="flex justify-between gap-2">
                  <span className="line-clamp-1 flex-1">{product.name}</span>
                  <span className="flex-shrink-0 font-medium">{quantity} × {fmt(product.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>{isKz ? 'Барлығы' : 'Итого'}</span>
                <span>{fmt(total())}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              {isKz ? 'Тапсырыс беру' : 'Подтвердить заказ'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
