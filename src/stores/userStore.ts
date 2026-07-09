import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { userApi } from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  // 獲取人員列表
  const fetchUsers = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await userApi.getList(page, pageSize.value)
      if (response.code === 200) {
        users.value = response.data.items
        total.value = response.data.total
        currentPage.value = page
      } else {
        error.value = response.message
      }
    } catch (e) {
      error.value = '獲取人員列表失敗'
    } finally {
      loading.value = false
    }
  }

  // 新增人員
  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await userApi.create(user)
      if (response.code === 201) {
        users.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '新增人員失敗'
      throw e
    }
  }

  // 更新人員
  const updateUser = async (id: string, user: Partial<User>) => {
    try {
      const response = await userApi.update(id, user)
      if (response.code === 200) {
        const index = users.value.findIndex(u => u.id === id)
        if (index !== -1) {
          users.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '更新人員失敗'
      throw e
    }
  }

  // 刪除人員
  const deleteUser = async (id: string) => {
    try {
      const response = await userApi.delete(id)
      if (response.code === 200) {
        users.value = users.value.filter(u => u.id !== id)
        total.value--
      } else {
        throw new Error(response.message)
      }
    } catch (e) {
      error.value = '刪除人員失敗'
      throw e
    }
  }

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  return {
    users,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    totalPages,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  }
})
