<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="總員工數" :value="100" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="總客戶數" :value="45" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="商品總數" :value="320" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="待處理採購單" :value="12" />
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :md="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近活動</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              placement="top"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>系統狀態</span>
            </div>
          </template>
          <el-table :data="systemStatus">
            <el-table-column prop="name" label="模塊" width="140" />
            <el-table-column prop="status" label="狀態" width="100" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activities = ref([
  { time: '2026-07-09 08:30', content: '新增員工：張三' },
  { time: '2026-07-09 08:15', content: '新增客戶：ABC 公司' },
  { time: '2026-07-09 07:50', content: '建立採購單 #001' },
  { time: '2026-07-09 07:30', content: '庫存更新完成' },
])

const systemStatus = ref([
  { name: '人員管理', status: '正常' },
  { name: '客戶管理', status: '正常' },
  { name: '商品管理', status: '正常' },
  { name: '採購管理', status: '正常' },
])
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
