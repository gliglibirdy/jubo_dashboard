# Figma Code-to-Canvas 設定與使用

把 dashboard 的 UI 直接從瀏覽器送進 Figma 的工作流。一次性設定後，後續只要一句 prompt 就能用。

---

## 為什麼需要設定

- **Code-to-Canvas** 走的是 Figma MCP server 上的 `generate_figma_design` 工具。
- 這個工具只在「特定 client」可用：Claude Code CLI、Cursor、VS Code、Codex、Warp 等。
- VSCode 內的 Claude 擴充套件用的 connector（`claude.ai Figma`）**沒有這個工具**。
- 所以必須走 **Claude Code CLI** + **Figma plugin（已裝在 user scope）**，並完成 OAuth 授權一次。
- 授權 token 存在 `~/.claude/`，授權後所有 Claude Code 環境共用，不用重做。

---

## 一次性設定（只做一次）

### Step 1：確認 plugin 已安裝

```bash
claude plugin list | grep figma
```

預期看到：

```
figma@claude-plugins-official    Version: 2.1.30    Scope: user    Status: ✔ enabled
```

如果沒看到，補裝：

```bash
claude plugin install figma@claude-plugins-official
```

### Step 2：在 Claude Code CLI 完成 OAuth 授權

開一個終端機，跑：

```bash
claude
```

進入 TUI 後輸入：

```
/mcp
```

在 MCP server 列表裡：

1. **找名字含 `plugin:figma`** 的那一行（**不是** `claude.ai Figma`，那是另一個沒 capture 能力的 connector）
2. 選 **Authenticate**
3. 瀏覽器自動開啟 → 點 **Allow Access**
4. 回到終端機看到 `Authentication successful. Connected to figma`

### Step 3：驗證

退出 TUI，在 shell 裡跑：

```bash
claude mcp list | grep figma
```

預期：

```
plugin:figma:figma: https://mcp.figma.com/mcp (HTTP) - ✓ Connected
```

### Step 4：（可選）移除舊的 connector，避免工具撞名

只有當 AI 還是叫到舊那個沒 capture 能力的 server 時才做：

```bash
claude mcp remove "claude.ai Figma"
```

---

## 日常使用：把 dashboard 的 UI 截到 Figma

設定完成後，下面這些 prompt 都可以直接貼到 Claude Code 用。

### 模式 A：抓到新 Figma 檔

```
Start a local server for my app and capture the UI in a new Figma file.
```

### 模式 B：抓到既有 Figma 檔

```
Start a local server for my app and capture the UI in <Figma file URL>.
```

### 模式 C：抓到剪貼簿（之後手動貼進任意檔）

```
Start a local server for my app and use the Figma MCP server to capture the UI to my clipboard.
```

> 如果 dev server 已經自己起好（`npm run dev` 在跑），可以省掉「Start a local server for my app and」開頭那段。

### 同一段對話多張畫面

抓完第一張後，後續可以講：

```
Also capture the residents page to the same file.
Capture the empty state of the resident detail page.
```

Client 預設會用同一個 Figma 檔。

### 結尾

抓完所有畫面後：

- 在瀏覽器 toolbar 按 **Open file**，或
- 跟 AI 說：`We're done capturing, please complete the process.`

---

## 含圖片的畫面：Parallel workflow（重要）

dashboard 裡的住民照片、avatar、icon 等屬於 image fill。**`use_figma` 沒辦法 fetch 外部圖片 URL**，只能用既有 `imageHash`。

正確流程：

1. **同時跑兩個工作**：
   - `generate_figma_design` 截一份 pixel-perfect（含圖片）
   - `use_figma` 用 design system component 重建一份（架構正確、可被 update）
2. 從 capture 的版本把 `imageHash` 轉移到 `use_figma` 版本
3. 確認 OK 後刪掉 capture 那一份（它只是視覺參考）

直接這樣 prompt：

```
Capture this page to Figma using the parallel workflow:
- generate_figma_design for pixel-perfect capture (used as visual reference + image source)
- use_figma with the published design system components for the actual build
- Transfer image hashes from the capture into the use_figma output, then delete the capture
```

AI 會自動載入 `figma-generate-design` skill 跑這套流程。

---

## Live web app（已部署的網址）

如果不是本地 dev server，而是已經部署的網站：

```
Use Playwright to open <URL>, then use the Figma MCP server to capture the UI to a new Figma file.
```

需要 Playwright MCP 或 AI 自己處理瀏覽器自動化。

---

## 故障排除

### `/mcp` 顯示 figma 已 connected，但 AI 仍說沒 capture 工具

90% 是看到 `claude.ai Figma`（舊 connector）。重新跑：

```bash
claude mcp list
```

確認 `plugin:figma:figma` 那行也是 ✓ Connected。沒有就重做 Step 2。

### Capture 出來框框是空白、沒圖片

沒走 parallel workflow。回到「含圖片的畫面」那段，重做。

### AI 直接用 `use_figma` 畫框框，結果跟實際畫面差很多

它沒抓到 capture 工具，可能是：

1. plugin server 沒授權（重做 Step 2）
2. 或者 prompt 沒明示，補一句：`Use generate_figma_design to capture, not use_figma to draw.`

### 想看官方 skill 細節

```
請載入 figma-generate-design skill 的內容給我看
```

或讀 MCP resource：`file://figma/docs/skill-figma-generate-design.md`

---

## 相關連結

- [Figma Code-to-Canvas 官方文件](https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/)
- [Figma MCP server 安裝](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [支援的 client 名單](https://www.figma.com/mcp-catalog/)
