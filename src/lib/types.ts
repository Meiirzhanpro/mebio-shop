export interface Product {
  id: string
  sku: string
  name: string
  nameKz?: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  inStock: boolean
  quantity?: number
  description?: string
  characteristics?: Record<string, string>
}

export interface Category {
  id: string
  name: string
  nameKz: string
  slug: string
  icon: string
}

export interface CartItem {
  product: Product
  quantity: number
}
