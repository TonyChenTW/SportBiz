<template>
  <div class="user-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>
            <h3>員工列表</h3>
            <p class="subtitle">共 {{ total }} 名員工</p>
          </div>
          <el-button type="primary" @click="handleAdd">
            <template #icon>
              <Plus />
            </template>
            新增員工
          </el-button>
        </div>
      </template>

      <!-- 搜索和篩選 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索員工名稱、ID 或郵箱"
          clearable
          @input="handleSearch"
          style="width: 300px"
        >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedDepartment"
          placeholder="按部門篩選"
          clearable
          @change="handleFilterChange"
          style="width: 200px"
        >
          <el-option
            v-for="dept in departments"
            :key="dept"
            :label="dept"
            :value="dept"
          />
        </el-select>

        <el-select
          v-model="selectedStatus"
          placeholder="按狀態篩選"
          clearable
          @change="handleFilterChange"
          style="width: 200px"
        >
          <el-option label="在職" value="active" />
          <el-option label="離職" value="inactive" />
        </el-select>
      </div>

      <!-- 員工表格 -->
      <el-table
        v-loading="loading"
        :data="filteredUsers"
        stripe
        style="width: 100%; margin-top: 20px"
        :default-sort="{ prop: 'joinDate', order: 'descending' }"
      >
        <el-table-column prop="id" label="員工 ID" width="100" sortable />
        <el-table-column prop="name" label="姓名" width="120" sortable />
        <el-table-column prop="position" label="職位" width="130" />
        <el-table-column prop="department" label="部門" width="120" />
        <el-table-column prop="email" label="郵箱" width="200" show-overflow-tooltip />
        <el-table-column prop="joinDate" label="加入日期" width="120" sortable />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '在職' : '離職' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">
              編輯
            </el-button>
            <el-button link type="primary" @click="handleView(row)">
              查看
            </el-button>
            <el-popconfirm
              title="確定要刪除此員工嗎？"
              confirm-button-text="確定"
              cancel-button-text="取消"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button link type="danger">
                  刪除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; text-align: right"
        @current-change="handlePageChange"
        @size-change="handlePageSizeChange"
      />
    </el-card>

    <!-- 新增/編輯對話框 -->
    <el-dialog
      v-model="formDialogVisible"
      :title="isEdit ? '編輯員工' : '新增員工'"
      width="600px"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="請輸入員工姓名" />
        </el-form-item>

        <el-form-item label="郵箱" prop="email">
          <el-input v-model="formData.email" placeholder="請輸入郵箱地址" />
        </el-form-item>

        <el-form-item label="職位" prop="position">
          <el-input v-model="formData.position" placeholder="請輸入職位" />
        </el-form-item>

        <el-form-item label="部門" prop="department">
          <el-select v-model="formData.department" placeholder="請選擇部門">
            <el-option
              v-for="dept in departments"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="電話" prop="phone">
          <el-input v-model="formData.phone" placeholder="請輸入聯繫電話" />
        </el-form-item>

        <el-form-item label="加入日期" prop="joinDate">
          <el-date-picker
            v-model="formData.joinDate"
            type="date"
            placeholder="選擇加入日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="狀態" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio value="active">在職</el-radio>
            <el-radio value="inactive">離職</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">
          保存
        </el-button>
      </template>
    </el-dialog>

    <!-- 詳情對話框 -->
    <el-dialog
      v-model="viewDialogVisible"
      title="員工詳情"
      width="600px"
    >
      <div v-if="selectedUser" class="user-detail">
        <div class="detail-row">
          <span class="label">員工 ID：</span>
          <span class="value">{{ selectedUser.id }}</span>
        </div>
        <div class="detail-row">
          <span class="label">姓名：</span>
          <span class="value">{{ selectedUser.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">郵箱：</span>
          <span class="value">{{ selectedUser.email }}</span>
        </div>
        <div class="detail-row">
          <span class="label">職位：</span>
          <span class="value">{{ selectedUser.position }}</span>
        </div>
        <div class="detail-row">
          <span class="label">部門：</span>
          <span class="value">{{ selectedUser.department }}</span>
        </div>
        <div class="detail-row">
          <span class="label">電話：</span>
          <span class="value">{{ selectedUser.phone }}</span>
        </div>
        <div class="detail-row">
          <span class="label">加入日期：</span>
          <span class="value">{{ selectedUser.joinDate }}</span>
        </div>
        <div class="detail-row">
          <span class="label">狀態：</span>
          <el-tag :type="selectedUser.status === 'active' ? 'success' : 'info'">
            {{ selectedUser.status === 'active' ? '在職' : '離職' }}
          </el-tag>
        </div>
      </div>

      <template #footer>
        <el-button @click="viewDialogVisible = false">關閉</el-button>
        <el-button type="primary" @click="handleEditFromView">編輯</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import type { User } from '@/types'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// 數據
const searchText = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const formDialogVisible = ref(false)
const viewDialogVisible = ref(false)
const isEdit = ref(false)
const saveLoading = ref(false)
const formRef = ref<FormInstance>()
const selectedUser = ref<User | null>(null)

const departments = ['銷售部', '技術部', '財務部', '市場部', '人力資源部']

// 計算屬性
const total = computed(() => userStore.total)
const loading = computed(() => userStore.loading)
const filteredUsers = computed(() => {
  return userStore.users.filter(user => {
    const matchesSearch = searchText.value === '' ||
      user.name.includes(searchText.value) ||
      user.id.includes(searchText.value) ||
      user.email.includes(searchText.value)
    
    const matchesDepartment = selectedDepartment.value === '' ||
      user.department === selectedDepartment.value
    
    const matchesStatus = selectedStatus.value === '' ||
      user.status === selectedStatus.value
    
    return matchesSearch && matchesDepartment && matchesStatus
  })
})

// 表單數據
const formData = ref<Omit<User, 'id'>>({
  name: '',
  email: '',
  position: '',
  department: '',
  phone: '',
  joinDate: '',
  status: 'active',
})

// 表單規則
const formRules = {
  name: [{ required: true, message: '請輸入員工姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '請輸入郵箱', trigger: 'blur' },
    { type: 'email', message: '郵箱格式不正確', trigger: 'blur' },
  ],
  position: [{ required: true, message: '請輸入職位', trigger: 'blur' }],
  department: [{ required: true, message: '請選擇部門', trigger: 'change' }],
  phone: [{ required: true, message: '請輸入電話', trigger: 'blur' }],
  joinDate: [{ required: true, message: '請選擇加入日期', trigger: 'change' }],
}

// 生命週期
const loadUsers = async () => {
  await userStore.fetchUsers(currentPage.value)
}

// 方法
const handleSearch = () => {
  currentPage.value = 1
}

const handleFilterChange = () => {
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  loadUsers()
}

const handlePageSizeChange = (size: number) => {
  currentPage.value = 1
  userStore.pageSize = size
  loadUsers()
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  formDialogVisible.value = true
}

const handleEdit = (row: User) => {
  isEdit.value = true
  selectedUser.value = row
  formData.value = {
    name: row.name,
    email: row.email,
    position: row.position,
    department: row.department,
    phone: row.phone,
    joinDate: row.joinDate,
    status: row.status,
  }
  formDialogVisible.value = true
}

const handleView = (row: User) => {
  selectedUser.value = row
  viewDialogVisible.value = true
}

const handleEditFromView = () => {
  viewDialogVisible.value = false
  if (selectedUser.value) {
    handleEdit(selectedUser.value)
  }
}

const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    saveLoading.value = true
    
    if (isEdit.value && selectedUser.value) {
      await userStore.updateUser(selectedUser.value.id, formData.value)
      ElMessage.success('員工資料已更新')
    } else {
      await userStore.addUser(formData.value)
      ElMessage.success('新增員工成功')
    }
    
    formDialogVisible.value = false
    loadUsers()
  } catch (error) {
    console.error(error)
  } finally {
    saveLoading.value = false
  }
}

const handleDelete = async (row: User) => {
  try {
    await userStore.deleteUser(row.id)
    ElMessage.success('員工已刪除')
    loadUsers()
  } catch (error) {
    ElMessage.error('刪除失敗')
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    joinDate: '',
    status: 'active',
  }
  formRef.value?.clearValidate()
}

// 初始化
loadUsers()
</script>

<style scoped>
.user-management {
  padding: 0;
}

.box-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.card-header div h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #999;
}

.search-bar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-row .label {
  font-weight: bold;
  color: #666;
  min-width: 100px;
}

.detail-row .value {
  color: #333;
}
</style>
