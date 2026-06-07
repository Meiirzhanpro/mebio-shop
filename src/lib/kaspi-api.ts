import { Product } from './types'

const KASPI_API_BASE = 'https://kaspi.kz/shop/api/v2'
const SHOP_ID = process.env.KASPI_SHOP_ID || ''
const API_KEY = process.env.KASPI_API_KEY || ''

async function kaspiRequest(endpoint: string) {
  const res = await fetch(`${KASPI_API_BASE}${endpoint}`, {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // кэш 1 час
  })
  if (!res.ok) throw new Error(`Kaspi API error: ${res.status}`)
  return res.json()
}

function mapKaspiProduct(item: any): Product {
  const attrs = item.attributes || {}
  return {
    id: String(item.id || item.masterId),
    sku: String(item.sku || item.id),
    name: attrs.title || attrs.name || '',
    price: attrs.price || 0,
    images: attrs.photos || attrs.images || [],
    category: attrs.categoryName || '',
    brand: attrs.brand || '',
    inStock: (attrs.availableStock || attrs.quantity || 0) > 0,
    quantity: attrs.availableStock || attrs.quantity || 0,
    description: attrs.description || '',
  }
}

export async function getProducts(params?: {
  page?: number
  size?: number
  category?: string
}): Promise<{ products: Product[]; total: number }> {
  // Если API ключ не настроен — возвращаем моковые данные
  if (!API_KEY || !SHOP_ID) {
    return getMockProducts(params)
  }

  try {
    const page = params?.page || 0
    const size = params?.size || 20
    const data = await kaspiRequest(
      `/companies/${SHOP_ID}/products?page[number]=${page}&page[size]=${size}`
    )
    const products = (data.data || []).map(mapKaspiProduct)
    const total = data.meta?.total || products.length
    return { products, total }
  } catch {
    return getMockProducts(params)
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!API_KEY || !SHOP_ID) {
    const { products } = await getMockProducts()
    return products.find((p) => p.id === id) || null
  }

  try {
    const data = await kaspiRequest(`/companies/${SHOP_ID}/products/${id}`)
    return mapKaspiProduct(data.data)
  } catch {
    return null
  }
}

// Моковые данные пока API не подключён
async function getMockProducts(params?: { category?: string }): Promise<{
  products: Product[]
  total: number
}> {
  const mock: Product[] = [
    {
      id: '1',
      sku: 'SOFA-001',
      name: 'TURAN HOME Grand диван прямой, велюр, коричневый',
      price: 485000,
      images: [],
      category: 'Диваны',
      brand: 'TURAN HOME',
      inStock: true,
      quantity: 5,
    },
    {
      id: '2',
      sku: 'WARDROBE-001',
      name: 'Шкаф-витрина КВАНТ Престиж 235х310х45 см',
      price: 354000,
      images: [],
      category: 'Шкафы-витрины',
      brand: 'КВАНТ',
      inStock: true,
      quantity: 3,
    },
    {
      id: '3',
      sku: 'WALL-001',
      name: 'Стенка СлонимМебель Стелла 310х233х48 см, белый',
      price: 415000,
      images: [],
      category: 'Комплекты для гостиной',
      brand: 'СлонимМебель',
      inStock: true,
      quantity: 8,
    },
    {
      id: '4',
      sku: 'BED-001',
      name: 'Кровать ЭРА Мебель Мокко 180x200 см, бежевый',
      price: 321000,
      images: [],
      category: 'Кровати',
      brand: 'ЭРА Мебель',
      inStock: true,
      quantity: 2,
    },
    {
      id: '5',
      sku: 'SOFA-002',
      name: 'Elegant CRYSTAL комплект (2 кресла + диван), велюр',
      price: 566000,
      images: [],
      category: 'Диваны',
      brand: 'Elegant',
      inStock: true,
      quantity: 1,
    },
    {
      id: '6',
      sku: 'SHELF-001',
      name: 'Горка Форест Деко Групп Амели, МДФ, белый',
      price: 755000,
      images: [],
      category: 'Шкафы-витрины',
      brand: 'Форест Деко Групп',
      inStock: true,
      quantity: 4,
    },
  ]

  const filtered = params?.category
    ? mock.filter((p) =>
        p.category.toLowerCase().includes(params.category!.toLowerCase())
      )
    : mock

  return { products: filtered, total: filtered.length }
}
