# GitHub Pages 部署學習筆記

> 把這個 Vite + React 專案部署到 GitHub Pages 的完整流程紀錄，包含踩到的雷與解法。

## 目標

讓專案 build 出來的網頁掛在 GitHub 提供的網址上（例如 `https://yienhuang.github.io/jubo_dashboard/`），這樣可以分享網址給別人看，不用對方來連你的 localhost。

## 部署選項比較（為什麼選 GitHub Pages）

| 平台 | 優點 | 缺點 |
|---|---|---|
| **GitHub Pages** | 免費、跟 repo 整合、不用註冊新服務 | 免費版只支援 public repo、SPA 路由要處理、子路徑部署要設 base |
| **Vercel** | SPA 原生支援、private repo 也免費、零設定 | 要另外註冊帳號 |
| **Netlify** | 同 Vercel | 同上 |

本筆記走 GitHub Pages。如果之後改用 Vercel，需要回退一些設定（base path、HashRouter、workflow），詳見最後的對照表。

## 整體流程

```
本地改 code（Vite base + Router + workflow）
      ↓
git push 到 GitHub
      ↓
GitHub Actions 自動跑 build & deploy
      ↓
網址出現在 Settings → Pages
```

## Step 1：改 Vite 設定加 base path

### 為什麼

GitHub Pages 把 project repo 部署在 `https://<帳號>.github.io/<repo名稱>/` 這個**子路徑**底下，不是根路徑。

如果不設定，build 出來的 `index.html` 會用絕對路徑載入資源：

```html
<script src="/assets/index-xxx.js"></script>  <!-- 載入失敗：實際路徑是 /jubo_dashboard/assets/... -->
```

結果就是頁面打開一片空白，console 一堆 404。

### 怎麼做

`vite.config.js` 加 `base`：

```js
export default defineConfig({
  base: '/jubo_dashboard/',  // 注意前後都要有斜線、要對應 repo 名稱
  plugins: [react()],
  // ...
})
```

build 後 `dist/index.html` 會變成：

```html
<script src="/jubo_dashboard/assets/index-xxx.js"></script>  <!-- ✓ -->
```

## Step 2：處理 React Router 的 SPA refresh 404

### 為什麼

GitHub Pages 是純靜態主機。當你訪問 `https://.../jubo_dashboard/residents`：

- 純靜態主機去找 `residents/index.html` 這個檔案
- 找不到 → 回傳 404

但 SPA 的邏輯是：所有路徑都應該丟回 `index.html`，由前端 JS 自己決定畫面。GitHub Pages 不知道這件事。

### 兩種解法

**解法 A：改用 HashRouter（推薦給新手）**

把 router 從 `createBrowserRouter` 換成 `createHashRouter`：

```js
// src/routes/index.jsx
import { createHashRouter, Navigate } from 'react-router-dom'

export const router = createHashRouter([
  // ...
])
```

網址會變成 `https://.../jubo_dashboard/#/residents`：
- `#` 後面的部分瀏覽器不會發送給伺服器
- 所以 GitHub Pages 永遠只看到 `/jubo_dashboard/` → 回 `index.html`
- 然後前端 JS 讀 `#/residents` 決定要 render 哪個頁面

優點：零踩坑、refresh 一定 work。
缺點：URL 多個 `#`，醜一點點。

**解法 B：保留 BrowserRouter + 404.html hack**

在 `public/404.html` 放一段 JS，把 not-found 的請求 redirect 回 index.html 並還原原本的路徑。比較進階，這次沒採用。

## Step 3：寫 GitHub Actions workflow

### 為什麼要用 Actions

GitHub Pages 預設只能部署「repo 裡有的檔案」，但 Vite 專案需要 build（npm run build → dist/）。所以要靠 Actions：

1. checkout code
2. 裝 Node.js
3. `npm ci` 裝依賴
4. `npm run build` 產生 dist/
5. 把 dist/ 推給 GitHub Pages

### 怎麼寫

