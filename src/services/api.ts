import type { User, Customer, Product, Purchase, ApiResponse, PaginatedResponse } from '@/types'
import { mockUsers, mockCustomers, mockProducts, mockPurchases } from './mockData'

// 模擬網絡延遲
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

// ==================== 人員 API ====================

export const userApi = {
  // 獲取人員列表
  async getList(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<User>> {
    await delay()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      code: 200,
      message: 'Success',
      data: {
        items: mockUsers.slice(start, end),
        total: mockUsers.length,
        page,
        pageSize,
      },
    }
  },

  // 獲取人員詳情
  async getById(id: string): Promise<ApiResponse<User>> {
    await delay()
    const user = mockUsers.find(u => u.id === id)
    if (!user) {
      return {
        code: 404,
        message: 'User not found',
        data: null as any,
      }
    }
    return {
      code: 200,
      message: 'Success',
      data: user,
    }
  },

  // 新增人員
  async create(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    await delay()
    const newUser: User = {
      id: `E${String(mockUsers.length + 1).padStart(3, '0')}`,
      ...user,
    }
    mockUsers.push(newUser)
    return {
      code: 201,
      message: 'Created',
      data: newUser,
    }
  },

  // 更新人員
  async update(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
    await delay()
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'User not found',
        data: null as any,
      }
    }
    mockUsers[index] = { ...mockUsers[index], ...user }
    return {
      code: 200,
      message: 'Updated',
      data: mockUsers[index],
    }
  },

  // 刪除人員
  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockUsers.findIndex(u => u.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'User not found',
        data: null,
      }
    }
    mockUsers.splice(index, 1)
    return {
      code: 200,
      message: 'Deleted',
      data: null,
    }
  },
}

// ==================== 客戶 API ====================

export const customerApi = {
  // 獲取客戶列表
  async getList(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Customer>> {
    await delay()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      code: 200,
      message: 'Success',
      data: {
        items: mockCustomers.slice(start, end),
        total: mockCustomers.length,
        page,
        pageSize,
      },
    }
  },

  // 獲取客戶詳情
  async getById(id: string): Promise<ApiResponse<Customer>> {
    await delay()
    const customer = mockCustomers.find(c => c.id === id)
    if (!customer) {
      return {
        code: 404,
        message: 'Customer not found',
        data: null as any,
      }
    }
    return {
      code: 200,
      message: 'Success',
      data: customer,
    }
  },

  // 新增客戶
  async create(customer: Omit<Customer, 'id'>): Promise<ApiResponse<Customer>> {
    await delay()
    const newCustomer: Customer = {
      id: `C${String(mockCustomers.length + 1).padStart(3, '0')}`,
      ...customer,
    }
    mockCustomers.push(newCustomer)
    return {
      code: 201,
      message: 'Created',
      data: newCustomer,
    }
  },

  // 更新客戶
  async update(id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> {
    await delay()
    const index = mockCustomers.findIndex(c => c.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Customer not found',
        data: null as any,
      }
    }
    mockCustomers[index] = { ...mockCustomers[index], ...customer }
    return {
      code: 200,
      message: 'Updated',
      data: mockCustomers[index],
    }
  },

  // 刪除客戶
  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockCustomers.findIndex(c => c.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Customer not found',
        data: null,
      }
    }
    mockCustomers.splice(index, 1)
    return {
      code: 200,
      message: 'Deleted',
      data: null,
    }
  },
}

// ==================== 商品 API ====================

export const productApi = {
  // 獲取商品列表
  async getList(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Product>> {
    await delay()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      code: 200,
      message: 'Success',
      data: {
        items: mockProducts.slice(start, end),
        total: mockProducts.length,
        page,
        pageSize,
      },
    }
  },

  // 獲取商品詳情
  async getById(id: string): Promise<ApiResponse<Product>> {
    await delay()
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      return {
        code: 404,
        message: 'Product not found',
        data: null as any,
      }
    }
    return {
      code: 200,
      message: 'Success',
      data: product,
    }
  },

  // 新增商品
  async create(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    await delay()
    const newProduct: Product = {
      id: `P${String(mockProducts.length + 1).padStart(3, '0')}`,
      ...product,
    }
    mockProducts.push(newProduct)
    return {
      code: 201,
      message: 'Created',
      data: newProduct,
    }
  },

  // 更新商品
  async update(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    await delay()
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Product not found',
        data: null as any,
      }
    }
    mockProducts[index] = { ...mockProducts[index], ...product }
    return {
      code: 200,
      message: 'Updated',
      data: mockProducts[index],
    }
  },

  // 刪除商品
  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Product not found',
        data: null,
      }
    }
    mockProducts.splice(index, 1)
    return {
      code: 200,
      message: 'Deleted',
      data: null,
    }
  },
}

// ==================== 採購 API ====================

export const purchaseApi = {
  // 獲取採購單列表
  async getList(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Purchase>> {
    await delay()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      code: 200,
      message: 'Success',
      data: {
        items: mockPurchases.slice(start, end),
        total: mockPurchases.length,
        page,
        pageSize,
      },
    }
  },

  // 獲取採購單詳情
  async getById(id: string): Promise<ApiResponse<Purchase>> {
    await delay()
    const purchase = mockPurchases.find(p => p.id === id)
    if (!purchase) {
      return {
        code: 404,
        message: 'Purchase not found',
        data: null as any,
      }
    }
    return {
      code: 200,
      message: 'Success',
      data: purchase,
    }
  },

  // 新增採購單
  async create(purchase: Omit<Purchase, 'id'>): Promise<ApiResponse<Purchase>> {
    await delay()
    const newPurchase: Purchase = {
      id: `PO${String(mockPurchases.length + 1).padStart(3, '0')}`,
      ...purchase,
    }
    mockPurchases.push(newPurchase)
    return {
      code: 201,
      message: 'Created',
      data: newPurchase,
    }
  },

  // 更新採購單
  async update(id: string, purchase: Partial<Purchase>): Promise<ApiResponse<Purchase>> {
    await delay()
    const index = mockPurchases.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Purchase not found',
        data: null as any,
      }
    }
    mockPurchases[index] = { ...mockPurchases[index], ...purchase }
    return {
      code: 200,
      message: 'Updated',
      data: mockPurchases[index],
    }
  },

  // 刪除採購單
  async delete(id: string): Promise<ApiResponse<null>> {
    await delay()
    const index = mockPurchases.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        code: 404,
        message: 'Purchase not found',
        data: null,
      }
    }
    mockPurchases.splice(index, 1)
    return {
      code: 200,
      message: 'Deleted',
      data: null,
    }
  },
}
