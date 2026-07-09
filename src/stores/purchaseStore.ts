import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Purchase } from '@/types'
import { purchaseApi } from '@/services/api'

export const usePurchaseStore = defineStore('purchase', () => {
  const purchases = ref<Purchase[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  const fetchPurchases = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await purchaseApi.getList(page, pageSize.value)
      if (response.code === 200) {
        purchases.value = response.data.items
        total.value = response.data.total
        currentPage.value = page
      } else {
        error.value = response.message
      }
    } catch (e) {
      error.value = '獲取採購單列表失敗'
    } finally {
      loading.value = false
    }
  }

  const addPurchase = async (purchase: Omit<Purchase, 'id'>) => {
    try {
      const response = await purchaseApi.create(purchase)
      if (response.code === 201) {
        purchases.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '新增採購單失敗'
      throw e
    }
  }

  const updatePurchase = async (id: string, purchase: Partial<Purchase>) => {
    try {
      const response = await purchaseApi.update(id, purchase)
      if (response.code === 200) {
        const index = purchases.value.findIndex(p => p.id === id)
        if (index !== -1) {
          purchases.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '更新採購單失敗'
      throw e
    }
  }

  const deletePurchase = async (id: string) => {
    try {
      const response = await purchaseApi.delete(id)
      if (response.code === 200) {
        purchases.value = purchases.value.filter(p => p.id !== id)
        total.value--
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '刪除採購單失敗'
      throw e
    }
  }

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  return {
    purchases,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    fetchPurchases,
    addPurchase,
    updatePurchase,
    deletePurchase,
  }
})
