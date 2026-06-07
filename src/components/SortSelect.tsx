'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Props {
  locale: string
  defaultValue: string
}

export default function SortSelect({ locale, defaultValue }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('sort', e.target.value)
    } else {
      params.delete('sort')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 bg-white"
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      <option value="">{locale === 'kz' ? 'Сұрыптау' : 'Сортировка'}</option>
      <option value="price_asc">{locale === 'kz' ? 'Алдымен арзан' : 'Сначала дешевле'}</option>
      <option value="price_desc">{locale === 'kz' ? 'Алдымен қымбат' : 'Сначала дороже'}</option>
    </select>
  )
}
