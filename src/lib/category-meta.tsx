import { Sofa, BedDouble, Archive, Home, Table2, Moon, DoorOpen, ChefHat } from 'lucide-react'
import React from 'react'

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  divany:      <Sofa size={26} />,
  krovati:     <BedDouble size={26} />,
  shkaf:       <Archive size={26} />,
  gostinaya:   <Home size={26} />,
  stoly:       <Table2 size={26} />,
  spalnya:     <Moon size={26} />,
  prikhozhaya: <DoorOpen size={26} />,
  kukhnya:     <ChefHat size={26} />,
}

export const CATEGORY_META: Record<string, {
  gradient: string
  iconBg: string
  textColor: string
  countRu: string
  countKz: string
}> = {
  divany:      { gradient: 'from-orange-500 to-amber-400',  iconBg: 'bg-orange-100',  textColor: 'text-orange-600',  countRu: '150+ моделей',    countKz: '150+ үлгі' },
  krovati:     { gradient: 'from-blue-500 to-cyan-400',     iconBg: 'bg-blue-100',    textColor: 'text-blue-600',    countRu: '80+ моделей',     countKz: '80+ үлгі' },
  shkaf:       { gradient: 'from-emerald-500 to-teal-400',  iconBg: 'bg-emerald-100', textColor: 'text-emerald-600', countRu: '60+ моделей',     countKz: '60+ үлгі' },
  gostinaya:   { gradient: 'from-purple-500 to-violet-400', iconBg: 'bg-purple-100',  textColor: 'text-purple-600',  countRu: '40+ комплектов',  countKz: '40+ жиынтық' },
  stoly:       { gradient: 'from-yellow-500 to-amber-400',  iconBg: 'bg-yellow-100',  textColor: 'text-yellow-600',  countRu: '90+ моделей',     countKz: '90+ үлгі' },
  spalnya:     { gradient: 'from-pink-500 to-rose-400',     iconBg: 'bg-pink-100',    textColor: 'text-pink-600',    countRu: '50+ комплектов',  countKz: '50+ жиынтық' },
  prikhozhaya: { gradient: 'from-slate-500 to-gray-400',    iconBg: 'bg-slate-100',   textColor: 'text-slate-600',   countRu: '35+ моделей',     countKz: '35+ үлгі' },
  kukhnya:     { gradient: 'from-red-500 to-orange-400',    iconBg: 'bg-red-100',     textColor: 'text-red-600',     countRu: '45+ гарнитуров',  countKz: '45+ гарнитур' },
}
