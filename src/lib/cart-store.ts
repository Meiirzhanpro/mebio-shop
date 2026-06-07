'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from './types'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  add: (product: Product) => void
  remove: (sku: string) => void
  setQty: (sku: string, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const items = get().items
        const existing = items.find((i) => i.product.sku === product.sku)
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.sku === product.sku
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      remove: (sku) =>
        set({ items: get().items.filter((i) => i.product.sku !== sku) }),

      setQty: (sku, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.product.sku !== sku) })
        } else {
          set({
            items: get().items.map((i) =>
              i.product.sku === sku ? { ...i, quantity: qty } : i
            ),
          })
        }
      },

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'mebio-cart' }
  )
)
