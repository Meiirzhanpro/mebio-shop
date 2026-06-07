'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

interface Props {
  locale: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
}

export default function CatalogFilters({ locale, minPrice, maxPrice, inStock }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isKz = locale === 'kz'

  const [min, setMin] = useState(minPrice || '')
  const [max, setMax] = useState(maxPrice || '')
  const [stock, setStock] = useState(inStock === '1')
  const [open, setOpen] = useState(false)

  const activeCount = [minPrice, maxPrice, inStock === '1' ? '1' : ''].filter(Boolean).length

  function apply() {
    const params = new URLSearchParams(searchParams.toString())
    if (min) params.set('minPrice', min); else params.delete('minPrice')
    if (max) params.set('maxPrice', max); else params.delete('maxPrice')
    if (stock) params.set('inStock', '1'); else params.delete('inStock')
    router.push(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  function reset() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('minPrice')
    params.delete('maxPrice')
    params.delete('inStock')
    setMin('')
    setMax('')
    setStock(false)
    router.push(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  return (
    <div className="relative">
      {/* Кнопка открытия */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
          activeCount > 0
            ? 'bg-amber-500 text-white border-amber-500'
            : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400'
        }`}
      >
        <SlidersHorizontal size={15} />
        {isKz ? 'Сүзгі' : 'Фильтры'}
        {activeCount > 0 && (
          <span className="bg-white text-amber-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Дропдаун */}
      {open && (
        <>
          {/* Оверлей для закрытия */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          <div className="absolute left-0 top-11 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-72">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-900 text-sm">
                {isKz ? 'Сүзгілер' : 'Фильтры'}
              </span>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>

            {/* Цена */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {isKz ? 'Баға, ₸' : 'Цена, ₸'}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={isKz ? 'Ең аз' : 'От'}
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder={isKz ? 'Ең көп' : 'До'}
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Быстрые диапазоны */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { label: 'до 200 000', min: '', max: '200000' },
                { label: '200 – 500 тыс', min: '200000', max: '500000' },
                { label: 'от 500 000', min: '500000', max: '' },
              ].map((r) => (
                <button
                  key={r.label}
                  onClick={() => { setMin(r.min); setMax(r.max) }}
                  className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors"
                >
                  {r.label} ₸
                </button>
              ))}
            </div>

            {/* В наличии */}
            <label className="flex items-center gap-3 cursor-pointer mb-5">
              <div
                onClick={() => setStock(!stock)}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${stock ? 'bg-amber-500' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${stock ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-gray-700">
                {isKz ? 'Тек қоймадағылар' : 'Только в наличии'}
              </span>
            </label>

            {/* Кнопки */}
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors"
              >
                {isKz ? 'Тазалау' : 'Сбросить'}
              </button>
              <button
                onClick={apply}
                className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
              >
                {isKz ? 'Қолдану' : 'Применить'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
