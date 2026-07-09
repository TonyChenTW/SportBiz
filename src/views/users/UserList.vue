<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>員工列表</span>
          <el-button type="primary" @click="handleAdd">新增員工</el-button>
        </div>
      </template>

      <el-input
        v-model="searchText"
        placeholder="搜索員工名稱或 ID"
        style="margin-bottom: 20px; width: 300px"
      />

      <el-table :data="users" stripe>
        <el-table-column prop="id" label="員工 ID" width="100" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="position" label="職位" width="150" />
        <el-table-column prop="department" label="部門" width="150" />
        <el-table-column prop="email" label="郵箱" width="200" />
        <el-table-column prop="joinDate" label="加入日期" width="150" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">
              編輯
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; text-align: right"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(50)

const users = ref([
  {
    id: 'E001',
    name: '張三',
    position: '銷售經理',
    department: '銷售部',
    email: 'zhangsan@sportbiz.com',
    joinDate: '2023-01-15',
  },
  {
    id: 'E002',
    name: '李四',
    position: '技術主管',
    department: '技術部',
    email: 'lisi@sportbiz.com',
    joinDate: '2023-03-20',
  },
  {
    id: 'E003',
    name: '王五',
    position: '財務經理',
    department: '財務部',
    email: 'wangwu@sportbiz.com',
    joinDate: '2023-02-10',
  },
])

const handleAdd = () => {
  ElMessage.info('新增員工功能開發中')
}

const handleEdit = (row: any) => {
  ElMessage.info(`編輯員工：${row.name}`)
}

const handleDelete = (row: any) => {
  ElMessage.warning(`刪除員工：${row.name}`)
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