`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:  # 也允許手動觸發

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
        with:
          enablement: true   # ← 關鍵！見 Step 5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 關鍵點

- **`permissions`**：要明確給 `pages: write` 跟 `id-token: write`，不然 deploy step 會失敗
- **`concurrency`**：避免兩個 push 同時跑造成 race condition
- **`environment: github-pages`**：這個名字是 GitHub 約定的，不能改
- **拆兩個 job（build + deploy）**：是 GitHub 推薦的作法，比較好除錯

## Step 4：把 repo 改成 public（或升級方案）

### 雷在這裡

第一次去 `Settings → Pages` 可能會看到：

> **Upgrade or make this repository public to enable Pages**

GitHub Pages 在**免費方案下只支援 public repo**。Private repo 要升級到 GitHub Pro / Team / Enterprise。

### 三個選擇

1. **改成 public**：repo 首頁 → Settings → 拉到最下面 Danger Zone → "Change repository visibility" → Public
2. **升級 GitHub Pro**：USD $4/月
3. **改用 Vercel**：免費版就支援 private repo

### 注意

如果改成 public，**所有歷史 commit 也會公開**。要確認：
- 沒有 commit 過 `.env` 或任何 secret
- 沒有真實住民/客戶資料
- 沒有內部 API 文件

如果不確定，先用 `git log -p` 翻一遍，或找會洩漏的字串：

```bash
git log -p | grep -iE "(token|password|secret|api[_-]?key)" | head
```

## Step 5：在 Settings → Pages 設定 Source

進 `https://github.com/<帳號>/<repo>/settings/pages`，找 **Build and deployment** 區塊：

- **Source** 下拉選 **"GitHub Actions"**（不是 "Deploy from a branch"）
- 不需要按儲存，選了就生效

設好之後頁面會出現 GitHub 提供的 workflow 範本（GitHub Pages Jekyll、Static HTML），**這些都不用點**，因為我們自己寫好 workflow 了。

## Step 6：Push 觸發部署

```bash
git push origin main
```

Push 完去 `https://github.com/<帳號>/<repo>/actions` 看：
- 黃點 = 跑中
- 綠勾 = 成功
- 紅叉 = 失敗

跑成功之後回 Settings → Pages，頂部會出現網址。

## 常見錯誤與排錯

### 錯誤 1：`Get Pages site failed - Not Found`

完整訊息：
> Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions, or consider exploring the `enablement` parameter for this action.

**原因**：典型的 chicken-and-egg —— UI 上選了 "GitHub Actions" 但 Pages 站台還沒實際被「初始化」，需要至少成功 deploy 一次才會初始化、但 deploy 又需要 Pages 已啟用。

**解法**：在 `actions/configure-pages` 加上 `enablement: true`，讓 Action 自己幫你初始化：

```yaml
- uses: actions/configure-pages@v5
  with:
    enablement: true
```

加完 push 一次就會自動初始化並部署。

### 錯誤 2：頁面打開一片空白、console 顯示 404 找不到 JS/CSS

**原因**：`vite.config.js` 的 `base` 沒設或設錯。

**解法**：確認 `base: '/<repo名稱>/'`，前後都要有斜線。

### 錯誤 3：首頁 OK，點到子頁面 refresh 變 404

**原因**：用了 `createBrowserRouter` 但沒做 SPA fallback。

**解法**：改用 `createHashRouter`（見 Step 2）。

### 警告：Node.js 20 deprecation

Workflow 跑的時候會看到：
> Node.js 20 actions are deprecated... Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026.

**處理方式**：先不用管。等 GitHub 釋出新版 actions 再升 `actions/checkout@v4` 等版本即可。

## 之後的更新流程

設定完成後，日常開發只要：

```bash
git add .
git commit -m "..."
git push origin main
```

push 到 main → Actions 自動 build & deploy → 網址內容自動更新（1-2 分鐘）。

## 部署後注意事項

- **網址公開**：`*.github.io` 是公開網路，任何人有網址都能看
- **未來若接真實 API**：必須加認證機制（OAuth、JWT、API gateway 等），不能直接把住民/客戶資料的 API 暴露在公開前端
- **環境變數要小心**：Vite 的 `import.meta.env.VITE_*` 會被編譯進 build 產物，**所有 `VITE_` 開頭的變數都會公開在 JS 裡**，不要塞 secret 進去

## 對照表：未來如果想改用 Vercel

| 設定 | GitHub Pages | Vercel |
|---|---|---|
| `vite.config.js` 的 `base` | 需要 `'/jubo_dashboard/'` | **要拿掉**（部署在根路徑） |
| Router | HashRouter | BrowserRouter（Vercel 自動處理 SPA） |
| `.github/workflows/deploy.yml` | 需要 | **可刪除**（Vercel 自己處理） |
| Private repo | 不支援（免費版） | 支援 |
| 環境變數 | 寫在 workflow + GitHub Secrets | Vercel dashboard 直接設定 |

## 本專案實際走過的步驟摘要

1. 改 `vite.config.js` 加 `base: '/jubo_dashboard/'`
2. 改 `src/routes/index.jsx`：`createBrowserRouter` → `createHashRouter`
3. 新增 `.github/workflows/deploy.yml`
4. 本機 `npm run build` 驗證
5. Commit + push
6. 第一次 deploy 失敗（"Get Pages site" 錯誤）
7. 把 repo 改成 public
8. 在 workflow 加 `enablement: true`
9. 再 push → 部署成功
10. 拿到網址 `https://yienhuang.github.io/jubo_dashboard/`
