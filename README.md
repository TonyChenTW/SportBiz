# SportBiz - 運動企業管理系統

一個功能完整的運動企業管理系統，用於管理人員、客戶、商品和採購。

## 🚀 功能概述

### 已開發模塊
- ✅ **人員管理**：員工列表、新增/編輯/刪除員工
- ✅ **客戶管理**：客戶列表、新增/編輯/刪除客戶
- ✅ **商品管理**：商品列表、商品分類、庫存管理
- ✅ **採購管理**：採購單管理、供應商管理
- ✅ **儀表板**：企業概覽、統計數據、系統狀態

### 開發中的功能
- 🔨 Mock 資料服務
- 🔨 狀態管理優化
- 🔨 前端集成測試
- 🔨 後端 API 開發

## 💻 技術棧

- **前端框架**：Vue 3.x
- **語言**：TypeScript
- **構建工具**：Vite
- **UI 組件庫**：Element Plus
- **狀態管理**：Pinia
- **路由**：Vue Router
- **HTTP 客戶端**：Axios

## 📦 安裝和運行

### 環境要求
- Node.js >= 20
- npm 或 yarn

### 步驟

1. **克隆倉庫**
   ```bash
   git clone https://github.com/TonyChenTW/SportBiz.git
   cd SportBiz
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   
   訪問 `http://127.0.0.1:5173/`

4. **構建生產版本**
   ```bash
   npm run build
   ```

5. **預覽生產版本**
   ```bash
   npm run preview
   ```

## 📁 項目結構

```
SportBiz/
├── src/
│   ├── components/       # 可重用組件
│   ├── views/           # 頁面組件
│   │   ├── Dashboard.vue
│   │   ├── users/
│   │   ├── customers/
│   │   ├── products/
│   │   └── purchases/
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 狀態管理
│   ├── types/           # TypeScript 類型定義
│   ├── services/        # API 服務層
│   ├── styles/          # 全局樣式
│   ├── App.vue          # 根組件
│   └── main.ts          # 應用入口
├── index.html           # HTML 模板
├── package.json         # 依賴配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 構建配置
└── README.md            # 本文件
```

## 🎯 開發計畫

### 第 1 階段：框架搭建 ✅
- [x] 項目初始化
- [x] Vue 3 + TypeScript + Vite 配置
- [x] Element Plus 組件庫集成

### 第 2 階段：基礎設施 🔨
- [ ] 布局與導航優化
- [ ] 狀態管理完善
- [ ] Mock 資料服務

### 第 3 階段：核心模塊 UI 開發 🔨
- [x] 人員管理 UI 框架
- [x] 客戶管理 UI 框架
- [x] 商品管理 UI 框架
- [x] 採購管理 UI 框架
- [ ] 詳細功能開發

### 第 4 階段：集成與優化 ⏳
- [ ] 前端集成測試
- [ ] 性能優化
- [ ] 響應式設計驗證

### 第 5 階段：後端開發 ⏳
- [ ] 後端 API 開發
- [ ] 數據庫設計與實現
- [ ] 與前端集成

## 📝 API 文檔

API 文檔將在後端開發階段完成。

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

## 📄 許可證

MIT License - 詳見 LICENSE 文件

## 👨‍💻 作者

tonychentw

## 📞 聯繫方式

如有問題或建議，請在 GitHub Issues 中提出。
