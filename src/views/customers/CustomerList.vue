<template>
  <div class="customer-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>客戶列表</span>
          <el-button type="primary" @click="handleAdd">新增客戶</el-button>
        </div>
      </template>

      <el-input
        v-model="searchText"
        placeholder="搜索客戶名稱"
        style="margin-bottom: 20px; width: 300px"
      />

      <el-table :data="customers" stripe>
        <el-table-column prop="id" label="客戶 ID" width="100" />
        <el-table-column prop="name" label="公司名稱" width="200" />
        <el-table-column prop="industry" label="行業" width="150" />
        <el-table-column prop="contact" label="聯繫人" width="150" />
        <el-table-column prop="phone" label="電話" width="150" />
        <el-table-column prop="email" label="郵箱" width="200" />
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
const total = ref(30)

const customers = ref([
  {
    id: 'C001',
    name: 'ABC 健身中心',
    industry: '健身',
    contact: '張經理',
    phone: '0912-345-678',
    email: 'abc@fitness.com',
  },
  {
    id: 'C002',
    name: '運動用品店',
    industry: '零售',
    contact: '李老闆',
    phone: '0923-456-789',
    email: 'shop@sports.com',
  },
])

const handleAdd = () => {
  ElMessage.info('新增客戶功能開發中')
}

const handleEdit = (row: any) => {
  ElMessage.info(`編輯客戶：${row.name}`)
}

const handleDelete = (row: any) => {
  ElMessage.warning(`刪除客戶：${row.name}`)
}
</script>

<style scoped>
.customer-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
