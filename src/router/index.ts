import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Views
import Dashboard from '@/views/Dashboard.vue'
import UserList from '@/views/users/UserList.vue'
import CustomerList from '@/views/customers/CustomerList.vue'
import ProductList from '@/views/products/ProductList.vue'
import PurchaseList from '@/views/purchases/PurchaseList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/customers',
    name: 'CustomerList',
    component: CustomerList,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/purchases',
    name: 'PurchaseList',
    component: PurchaseList,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
