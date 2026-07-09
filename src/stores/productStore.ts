import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import { productApi } from '@/services/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  const fetchProducts = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getList(page, pageSize.value)
      if (response.code === 200) {
        products.value = response.data.items
        total.value = response.data.total
        currentPage.value = page
      } else {
        error.value = response.message
      }
    } catch (e) {
      error.value = '獲取商品列表失敗'
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await productApi.create(product)
      if (response.code === 201) {
        products.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '新增商品失敗'
      throw e
    }
  }

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const response = await productApi.update(id, product)
      if (response.code === 200) {
        const index = products.value.findIndex(p => p.id === id)
        if (index !== -1) {
          products.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '更新商品失敗'
      throw e
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await productApi.delete(id)
      if (response.code === 200) {
        products.value = products.value.filter(p => p.id !== id)
        total.value--
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '刪除商品失敗'
      throw e
    }
  }

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  return {
    products,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
