<template>
  <div class="product-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>商品列表</span>
          <el-button type="primary" @click="handleAdd">新增商品</el-button>
        </div>
      </template>

      <el-input
        v-model="searchText"
        placeholder="搜索商品名稱"
        style="margin-bottom: 20px; width: 300px"
      />

      <el-table :data="products" stripe>
        <el-table-column prop="id" label="商品 ID" width="100" />
        <el-table-column prop="name" label="商品名稱" width="200" />
        <el-table-column prop="category" label="分類" width="150" />
        <el-table-column prop="price" label="價格" width="100" />
        <el-table-column prop="stock" label="庫存" width="100" />
        <el-table-column prop="supplier" label="供應商" width="150" />
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
const total = ref(100)

const products = ref([
  {
    id: 'P001',
    name: '運動T恤',
    category: '服飾',
    price: 299,
    stock: 150,
    supplier: '廠商A',
  },
  {
    id: 'P002',
    name: '運動鞋',
    category: '鞋類',
    price: 1299,
    stock: 80,
    supplier: '廠商B',
  },
  {
    id: 'P003',
    name: '運動手錶',
    category: '配飾',
    price: 2999,
    stock: 45,
    supplier: '廠商C',
  },
])

const handleAdd = () => {
  ElMessage.info('新增商品功能開發中')
}

const handleEdit = (row: any) => {
  ElMessage.info(`編輯商品：${row.name}`)
}

const handleDelete = (row: any) => {
  ElMessage.warning(`刪除商品：${row.name}`)
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
