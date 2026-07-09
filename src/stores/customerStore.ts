import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Customer } from '@/types'
import { customerApi } from '@/services/api'

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<Customer[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  const fetchCustomers = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await customerApi.getList(page, pageSize.value)
      if (response.code === 200) {
        customers.value = response.data.items
        total.value = response.data.total
        currentPage.value = page
      } else {
        error.value = response.message
      }
    } catch (e) {
      error.value = '獲取客戶列表失敗'
    } finally {
      loading.value = false
    }
  }

  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    try {
      const response = await customerApi.create(customer)
      if (response.code === 201) {
        customers.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '新增客戶失敗'
      throw e
    }
  }

  const updateCustomer = async (id: string, customer: Partial<Customer>) => {
    try {
      const response = await customerApi.update(id, customer)
      if (response.code === 200) {
        const index = customers.value.findIndex(c => c.id === id)
        if (index !== -1) {
          customers.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '更新客戶失敗'
      throw e
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      const response = await customerApi.delete(id)
      if (response.code === 200) {
        customers.value = customers.value.filter(c => c.id !== id)
        total.value--
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '刪除客戶失敗'
      throw e
    }
  }

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  return {
    customers,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  }
})
