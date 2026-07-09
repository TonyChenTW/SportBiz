<template>
  <div class="purchase-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>採購單列表</span>
          <el-button type="primary" @click="handleAdd">新增採購單</el-button>
        </div>
      </template>

      <el-input
        v-model="searchText"
        placeholder="搜索採購單 ID"
        style="margin-bottom: 20px; width: 300px"
      />

      <el-table :data="purchases" stripe>
        <el-table-column prop="id" label="採購單 ID" width="120" />
        <el-table-column prop="supplier" label="供應商" width="150" />
        <el-table-column prop="products" label="商品數量" width="120" />
        <el-table-column prop="totalAmount" label="總金額" width="120" />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="採購日期" width="150" />
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
const total = ref(25)

const purchases = ref([
  {
    id: 'PO001',
    supplier: '廠商A',
    products: 3,
    totalAmount: 15000,
    status: '已收貨',
    date: '2026-07-01',
  },
  {
    id: 'PO002',
    supplier: '廠商B',
    products: 2,
    totalAmount: 8500,
    status: '待收貨',
    date: '2026-07-05',
  },
  {
    id: 'PO003',
    supplier: '廠商C',
    products: 5,
    totalAmount: 22000,
    status: '已簽核',
    date: '2026-07-08',
  },
])

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    '已收貨': 'success',
    '待收貨': 'warning',
    '已簽核': 'info',
    '已取消': 'danger',
  }
  return types[status] || 'info'
}

const handleAdd = () => {
  ElMessage.info('新增採購單功能開發中')
}

const handleEdit = (row: any) => {
  ElMessage.info(`編輯採購單：${row.id}`)
}

const handleDelete = (row: any) => {
  ElMessage.warning(`刪除採購單：${row.id}`)
}
</script>

<style scoped>
.purchase-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
