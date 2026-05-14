# Git 入門學習筆記（Fork 使用者版）

這份筆記給用 [Fork](https://git-fork.com/) 圖形化工具的初學者。會帶你從「打開 Fork」一路走到「日常推 code 上 GitHub」，並穿插一些 Git 概念說明，讓你知道按鈕背後做了什麼。

**主軸：用 Fork 操作。** CLI 指令放在最後當對照，平常不需要記。

---

## 1. 先搞懂三個東西

| 名詞 | 是什麼 | 角色 |
|---|---|---|
| **Git** | 版本控制系統（軟體） | 真正在記錄程式碼變動的引擎 |
| **GitHub** | 一個網站（github.com） | 把 Git 紀錄放上雲端，方便多人協作 |
| **Fork** | 一個 Mac/Windows 軟體 | 圖形化操作介面，幫你按按鈕代替打指令 |

簡單比喻：
- **Git** ≈ Word 的「檔案歷史紀錄」功能
- **GitHub** ≈ Google Drive，存放檔案讓別人也能看
- **Fork** ≈ Word 的選單列，按按鈕呼叫 Git 的指令

---

## 2. 第一次設定 Fork

### 2.1 下載與安裝
到 https://git-fork.com/ 下載對應系統版本，安裝。

### 2.2 設定你的身份（重要）
Git 會把你的名字和 email 記在每個 commit 上。

**Fork 操作**：選單 `Fork` → `Preferences` → `Git Config` 分頁
- **Name**：你的名字（會顯示在 commit 紀錄上）
- **Email**：建議用 GitHub 帳號的 email（這樣 GitHub 才會把 commit 對應到你的帳號）

### 2.3 連動 GitHub 帳號（推薦）
**Fork 操作**：選單 `Fork` → `Preferences` → `Accounts` 分頁 → `+` → 選 GitHub → 登入授權

連動後 push/pull 不用每次輸入密碼，Fork 會自動處理認證。

---

## 3. 核心心智模型：三個區域

這是 Git 最重要的觀念。當你修改檔案，Git 會把它分成三個「地方」管理：

```
┌────────────────┐  Stage    ┌────────────────┐  Commit     ┌────────────────┐
│ Working        │ ────────> │ Staging Area   │ ──────────> │ Repository     │
│ Directory      │           │ (Index)        │             │ (.git)         │
│ 工作目錄        │           │ 暫存區          │             │ 版本庫          │
│ 你正在改的檔案  │           │ 準備要存檔的    │             │ 已存檔的歷史    │
└────────────────┘           └────────────────┘             └────────────────┘
```

**對應到 Fork 介面**：
- 左下角 `Changes` 分頁 → **Working Directory**（目前的修改）
- 中間 `Staged` 區塊 → **Staging Area**（已勾選要 commit 的）
- 左側 `All Commits` 列表 → **Repository**（已存檔的歷史）

> 💡 **為什麼要有 Staging Area？** 假設你改了 5 個檔案，但只想把其中 2 個包成一個 commit。Staging 讓你挑選要包進這次存檔的內容，而不是一次全進去。

---

## 4. 在 GitHub 建立新專案

把專案放上雲端之前，要先在 GitHub 網站建立一個「空房間」。

### 步驟（在 github.com 網頁操作）

1. 登入 https://github.com
2. 右上角點 `+` 圖示 → `New repository`
3. 填寫表單：
   - **Repository name**：英文、用 `-` 或 `_` 連接，例如 `jubo-dashboard`
   - **Description**（選填）：一句話描述專案
   - **Public / Private**：
     - **Public**：所有人都看得到
     - **Private**：只有你和邀請的人看得到（公司專案通常選這個）
4. **重要：底下三個選項建議全部不勾**
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

   **為什麼？** 勾了會在遠端先建立一個 commit，等你從本機 push 時可能會遇到「兩邊歷史對不上」的錯誤。第一次操作從**完全空的 repo** 開始最單純。這些檔案晚一點在本機加都來得及。
5. 點 `Create repository`
6. 建好後會看到指引頁，把那個 `https://github.com/你的帳號/repo名.git` URL 複製下來，下一步要用

---

## 5. 把專案放上 GitHub：兩種情境

### 情境 A：從零開始一個新專案

**做法**：先在 GitHub 建好空 repo（上一步），然後在 Fork 中 clone 下來。

**Fork 操作**：
1. 選單 `File` → `Clone`
2. **Repository URL**：貼上 GitHub repo URL
3. **Parent Folder**：選一個放專案的資料夾（例如 `~/Documents/projects`）
4. **Name**：資料夾名稱（會自動帶入）
5. 按 `Clone`

完成後 Fork 會自動打開這個 repo，可以開始寫 code。寫完後跳到「第 6 節：日常工作流程」。

---

### 情境 B：本機已經有專案，要連到新建的 GitHub repo

如果你電腦裡已經有一個 git 專案（已經 commit 過），現在想把它推上 GitHub。

**步驟**：

#### B-1. 在 GitHub 建一個空 repo
依照上面「第 4 節」的步驟，建一個**空的**（不勾 README/gitignore/license）repo。

#### B-2. 在 Fork 加 remote
1. 在 Fork 中打開你的本機專案
2. 左側欄找到 `Remotes` 區塊
3. 在 `Remotes` 上**右鍵** → `Add Remote`
4. 填寫：
   - **Name**：`origin`（這是慣例名稱，幾乎所有教學都用這個）
   - **URL**：貼上 GitHub repo URL（`.git` 結尾那個）
5. 按 `Add`

加完後 `Remotes` 下面會出現 `origin`，展開可以看到 `(no branches yet)`。

#### B-3. 第一次 Push
1. 上方工具列點 `Push` 按鈕
2. 彈出視窗確認：
   - **Local Branch**：`main`
   - **Remote**：`origin`
   - ✅ **勾選 `Track this branch`**（很重要！這樣以後 push/pull 不用再選分支）
3. 按 `Push`

#### B-4. 到 GitHub 網頁確認
重新整理你的 repo 頁面，應該看到所有檔案和 commit 都上去了。

> 💡 **完成後**：本機和 GitHub 已經接起來，之後流程就跟情境 A 一樣，跳到下一節。

---

## 6. 日常工作流程（5 個步驟循環）

設定好之後，每天的工作大概是這樣的循環：

```
改檔案 → 看修改 → Stage → Commit → Push
```

### 6.1 改檔案
正常用編輯器（VS Code 等）改檔案，Fork 會自動偵測變動。

### 6.2 看你改了什麼
**Fork**：左下 `Changes` 分頁
- 點檔案會在右邊顯示左右對照（紅色舊版 / 綠色新版）
- 確認一下自己沒改到不該改的東西

### 6.3 Stage：挑選要存檔的修改
**Fork**：在 `Changes` 分頁
- **全部 stage**：點上方 `Stage All` 按鈕
- **單一檔案 stage**：每個檔案最右邊有 `+` 號，點一下加入
- **連單獨幾行也可以 stage**：選取那幾行 → 右鍵 → `Stage Selected Lines`（適合一個檔案有多種改動想分成不同 commit）

被 stage 的檔案會跑到中間 `Staged` 區塊。

### 6.4 Commit：建立存檔點
**Fork**：底部會有 commit message 輸入框
1. **Subject（上面那行）**：一句話總結這次改了什麼
   - 動詞開頭：`add`、`fix`、`update`、`remove`
   - 不超過 50 字
   - 例：`fix: 修正登入頁驗證錯誤`
2. **Description（下面，選填）**：詳細描述「為什麼」這樣改
3. 按 `Commit`

> 💡 **常見 commit message 格式**：團隊常用 [Conventional Commits](https://www.conventionalcommits.org/) 前綴：
> - `feat:` 新功能
> - `fix:` 修 bug
> - `docs:` 改文件
> - `refactor:` 重構（功能不變，只是改寫）
> - `style:` 格式調整
> - `test:` 測試相關
> - `chore:` 雜事（建置設定、套件升級等）

Commit 完，左側 `All Commits` 列表會出現你剛剛的 commit。

### 6.5 Push：推到 GitHub
**Fork**：工具列 `Push` 按鈕
- Commit 還沒 push 時，分支名稱旁邊會顯示「↑ N」表示有 N 個 commit 還沒推
- Push 完後 GitHub 網頁就能看到你的更新

---

## 7. Branch 分支

### 7.1 為什麼要分支？
你在做新功能 A 時，老闆突然要你修一個緊急 bug。如果都在同一條線（`main`）上改，會很亂——bug 修完想推上 production，可是新功能還沒寫完不能推。

**解法**：每個任務開一條 branch，做完再合併回 main。

```
main:     ●───●───●─────────────●  ← 合併
                   \           /
feature:            ●───●───●
```

### 7.2 在 Fork 建立 branch
1. 確認你目前在哪條 branch（左側 `Branches` 區塊，**粗體**那條就是當前）
2. 在想要分支的起點上**右鍵**（通常是 `main`）→ `New Branch`
3. 輸入 branch 名稱
   - 命名建議：`feature/login-page`、`fix/header-bug`、`docs/readme`
4. ✅ 勾選 `Checkout after create`（建立後自動切過去）
5. 按 `Create Branch`

### 7.3 切換 branch
**Fork**：在左側 `Branches` 區塊**雙擊**任一 branch 名稱即可切換。

⚠️ **切換前確認 `Changes` 分頁是空的**（沒有未 commit 的修改），不然 Fork 會跳警告。要嘛先 commit、要嘛用 Stash（進階功能）暫存。

### 7.4 合併 branch（merge）
功能做完後，把 feature branch 併回 main：

**Fork 操作**：
1. **先切到目標分支**（例如 main）— 雙擊 `main`
2. 在想合併的 branch（例如 `feature/login`）上**右鍵** → `Merge ... into 'main'`
3. 確認 → 按 `Merge`

> 💡 **實務上**：團隊協作時通常**不在本機 merge**，而是 push feature branch 上去後**開 Pull Request（PR）**讓同事 review，再從 GitHub 網頁合併。本機 merge 比較適合個人專案。

---

## 8. 從 GitHub 拿最新更新（同步）

當別人改了東西並 push 到 GitHub，你要怎麼拿到？

### 8.1 三個按鈕的差別

| Fork 按鈕 | 做什麼 | 何時用 |
|---|---|---|
| **Fetch** | 從 GitHub 下載最新資訊到本機，**但不會合併** | 想知道遠端有沒有更新，但還不想動目前的 code |
| **Pull** | Fetch + 自動合併到目前 branch | 確定要把遠端的更新拉下來合併 |
| **Push** | 把本機 commit 推到 GitHub | 你做完工作要分享給別人 |

**安全建議**：開始工作前先按 `Fetch` 看一下遠端狀況，再決定要不要 Pull。

### 8.2 典型協作流程
```
早上開工：Pull main（拿同事昨天的更新）
   ↓
從 main 建立 feature branch
   ↓
寫 code → Stage → Commit
   ↓
完成：Push 上去 → 開 PR → 同事 review → 合併
```

---

## 9. 救援情境（出錯了怎麼辦？）

### 9.1 改錯了，想丟掉還沒 commit 的修改
**Fork**：在 `Changes` 分頁，檔案上**右鍵** → `Discard Changes`

⚠️ **不可復原**，沒 commit 的修改會永久消失。

### 9.2 Stage 錯檔案了，想拿掉
**Fork**：在 `Staged` 區塊，檔案旁邊的 `−` 號
- 檔案會回到 `Changes`，**修改不會消失**

### 9.3 剛 commit 完發現訊息寫錯
**Fork**：在最後一個 commit 上**右鍵** → `Amend Commit`
- 改完訊息按 `Amend`

⚠️ **只能改還沒 push 的 commit**。已經 push 上去的不要改，會破壞歷史紀錄。

### 9.4 Merge 衝突（conflict）
你和同事改了同一行，merge 時 Git 不知道要保留哪個版本，就會跳衝突。

**Fork 的處理方式**：
1. 衝突檔案在 `Changes` 分頁會標紅，圖示是 `!`
2. 點開檔案，Fork 顯示左右對照：
   - 左邊：你的版本（current）
   - 右邊：對方的版本（incoming）
3. 每個衝突區塊有按鈕可選：
   - `Take ours`：用你的
   - `Take theirs`：用對方的
   - 或手動編輯成你想要的最終樣子
4. 處理完存檔
5. 回 Fork → Stage 該檔案
6. 按 `Continue Merge`（或直接 commit）完成

### 9.5 看歷史紀錄
**Fork**：左側 `All Commits` 分頁，列出所有 commit
- 點任一 commit 可以看那次改了什麼檔案、什麼內容
- 右鍵 commit → `Copy SHA` 取得 commit ID（追蹤特定 commit 用）

---

## 10. CLI 對照速查（進階參考）

平常用 Fork 不需要記這些，但偶爾要在 terminal 用時可以對照：

| Fork 介面 | CLI 指令 | 用途 |
|---|---|---|
| File → Clone | `git clone <url>` | 複製遠端 repo |
| Changes 分頁 | `git status` | 看狀態 |
| 點檔案看 diff | `git diff` | 看具體改了什麼 |
| `+` Stage | `git add <file>` | 加入暫存區 |
| `−` Unstage | `git restore --staged <file>` | 移出暫存區 |
| Commit 按鈕 | `git commit -m "訊息"` | 建立 commit |
| Push 按鈕 | `git push` | 推到遠端 |
| Push（第一次） | `git push -u origin main` | 第一次推並建立追蹤 |
| Fetch 按鈕 | `git fetch` | 取得遠端資訊 |
| Pull 按鈕 | `git pull` | 拉並合併 |
| Add Remote | `git remote add origin <url>` | 加遠端 |
| 看遠端 | `git remote -v` | 列出有哪些遠端 |
| New Branch | `git switch -c <name>` | 建立並切換 branch |
| 雙擊 branch | `git switch <name>` | 切換 branch |
| Merge into ... | `git merge <name>` | 合併分支 |
| Discard Changes | `git restore <file>` | 丟棄修改 |
| Amend Commit | `git commit --amend` | 修改最後一個 commit |
| All Commits | `git log --oneline` | 看歷史 |

---

## 11. 接下來可以學什麼？

當你熟練上面這些後，可以再學：

- **Pull Request（PR）流程**：團隊協作的標準方式，在 GitHub 網頁開 PR、被 review、合併
- **`.gitignore`**：哪些檔案不要被 Git 追蹤（例如 `node_modules`、`.env`），通常專案根目錄一個檔案
- **Stash**：暫時收起未 commit 的修改去做別的事，之後再拿回來（Fork 工具列有 `Stash` 按鈕）
- **Tag**：給特定 commit 標版本號（例如 `v1.0.0`），用來標記發布版本
- **Rebase vs Merge**：兩種整合分支的方式，各有優缺點，進階主題

---

## 速查：日常最常做的 5 件事（Fork）

1. **看我改了什麼** → 左側 `Changes` 分頁
2. **存檔** → Stage 想要的檔案 → 寫 commit message → 按 `Commit`
3. **推到 GitHub** → 工具列 `Push`
4. **拿同事的更新** → 工具列 `Pull`
5. **開新分支做新功能** → 右鍵 `main` → `New Branch`

把這 5 個動作練熟，配合 GitHub 網頁，就能應付 90% 的日常工作。
