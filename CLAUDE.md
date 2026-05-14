# 長照集團 Dashboard

> **不確定的需求請詢問我再開始動工。**
> **較複雜的操作請先寫出 plan，等我確認後再開始進行，不要先動工。**

## 專案概述

這是一個長照集團使用的內部管理 Dashboard，提供住民管理、照護紀錄、營運數據視覺化等功能。

## 技術棧

- **建置工具**：Vite
- **框架**：React 19 (JavaScript，非 TypeScript)
- **樣式**：Tailwind CSS v3 + MUI（雙軌並用）
- **UI 元件庫**：Material UI (MUI) v9 + `@mui/icons-material`
- **路由**：React Router v7 (`createBrowserRouter`)
- **資料抓取**：TanStack Query v5（搭配 Axios）
- **表單**：React Hook Form + Zod (`@hookform/resolvers/zod`)
- **圖表**：Recharts
- **HTTP 客戶端**：Axios（攔截器處理 token、401）
- **格式化**：Prettier (`prettier-plugin-tailwindcss`)
- **Lint**：ESLint（Vite 預設設定）

## 目錄結構

```
src/
├── components/         # 共用 UI 元件（純展示）
│   └── charts/         # Recharts 包裝
├── features/           # 依業務領域組織（住民、照護紀錄…）
├── hooks/              # 自訂 Hook
├── layouts/            # 版面（含側欄、頂欄）
├── lib/                # 共用基礎設施（api client、queryClient）
├── pages/              # 頁面元件（路由直接掛載）
├── routes/             # 路由設定
├── theme/              # MUI theme 設定
└── utils/              # 純函式工具
```

## 路徑別名

`@` → `src/`，例：`import api from '@/lib/api'`。

## 樣式規則（重要）

由於 Tailwind 與 MUI 並存，要避免 CSS 衝突：

1. **Tailwind preflight 已關閉**（`tailwind.config.js` 中 `corePlugins.preflight = false`），改由 MUI 的 `CssBaseline` 負責 reset。
2. **Tailwind 加上 `important: '#root'`**，確保 Tailwind utilities 能蓋過 MUI 的內聯樣式（必要時）。
3. **優先用 MUI 元件 + `sx` 處理元件層級樣式**；Tailwind 適合用在版面（flex / grid / spacing）與微調。
4. **避免在同一元素同時用 `sx` 與 `className` 設定相同屬性**，會造成優先級不直觀。

## 環境變數

- 複製 `.env.example` 為 `.env.local`（會被 git 忽略）。
- 變數需以 `VITE_` 前綴才會被 Vite 注入到前端。
- `VITE_API_BASE_URL`：後端 API 位址，預設 `/api`。

## 常用指令

```bash
npm run dev           # 啟動開發伺服器（預設 http://localhost:5173）
npm run build         # 產出生產版本到 dist/
npm run preview       # 預覽 build 結果
npm run lint          # ESLint
npm run format        # Prettier 格式化
npm run format:check  # 檢查格式（CI 用）
```

## 開發約定

- **MUI Grid v2 語法**：使用 `<Grid size={{ xs: 12, sm: 6 }}>`，**不要**用舊的 `<Grid item xs={12}>`。
- **API 呼叫一律走 `@/lib/api`**（已配置 token 攔截、401 處理），不要直接 `fetch` 或 `axios`。
- **資料抓取統一用 TanStack Query**，避免在 component 裡寫 `useEffect + setState`。
- **表單**用 React Hook Form + Zod schema，schema 放在同檔案或 `feature/<name>/schema.js`。
- **新頁面**：在 `src/pages/` 建立元件 → 在 `src/routes/index.jsx` 註冊路由 → 必要時加進 `src/layouts/MainLayout.jsx` 的側欄選單。

## 與 Claude 的協作守則

> **不確定的需求請詢問我再開始動工。**
> **較複雜的操作請先寫出 plan，等我確認後再開始進行。**

- **較複雜的操作（多檔案修改、新功能、跨模組調整、重構）必須先列出 plan**：
  - 說明目標、預計變動的檔案、實作步驟與可能的風險。
  - 等我明確確認後再動手寫 code，不要邊問邊改。
  - 簡單的單點修改（typo、單一函式調整、明確指定的小改動）可以直接進行。
- 規格不明、欄位不清、流程有歧義時，請先列出問題詢問，不要自行假設。
- 大規模重構或變更目錄結構前，請先說明動機與影響範圍。
- 加入新依賴前，請先告知用途，避免重複功能（例如已有 Axios 就不要再加 ky/got）。
