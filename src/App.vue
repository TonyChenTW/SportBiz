<template>
  <el-container class="app-container">
    <el-aside width="250px" class="sidebar">
      <div class="logo-section">
        <div class="logo">
          <div class="logo-icon">📊</div>
          <div>
            <h3>SportBiz</h3>
            <p>企業管理系統</p>
          </div>
        </div>
      </div>

      <el-menu
        router
        :default-active="$route.path"
        :collapse="false"
        class="menu"
        @select="handleMenuSelect"
      >
        <el-menu-item index="/" class="menu-item-root">
          <template #title>
            <span class="icon">🏠</span>
            <span>儀表板</span>
          </template>
        </el-menu-item>
        
        <el-divider margin="0" style="background-color: #666; opacity: 0.3;" />

        <el-sub-menu index="1" class="sub-menu">
          <template #title>
            <span class="icon">👥</span>
            <span>人員管理</span>
          </template>
          <el-menu-item index="/users">
            <template #title>員工列表</template>
          </el-menu-item>
          <el-menu-item index="/users/add">
            <template #title>新增員工</template>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2" class="sub-menu">
          <template #title>
            <span class="icon">🤝</span>
            <span>客戶管理</span>
          </template>
          <el-menu-item index="/customers">
            <template #title>客戶列表</template>
          </el-menu-item>
          <el-menu-item index="/customers/add">
            <template #title>新增客戶</template>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3" class="sub-menu">
          <template #title>
            <span class="icon">📦</span>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/products">
            <template #title>商品列表</template>
          </el-menu-item>
          <el-menu-item index="/products/add">
            <template #title>新增商品</template>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4" class="sub-menu">
          <template #title>
            <span class="icon">🛒</span>
            <span>採購管理</span>
          </template>
          <el-menu-item index="/purchases">
            <template #title>採購單</template>
          </el-menu-item>
          <el-menu-item index="/purchases/add">
            <template #title>新增採購單</template>
          </el-menu-item>
        </el-sub-menu>

        <el-divider margin="0" style="background-color: #666; opacity: 0.3;" />

        <el-menu-item index="/settings" class="menu-item-bottom">
          <template #title>
            <span class="icon">⚙️</span>
            <span>系統設置</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="main-container">
      <el-header class="header">
        <div class="breadcrumb-section">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item" :to="item.path">
              {{ item.label }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-tooltip content="搜索">
            <el-icon class="icon-button">
              <Search />
            </el-icon>
          </el-tooltip>
          
          <el-tooltip content="通知">
            <el-badge :value="3" class="icon-button">
              <el-icon>
                <Bell />
              </el-icon>
            </el-badge>
          </el-tooltip>

          <el-dropdown>
            <div class="user-profile">
              <el-avatar size="small" src="https://via.placeholder.com/40" />
              <span>管理員</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>個人資料</el-dropdown-item>
                <el-dropdown-item>修改密碼</el-dropdown-item>
                <el-dropdown-divider />
                <el-dropdown-item>登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main-content">
        <RouterView />
      </el-main>

      <el-footer class="footer">
        <div class="footer-content">
          <p>© 2026 SportBiz Management System. All rights reserved.</p>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, Search, Bell } from '@element-plus/icons-vue'

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

const breadcrumbs = computed(() => {
  const crumbs = [{ path: '/', label: '首頁' }]
  
  if (route.path !== '/') {
    const pathMap: Record<string, string> = {
      '/users': '人員管理',
      '/customers': '客戶管理',
      '/products': '商品管理',
      '/purchases': '採購管理',
    }
    
    const label = pathMap[route.path] || route.path
    crumbs.push({ path: route.path, label })
  }
  
  return crumbs
})

const handleMenuSelect = (key: string) => {
  // 可以添加菜單選擇時的其他邏輯
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
}

/* 側邊欄樣式 */
.sidebar {
  background: linear-gradient(180deg, #263238 0%, #1a1f23 100%);
  color: #fff;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.logo-section {
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
}

.logo h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.logo p {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #b0bec5;
}

/* 菜單樣式 */
.menu {
  background: transparent !important;
  border: none !important;
}

.menu :deep(.el-menu-item),
.menu :deep(.el-sub-menu__title) {
  background: transparent !important;
  color: #b0bec5 !important;
  transition: all 0.3s ease !important;
}

.menu :deep(.el-menu-item:hover),
.menu :deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}

.menu :deep(.el-menu-item.is-active) {
  background: #1976d2 !important;
  color: #fff !important;
}

.menu .icon {
  margin-right: 8px;
  font-size: 16px;
}

.menu-item-root {
  margin-bottom: 8px !important;
}

.menu-item-bottom {
  margin-top: auto !important;
}

/* 主容器 */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 頂部欄 */
.header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 24px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.breadcrumb-section {
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 20px;
}

.icon-button {
  cursor: pointer;
  font-size: 18px;
  color: #666;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #1976d2;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-profile:hover {
  background-color: #f5f5f5;
}

.user-profile span {
  color: #666;
  font-size: 14px;
}

/* 主內容區 */
.main-content {
  flex: 1;
  background-color: #f5f7fa;
  padding: 24px;
  overflow-y: auto;
}

/* 頁腳 */
.footer {
  background: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 16px 24px !important;
  text-align: center;
  color: #999;
  font-size: 12px;
}

.footer-content p {
  margin: 0;
}

/* 滾動條 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.main-content::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>
