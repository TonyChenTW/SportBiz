<template>
  <el-container class="app-container">
    <el-aside width="200px" class="sidebar">
      <div class="logo">
        <h2>SportBiz</h2>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        unique-opened
      >
        <el-menu-item index="/">
          <span>儀表板</span>
        </el-menu-item>
        
        <el-sub-menu index="1">
          <template #title>
            <span>人員管理</span>
          </template>
          <el-menu-item index="/users">員工列表</el-menu-item>
          <el-menu-item index="/users/add">新增員工</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <span>客戶管理</span>
          </template>
          <el-menu-item index="/customers">客戶列表</el-menu-item>
          <el-menu-item index="/customers/add">新增客戶</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/products">商品列表</el-menu-item>
          <el-menu-item index="/products/add">新增商品</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <span>採購管理</span>
          </template>
          <el-menu-item index="/purchases">採購單</el-menu-item>
          <el-menu-item index="/purchases/add">新增採購單</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-content">
          <h1>{{ pageTitle }}</h1>
          <div class="user-info">
            <span>管理員</span>
          </div>
        </div>
      </el-header>

      <el-main class="main-content">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': '儀表板',
    '/users': '人員管理',
    '/customers': '客戶管理',
    '/products': '商品管理',
    '/purchases': '採購管理',
  }
  return titles[route.path] || '運動企業管理系統'
})
</script>

<style scoped>
.app-container {
  height: 100vh;
}

.sidebar {
  background-color: #545c64;
}

.logo {
  padding: 20px;
  text-align: center;
  color: white;
}

.logo h2 {
  margin: 0;
  font-size: 20px;
}

.header {
  background-color: #f0f2f5;
  border-bottom: 1px solid #dcdfe6;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-content h1 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.main-content {
  background-color: #f5f7fa;
  padding: 20px;
}
</style>
