# 集團總覽首頁改版計畫

> 對應檔案：`src/pages/Dashboard.jsx`、`src/features/dashboard/`
> 最後更新：2026-05-08

---

## 1. 目標

把首頁從「資料牆」改為「決策面板」：總部管理員 30 秒內能回答
**今天還好嗎 / 哪裡出事 / 要不要我介入**。

設計原則：
- 異常優先，集中收攏（不再散落各處）
- 首頁只放摘要 + 跳轉，細節留給「產能管理」「人力管理」子頁
- 同一筆異常只出現一次

---

## 2. 整頁版面（由上至下）

```
┌──────────────────────────────────────────────────────────┐
│ ① Page Header                            （沿用，移除匯出按鈕）│
├──────────────────────────────────────────────────────────┤
│ ② Hero KPI ×4                            （沿用）         │
├──────────────────────────────────────────────────────────┤
│ ③ 集團三切面（3 欄）                                       │
│    服務佔比 │ 人力概況 │ 6 個月趨勢      （沿用）           │
├──────────────────────────────────────────────────────────┤
│ ④ 三類業務縮影（3 欄）                   ★ 新增           │
│    住宿長照 │ 日間照顧 │ 居家服務                          │
├──────────────────────────────────────────────────────────┤
│ ⑤ 旗下機構總覽（表格）                   （沿用，異常優先排序）│
└──────────────────────────────────────────────────────────┘
```

---

## 3. 沿用的區塊

| 區塊 | 來源 | 變更 |
|---|---|---|
| Page Header | 現有 `PageHeader` | **移除「匯出報表」按鈕**（保留 IconButton 分享圖示先不動，若你也要拿掉再說） |
| Hero KPI | 現有 `KpiRow` + `mockData.kpis` | 不動 |
| 全集團服務佔比 | 現有 `ServiceShareCard` | 不動 |
| 全集團人力概況 | 現有 `HeadcountCard` | 不動 |
| 6 個月趨勢 | 現有 `TrendCard` | 不動 |
| 旗下機構總覽 | 現有 `FacilityTable` | 預設排序改為：紅 → 黃 → 綠 |

---

## 4. 新增區塊細節

### ④ 三類業務縮影（3 欄）

3 張同寬同高、欄位嚴格對齊的卡片：

| 欄位 | 住宿長照 | 日間照顧 | 居家服務 |
|---|---|---|---|
| icon + 名稱 | 🛏 住宿長照 | ☀️ 日間照顧 | 🏡 居家服務 |
| 副標 | 2 間機構 | 2 間機構 | 2 間機構 |
| 主指標 | **佔床率 84.3%** | **出席率 90.3%** | **服務時數 412h** |
| 副資訊 | 在院 236 / 床 280 | 應到 92 / 實到 83 | 案件 198 / 居服員 62 |
| Sparkline | **近 30 天**佔床率 | **近 30 天**出席率 | **近 30 天**服務時數 |
| 異常徽章 | 無 | 1 黃 | 1 紅 |
| CTA | `進入產能管理 →` | `進入產能管理 →` | `進入產能管理 →` |

> Sparkline 用 Recharts `<LineChart>`，無座標軸、無格線，只有一條線，30 個資料點。

---

## 5. 拆檔結構（決定執行）

現有 `Dashboard.jsx` 已 390 行，加入新區塊後會超過 600 行。**拆檔**：

```
src/
├── pages/
│   └── Dashboard.jsx                    # 只負責組裝（< 50 行）
└── features/dashboard/
    ├── components/
    │   ├── PageHeader.jsx               # 從 Dashboard.jsx 拆出（移除匯出按鈕）
    │   ├── KpiRow.jsx                   # 從 Dashboard.jsx 拆出
    │   ├── ServiceShareCard.jsx         # 從 Dashboard.jsx 拆出
    │   ├── HeadcountCard.jsx            # 從 Dashboard.jsx 拆出
    │   ├── TrendCard.jsx                # 從 Dashboard.jsx 拆出
    │   ├── BusinessSegmentRow.jsx       ★ 新增（容器，3 欄 grid）
    │   ├── BusinessSegmentCard.jsx      ★ 新增
    │   ├── BusinessSparkline.jsx        ★ 新增（Recharts 包裝）
    │   └── FacilityTable.jsx            # 從 Dashboard.jsx 拆出（加排序）
    └── mockData.js                      # 補 segments
```

`SectionHeader` 這類 helper 移到 `features/dashboard/components/SectionHeader.jsx`。

---

## 6. mockData 增補

需新增：

```js
// 三類業務縮影
export const segments = [
  {
    key: 'residential',
    name: '住宿長照',
    facilityCount: 2,
    primary: { label: '佔床率', value: '84.3', unit: '%' },
    secondary: '在院 236 / 床 280',
    sparkline: [/* 30 個數字 */],
    alertCount: { critical: 0, warning: 0 },
  },
  // 日間照顧、居家服務同結構
]
```

---

## 7. 開發步驟（順序）

1. **拆檔**：把 `Dashboard.jsx` 內 6 個子函式各自搬到 `features/dashboard/components/`，主檔只剩組裝
2. **移除匯出按鈕**（在 `PageHeader.jsx`）
3. **補 mockData**：`segments`、30 天 sparkline
4. **做 三類業務縮影**（`BusinessSegmentRow.jsx` + `BusinessSegmentCard.jsx` + `BusinessSparkline.jsx`）
5. **改 FacilityTable**：依 `statusMeta` 順序排序（critical → warning → stable）
6. **組裝 `Dashboard.jsx`**：依新版面順序組起來
7. `npm run dev` 看效果，跑 `npm run lint` + `npm run format`

---

## 8. 已確認事項

- ✅ 拆檔：執行
- ✅ Sparkline：30 天
- ✅ 移除「匯出報表」按鈕
- ✅ 旗下機構總覽：維持表格

---

## 9. 風險與備註

- 三類業務縮影的「進入產能管理」CTA：產能管理子頁尚未存在，V1 暫時不接路由（按鈕可顯示但點擊無作用，或先指向 `#`）。
- 移除匯出按鈕後，PageHeader 右側只剩 IconButton 分享圖示；如果你連分享圖示也想拿掉，再告訴我。
