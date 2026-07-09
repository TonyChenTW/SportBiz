// 人員相關類型
export interface User {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  joinDate: string
  status: 'active' | 'inactive'
}

// 客戶相關類型
export interface Customer {
  id: string
  name: string
  industry: string
  contact: string
  phone: string
  email: string
  address: string
  registrationDate: string
  status: 'active' | 'inactive'
  totalTransactions: number
}

// 商品相關類型
export interface Product {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  supplier: string
  description: string
  status: 'available' | 'discontinued'
}

// 採購相關類型
export interface Purchase {
  id: string
  supplier: string
  products: PurchaseItem[]
  totalAmount: number
  status: 'draft' | 'approved' | 'received' | 'cancelled'
  date: string
  dueDate: string
  notes: string
}

export interface PurchaseItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

// API 響應類型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  code: number
  message: string
  data: {
    items: T[]
    total: number
    page: number
    pageSize: number
  }
}
